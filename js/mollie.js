// ========================================
// Bollenstreek Direct - Mollie Payment Integration
// ========================================

// Mollie Configuration
const mollieConfig = {
    // In productie: Gebruik je live API key
    // Voor development: Gebruik test_ key
    // BELANGRIJK: API keys nooit in frontend code! 
    // Dit bestand is bedoeld als referentie voor backend implementatie
    
    // Ondersteunde betaalmethodes
    methods: {
        ideal: {
            name: 'iDEAL',
            icon: '🏦',
            description: 'Direct betalen via je bank',
            minAmount: 0.01,
            maxAmount: 50000,
            countries: ['NL']
        },
        bancontact: {
            name: 'Bancontact',
            icon: '💳',
            description: 'Populair in België',
            minAmount: 0.01,
            maxAmount: 10000,
            countries: ['BE']
        },
        creditcard: {
            name: 'Creditcard',
            icon: '💳',
            description: 'Visa, Mastercard, Amex',
            minAmount: 0.01,
            maxAmount: null,
            countries: ['*']
        },
        paypal: {
            name: 'PayPal',
            icon: '🅿️',
            description: 'Veilig betalen met PayPal',
            minAmount: 0.01,
            maxAmount: null,
            countries: ['*']
        },
        klarna: {
            name: 'Klarna',
            icon: '🛍️',
            description: 'Achteraf betalen of in termijnen',
            minAmount: 1.00,
            maxAmount: 10000,
            countries: ['NL', 'DE', 'AT', 'BE', 'FI', 'SE']
        },
        applepay: {
            name: 'Apple Pay',
            icon: '🍎',
            description: 'Snel betalen met Apple',
            minAmount: 0.01,
            maxAmount: null,
            countries: ['*']
        },
        sofort: {
            name: 'SOFORT Banking',
            icon: '🏛️',
            description: 'Direct overmaken (Duitsland)',
            minAmount: 0.10,
            maxAmount: 10000,
            countries: ['DE', 'AT', 'CH', 'BE']
        },
        eps: {
            name: 'EPS',
            icon: '🇦🇹',
            description: 'Oostenrijkse bankoverschrijving',
            minAmount: 1.00,
            maxAmount: null,
            countries: ['AT']
        },
        giropay: {
            name: 'Giropay',
            icon: '🇩🇪',
            description: 'Duitse bankoverschrijving',
            minAmount: 1.00,
            maxAmount: 10000,
            countries: ['DE']
        },
        przelewy24: {
            name: 'Przelewy24',
            icon: '🇵🇱',
            description: 'Pools betalingssysteem',
            minAmount: 0.01,
            maxAmount: null,
            countries: ['PL']
        },
        banktransfer: {
            name: 'Bankoverschrijving',
            icon: '🏦',
            description: 'Handmatige overboeking',
            minAmount: 0.01,
            maxAmount: null,
            countries: ['*']
        }
    }
};

// Order Builder
class MollieOrder {
    constructor() {
        this.items = [];
        this.customer = null;
        this.shipping = null;
        this.payment = null;
        this.totals = {
            subtotal: 0,
            shipping: 0,
            discount: 0,
            tax: 0,
            total: 0
        };
    }

    setCustomer(data) {
        this.customer = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone || null
        };
        return this;
    }

    setShipping(data) {
        this.shipping = {
            street: data.street,
            houseNumber: data.houseNumber,
            postalCode: data.postalCode,
            city: data.city,
            country: data.country
        };
        return this;
    }

    addItem(item) {
        this.items.push({
            id: item.id,
            name: item.name,
            quantity: item.quantity || 1,
            unitPrice: item.price,
            totalPrice: (item.price * (item.quantity || 1)),
            vatRate: item.vatRate || 21, // Dutch BTW
            type: item.type || 'physical' // physical, digital, shipping_fee, discount
        });
        this.calculateTotals();
        return this;
    }

    setShippingCost(cost) {
        this.totals.shipping = cost;
        this.calculateTotals();
        return this;
    }

    setDiscount(amount) {
        this.totals.discount = amount;
        this.calculateTotals();
        return this;
    }

    calculateTotals() {
        this.totals.subtotal = this.items.reduce((sum, item) => sum + item.totalPrice, 0);
        this.totals.total = this.totals.subtotal + this.totals.shipping - this.totals.discount;
        // Tax calculation (21% BTW included in prices)
        this.totals.tax = this.totals.total - (this.totals.total / 1.21);
    }

    setPaymentMethod(method) {
        if (!mollieConfig.methods[method]) {
            throw new Error(`Unknown payment method: ${method}`);
        }
        this.payment = {
            method: method,
            ...mollieConfig.methods[method]
        };
        return this;
    }

    validate() {
        const errors = [];

        if (!this.customer || !this.customer.email) {
            errors.push('E-mailadres is verplicht');
        }
        if (!this.shipping || !this.shipping.street) {
            errors.push('Bezorgadres is verplicht');
        }
        if (this.items.length === 0) {
            errors.push('Winkelwagen is leeg');
        }
        if (!this.payment) {
            errors.push('Kies een betaalmethode');
        }
        if (this.totals.total <= 0) {
            errors.push('Ongeldig orderbedrag');
        }

        return {
            valid: errors.length === 0,
            errors: errors
        };
    }

    toJSON() {
        return {
            customer: this.customer,
            shipping: this.shipping,
            items: this.items,
            payment: this.payment,
            totals: this.totals,
            metadata: {
                source: 'bollenstreek-direct',
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent
            }
        };
    }
}

// Create Mollie Payment (Frontend simulation)
// In production, this would be a server-side API call
async function createMolliePayment(orderData) {
    // Validate order
    if (!orderData || !orderData.totals || orderData.totals.total <= 0) {
        throw new Error('Ongeldige bestelgegevens');
    }

    // Log order for debugging
    console.log('📦 Mollie Order:', orderData);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In production, this would POST to your backend:
    /*
    const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    });
    
    if (!response.ok) {
        throw new Error('Betaling kon niet worden aangemaakt');
    }
    
    const { checkoutUrl } = await response.json();
    window.location.href = checkoutUrl;
    */

    // Demo: Generate fake order ID and return success
    const orderId = 'BD-' + Date.now().toString(36).toUpperCase();
    
    return {
        success: true,
        orderId: orderId,
        message: `Order ${orderId} aangemaakt`,
        // In production: checkoutUrl from Mollie
        checkoutUrl: null,
        demo: true
    };
}

// Get available payment methods for country
function getAvailablePaymentMethods(countryCode) {
    const available = [];
    
    for (const [key, method] of Object.entries(mollieConfig.methods)) {
        if (method.countries.includes('*') || method.countries.includes(countryCode)) {
            available.push({
                id: key,
                ...method
            });
        }
    }
    
    return available;
}

// Format currency for display
function formatCurrency(amount, currency = 'EUR') {
    return new Intl.NumberFormat('nl-NL', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Export for use
window.MollieOrder = MollieOrder;
window.createMolliePayment = createMolliePayment;
window.getAvailablePaymentMethods = getAvailablePaymentMethods;
window.formatCurrency = formatCurrency;
window.mollieConfig = mollieConfig;

// ========================================
// BACKEND IMPLEMENTATIE VOORBEELD (Node.js)
// ========================================
/*
// server.js - Node.js/Express voorbeeld

const Mollie = require('@mollie/api-client');
const mollieClient = new Mollie({ apiKey: process.env.MOLLIE_API_KEY });

app.post('/api/payments/create', async (req, res) => {
    try {
        const { customer, shipping, items, totals, payment } = req.body;
        
        // Create Mollie payment
        const molliePayment = await mollieClient.payments.create({
            amount: {
                currency: 'EUR',
                value: totals.total.toFixed(2)
            },
            method: payment.method,
            description: `Bollenstreek Direct - Order ${Date.now()}`,
            redirectUrl: `${process.env.BASE_URL}/betaling-voltooid`,
            webhookUrl: `${process.env.BASE_URL}/api/mollie/webhook`,
            metadata: {
                customer: customer,
                items: items
            },
            billingAddress: {
                streetAndNumber: `${shipping.street} ${shipping.houseNumber}`,
                postalCode: shipping.postalCode,
                city: shipping.city,
                country: shipping.country
            }
        });
        
        // Save order to database
        await saveOrder({
            molliePaymentId: molliePayment.id,
            status: 'pending',
            customer,
            shipping,
            items,
            totals
        });
        
        res.json({
            success: true,
            checkoutUrl: molliePayment.getCheckoutUrl()
        });
        
    } catch (error) {
        console.error('Mollie error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Betaling kon niet worden aangemaakt' 
        });
    }
});

// Mollie webhook - Called when payment status changes
app.post('/api/mollie/webhook', async (req, res) => {
    const paymentId = req.body.id;
    
    try {
        const payment = await mollieClient.payments.get(paymentId);
        
        // Update order status in database
        await updateOrderStatus(paymentId, payment.status);
        
        if (payment.status === 'paid') {
            // Send confirmation email
            await sendOrderConfirmation(payment.metadata.customer.email, payment);
        }
        
        res.status(200).send('OK');
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).send('Error');
    }
});
*/

console.log('🔒 Mollie Payment Integration loaded');
