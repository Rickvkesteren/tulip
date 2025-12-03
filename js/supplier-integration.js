// ========================================
// Bollenstreek Direct - Leveranciers Integratie Systeem
// ========================================

/**
 * Dit systeem beheert de integratie met kweker/leveranciers
 * voor het inkopen en doorsturen van bestellingen.
 */

// Leveranciers Integratie Types
const integrationTypes = {
    MANUAL: 'manual',           // Handmatige order via email/telefoon
    API: 'api',                 // Directe API koppeling
    EDI: 'edi',                 // Electronic Data Interchange
    MARKETPLACE: 'marketplace', // Via platform zoals Bol.com
    DROPSHIP: 'dropship'        // Dropshipping (direct van kweker naar klant)
};

// Leveranciers met integratie details
const leverancierIntegrations = {
    1: { // Fluwel
        name: "Fluwel - Carlos van der Veek",
        integrationType: integrationTypes.MANUAL,
        orderMethod: 'email',
        orderEmail: 'orders@fluwel.nl',
        orderFormat: 'pdf', // PDF of Excel
        paymentTerms: 14, // dagen
        minimumOrder: 50.00,
        dropshipping: false,
        autoConfirm: false,
        notes: "Bellen voor grote orders. Carlos is vaak bereikbaar tot 18:00."
    },
    2: { // BULBi
        name: "BULBi Bloembollen",
        integrationType: integrationTypes.MANUAL,
        orderMethod: 'email',
        orderEmail: 'inkoop@bulbi.nl',
        orderFormat: 'excel',
        paymentTerms: 30,
        minimumOrder: 100.00,
        dropshipping: true,
        dropshipFee: 2.50,
        autoConfirm: false,
        notes: "Dropshipping mogelijk met neutrale verpakking."
    },
    3: { // Ruigrok
        name: "Ruigrok Flowerbulbs",
        integrationType: integrationTypes.API,
        apiEndpoint: 'https://api.ruigrokflowerbulbs.com/v1', // Fictief voorbeeld
        apiKey: process.env?.RUIGROK_API_KEY || null,
        orderFormat: 'json',
        paymentTerms: 21,
        minimumOrder: 75.00,
        dropshipping: true,
        dropshipFee: 0, // Gratis bij API integratie
        autoConfirm: true,
        webhookUrl: '/api/webhooks/ruigrok',
        notes: "API integratie beschikbaar. Contact voor credentials."
    },
    4: { // P. Aker
        name: "P. Aker Bloembollen",
        integrationType: integrationTypes.EDI,
        orderMethod: 'edi',
        ediPartnerId: 'AKER-NL-001',
        paymentTerms: 30,
        minimumOrder: 150.00,
        dropshipping: false,
        autoConfirm: true,
        notes: "EDI orders worden automatisch verwerkt."
    }
};

// Order Status Types
const orderStatus = {
    PENDING: 'pending',           // Wacht op verwerking
    CONFIRMED: 'confirmed',       // Bevestigd door leverancier
    PROCESSING: 'processing',     // In behandeling
    SHIPPED: 'shipped',           // Verzonden
    DELIVERED: 'delivered',       // Afgeleverd
    CANCELLED: 'cancelled',       // Geannuleerd
    RETURNED: 'returned'          // Geretourneerd
};

// ========================================
// ORDER MANAGEMENT KLASSE
// ========================================

class SupplierOrderManager {
    constructor() {
        this.orders = this.loadOrders();
    }
    
    loadOrders() {
        const saved = localStorage.getItem('supplierOrders');
        return saved ? JSON.parse(saved) : [];
    }
    
    saveOrders() {
        localStorage.setItem('supplierOrders', JSON.stringify(this.orders));
    }
    
    /**
     * Creëer inkoop orders per leverancier vanuit een klant bestelling
     */
    createSupplierOrders(customerOrder) {
        // Groepeer items per leverancier
        const grouped = this.groupBySupplier(customerOrder.items);
        const supplierOrders = [];
        
        Object.entries(grouped).forEach(([supplierId, items]) => {
            const supplier = leverancierIntegrations[supplierId];
            if (!supplier) return;
            
            const supplierOrder = {
                id: this.generateOrderId(),
                customerOrderId: customerOrder.id,
                supplierId: parseInt(supplierId),
                supplierName: supplier.name,
                status: orderStatus.PENDING,
                items: items,
                totals: this.calculateSupplierTotal(items),
                customer: customerOrder.customer,
                shippingAddress: customerOrder.shippingAddress,
                integrationType: supplier.integrationType,
                dropship: supplier.dropshipping && customerOrder.useDropship,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            supplierOrders.push(supplierOrder);
            this.orders.push(supplierOrder);
        });
        
        this.saveOrders();
        return supplierOrders;
    }
    
    /**
     * Groepeer cart items per leverancier
     */
    groupBySupplier(items) {
        const grouped = {};
        
        items.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            if (!product) return;
            
            const supplierId = product.leverancierId || product.kwekerId;
            
            if (!grouped[supplierId]) {
                grouped[supplierId] = [];
            }
            
            grouped[supplierId].push({
                productId: product.id,
                productName: product.name,
                productCode: product.leverancierProductCode || `PROD-${product.id}`,
                quantity: item.quantity,
                unit: product.unit,
                inkoopprijs: product.inkoopprijs,
                totalInkoop: product.inkoopprijs * item.quantity
            });
        });
        
        return grouped;
    }
    
    /**
     * Bereken totaal voor leverancier order
     */
    calculateSupplierTotal(items) {
        return items.reduce((total, item) => total + item.totalInkoop, 0);
    }
    
    /**
     * Genereer order ID
     */
    generateOrderId() {
        return 'SUP-' + Date.now().toString(36).toUpperCase() + '-' + 
               Math.random().toString(36).substring(2, 6).toUpperCase();
    }
    
    /**
     * Verzend order naar leverancier
     */
    async sendToSupplier(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) throw new Error('Order niet gevonden');
        
        const supplier = leverancierIntegrations[order.supplierId];
        
        switch (supplier.integrationType) {
            case integrationTypes.MANUAL:
                return this.sendManualOrder(order, supplier);
            
            case integrationTypes.API:
                return this.sendAPIOrder(order, supplier);
            
            case integrationTypes.EDI:
                return this.sendEDIOrder(order, supplier);
            
            default:
                return this.sendManualOrder(order, supplier);
        }
    }
    
    /**
     * Handmatige order (email)
     */
    async sendManualOrder(order, supplier) {
        const emailBody = this.generateOrderEmail(order, supplier);
        
        // In productie: verstuur via email API (SendGrid, Mailgun, etc.)
        console.log('📧 Email Order naar:', supplier.orderEmail);
        console.log(emailBody);
        
        // Update status
        order.status = orderStatus.PENDING;
        order.sentAt = new Date().toISOString();
        order.sentMethod = 'email';
        this.saveOrders();
        
        return {
            success: true,
            message: `Order verzonden naar ${supplier.name} via email`,
            emailTo: supplier.orderEmail
        };
    }
    
    /**
     * API order
     */
    async sendAPIOrder(order, supplier) {
        if (!supplier.apiKey) {
            throw new Error('API key niet geconfigureerd voor ' + supplier.name);
        }
        
        // In productie: echte API call
        /*
        const response = await fetch(supplier.apiEndpoint + '/orders', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + supplier.apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: order.items.map(item => ({
                    sku: item.productCode,
                    quantity: item.quantity
                })),
                shipping: order.dropship ? order.shippingAddress : null
            })
        });
        
        const result = await response.json();
        */
        
        // Simulatie
        console.log('🔌 API Order naar:', supplier.apiEndpoint);
        
        order.status = supplier.autoConfirm ? orderStatus.CONFIRMED : orderStatus.PENDING;
        order.sentAt = new Date().toISOString();
        order.sentMethod = 'api';
        this.saveOrders();
        
        return {
            success: true,
            message: `Order verzonden naar ${supplier.name} via API`,
            confirmed: supplier.autoConfirm
        };
    }
    
    /**
     * EDI order
     */
    async sendEDIOrder(order, supplier) {
        // EDI integratie vereist specifieke setup
        console.log('📡 EDI Order naar:', supplier.ediPartnerId);
        
        order.status = orderStatus.CONFIRMED;
        order.sentAt = new Date().toISOString();
        order.sentMethod = 'edi';
        this.saveOrders();
        
        return {
            success: true,
            message: `Order verzonden naar ${supplier.name} via EDI`
        };
    }
    
    /**
     * Genereer order email tekst
     */
    generateOrderEmail(order, supplier) {
        const dropshipText = order.dropship 
            ? `\n\n🚚 DROPSHIP ORDER - Verzend direct naar klant:\n${order.customer.firstName} ${order.customer.lastName}\n${order.shippingAddress.street}\n${order.shippingAddress.postalCode} ${order.shippingAddress.city}\n${order.shippingAddress.country}`
            : '\n\n📦 Verzend naar ons magazijn';
        
        return `
═══════════════════════════════════════════════════
INKOOPORDER - BOLLENSTREEK DIRECT
═══════════════════════════════════════════════════

Order ID: ${order.id}
Datum: ${new Date(order.createdAt).toLocaleString('nl-NL')}
Klant Order: ${order.customerOrderId}

───────────────────────────────────────────────────
PRODUCTEN
───────────────────────────────────────────────────
${order.items.map(item => 
`• ${item.quantity}x ${item.productName} (${item.productCode})
  Eenheidsprijs: €${item.inkoopprijs.toFixed(2)} | Totaal: €${item.totalInkoop.toFixed(2)}`
).join('\n\n')}

───────────────────────────────────────────────────
TOTAAL: €${order.totals.toFixed(2)}
───────────────────────────────────────────────────
${dropshipText}

Betaling volgens afspraak: ${supplier.paymentTerms} dagen

Met vriendelijke groet,
Bollenstreek Direct
info@bollenstreekdirect.nl
═══════════════════════════════════════════════════
        `.trim();
    }
    
    /**
     * Update order status
     */
    updateStatus(orderId, newStatus, trackingCode = null) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) return false;
        
        order.status = newStatus;
        order.updatedAt = new Date().toISOString();
        
        if (trackingCode) {
            order.trackingCode = trackingCode;
        }
        
        this.saveOrders();
        return true;
    }
    
    /**
     * Krijg orders per leverancier
     */
    getOrdersBySupplier(supplierId) {
        return this.orders.filter(o => o.supplierId === supplierId);
    }
    
    /**
     * Krijg openstaande orders
     */
    getPendingOrders() {
        return this.orders.filter(o => 
            o.status === orderStatus.PENDING || 
            o.status === orderStatus.CONFIRMED
        );
    }
}

// ========================================
// BETALINGSSTROMEN
// ========================================

const paymentFlows = {
    /**
     * Standaard flow: Klant betaalt → Wij ontvangen → Wij betalen leverancier
     */
    standard: {
        name: "Standaard",
        description: "Klant betaalt via Mollie, geld komt op onze rekening. Wij betalen leveranciers maandelijks.",
        steps: [
            { step: 1, actor: "Klant", action: "Betaalt via Mollie (iDEAL/creditcard)" },
            { step: 2, actor: "Mollie", action: "Verwerkt betaling, houdt fee in (±1.21% + €0.25)" },
            { step: 3, actor: "Ons", action: "Ontvangen netto bedrag (T+2 werkdagen)" },
            { step: 4, actor: "Ons", action: "Creëren inkoop orders per leverancier" },
            { step: 5, actor: "Leverancier", action: "Verzendt producten" },
            { step: 6, actor: "Ons", action: "Betalen leverancier (netto 14-30 dagen)" }
        ],
        pros: ["Volledige controle", "Cashflow voordeel", "Marge bescherming"],
        cons: ["Debiteurenrisico bij leveranciers", "Administratie"]
    },
    
    /**
     * Dropship flow: Klant betaalt → Wij houden marge → Leverancier krijgt rest
     */
    dropship: {
        name: "Dropshipping",
        description: "Leverancier verzendt direct naar klant. Wij houden alleen onze marge.",
        steps: [
            { step: 1, actor: "Klant", action: "Betaalt via Mollie" },
            { step: 2, actor: "Ons", action: "Ontvangen betaling, houden marge (±20%)" },
            { step: 3, actor: "Ons", action: "Sturen order door naar leverancier" },
            { step: 4, actor: "Leverancier", action: "Verzendt direct naar klant" },
            { step: 5, actor: "Ons", action: "Betalen leverancier (verkoop - onze marge)" }
        ],
        pros: ["Geen voorraad nodig", "Laag risico", "Schaalbaar"],
        cons: ["Minder controle over verzending", "Lagere marge", "Afhankelijk van leverancier"]
    },
    
    /**
     * Marketplace flow: Platform houdt geld vast tot levering
     */
    marketplace: {
        name: "Marktplaats Model",
        description: "Wij zijn platform, leveranciers verkopen direct. Wij nemen commissie.",
        steps: [
            { step: 1, actor: "Klant", action: "Betaalt via platform (Mollie Connect)" },
            { step: 2, actor: "Mollie", action: "Houdt geld in escrow" },
            { step: 3, actor: "Leverancier", action: "Krijgt notificatie, verzendt product" },
            { step: 4, actor: "Klant", action: "Bevestigt ontvangst" },
            { step: 5, actor: "Mollie", action: "Betaalt leverancier (min. commissie 15%)" }
        ],
        pros: ["Minimaal risico", "Automatische afhandeling", "Split payments"],
        cons: ["Mollie Connect kosten", "Complexer setup", "Minder controle"]
    }
};

// ========================================
// MARGE BEREKENING
// ========================================

/**
 * Bereken volledige marge analyse
 */
function calculateMargeAnalysis(cartItems, shippingCost, shippingPaid) {
    let totalInkoop = 0;
    let totalVerkoop = 0;
    const perSupplier = {};
    
    cartItems.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return;
        
        const inkoop = product.inkoopprijs * item.quantity;
        const verkoop = product.price * item.quantity;
        
        totalInkoop += inkoop;
        totalVerkoop += verkoop;
        
        const supplierId = product.leverancierId || product.kwekerId;
        if (!perSupplier[supplierId]) {
            perSupplier[supplierId] = { inkoop: 0, verkoop: 0 };
        }
        perSupplier[supplierId].inkoop += inkoop;
        perSupplier[supplierId].verkoop += verkoop;
    });
    
    const productMarge = totalVerkoop - totalInkoop;
    const shippingMarge = shippingPaid - shippingCost;
    const mollieFee = (totalVerkoop * 0.0121) + 0.25; // iDEAL fee
    
    const nettoMarge = productMarge + shippingMarge - mollieFee;
    const margePercentage = ((nettoMarge / totalVerkoop) * 100).toFixed(1);
    
    return {
        inkoop: totalInkoop,
        verkoop: totalVerkoop,
        productMarge: productMarge,
        shippingMarge: shippingMarge,
        mollieFee: mollieFee,
        nettoMarge: nettoMarge,
        margePercentage: margePercentage,
        perSupplier: perSupplier
    };
}

// Initialiseer manager
const supplierOrderManager = new SupplierOrderManager();

// Exporteer naar window
window.SupplierOrderManager = SupplierOrderManager;
window.supplierOrderManager = supplierOrderManager;
window.leverancierIntegrations = leverancierIntegrations;
window.integrationTypes = integrationTypes;
window.orderStatus = orderStatus;
window.paymentFlows = paymentFlows;
window.calculateMargeAnalysis = calculateMargeAnalysis;

console.log('🏭 Supplier Integration System loaded');
