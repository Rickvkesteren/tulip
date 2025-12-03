// ========================================
// Bollenstreek Direct - Verzending & Restricties Configuratie
// ========================================

// Verzendrestricties per land
const shippingRestrictions = {
    // Landen waar we WEL leveren
    allowed: {
        // Europa - Primaire markten
        NL: {
            name: "Nederland",
            nameEn: "Netherlands",
            enabled: true,
            shippingCost: 6.95,
            freeShippingThreshold: 35,
            deliveryDays: { min: 1, max: 3 },
            paymentMethods: ['ideal', 'bancontact', 'creditcard', 'paypal', 'klarna', 'applepay'],
            vatRate: 21,
            restrictions: null
        },
        BE: {
            name: "België",
            nameEn: "Belgium",
            enabled: true,
            shippingCost: 9.95,
            freeShippingThreshold: 50,
            deliveryDays: { min: 2, max: 4 },
            paymentMethods: ['bancontact', 'ideal', 'creditcard', 'paypal', 'klarna'],
            vatRate: 21,
            restrictions: null
        },
        DE: {
            name: "Duitsland",
            nameEn: "Germany",
            enabled: true,
            shippingCost: 12.95,
            freeShippingThreshold: 75,
            deliveryDays: { min: 3, max: 5 },
            paymentMethods: ['sofort', 'giropay', 'creditcard', 'paypal', 'klarna'],
            vatRate: 19,
            restrictions: null
        },
        FR: {
            name: "Frankrijk",
            nameEn: "France",
            enabled: true,
            shippingCost: 14.95,
            freeShippingThreshold: 100,
            deliveryDays: { min: 4, max: 7 },
            paymentMethods: ['creditcard', 'paypal'],
            vatRate: 20,
            restrictions: {
                noShipTo: ['Corsica', 'DOM-TOM'] // Geen verzending naar overzeese gebieden
            }
        },
        AT: {
            name: "Oostenrijk",
            nameEn: "Austria",
            enabled: true,
            shippingCost: 14.95,
            freeShippingThreshold: 100,
            deliveryDays: { min: 4, max: 6 },
            paymentMethods: ['eps', 'creditcard', 'paypal', 'klarna'],
            vatRate: 20,
            restrictions: null
        },
        LU: {
            name: "Luxemburg",
            nameEn: "Luxembourg",
            enabled: true,
            shippingCost: 9.95,
            freeShippingThreshold: 50,
            deliveryDays: { min: 2, max: 4 },
            paymentMethods: ['creditcard', 'paypal'],
            vatRate: 17,
            restrictions: null
        },
        
        // Landen met beperkte verzending (alleen in seizoen)
        GB: {
            name: "Verenigd Koninkrijk",
            nameEn: "United Kingdom",
            enabled: true,
            shippingCost: 19.95,
            freeShippingThreshold: 150,
            deliveryDays: { min: 5, max: 10 },
            paymentMethods: ['creditcard', 'paypal', 'applepay'],
            vatRate: 0, // Na Brexit geen BTW
            restrictions: {
                seasonal: true,
                seasonStart: 9, // September
                seasonEnd: 11,  // November
                message: "Verzending naar UK alleen mogelijk van september t/m november vanwege douaneregelingen."
            }
        },
        CH: {
            name: "Zwitserland",
            nameEn: "Switzerland",
            enabled: true,
            shippingCost: 24.95,
            freeShippingThreshold: 200,
            deliveryDays: { min: 5, max: 8 },
            paymentMethods: ['creditcard', 'paypal'],
            vatRate: 0, // Geen EU
            restrictions: {
                requiresPhytosanitaryCertificate: true,
                message: "Verzending naar Zwitserland vereist een fytosanitair certificaat (+€15)."
            }
        }
    },
    
    // Landen waar we NIET leveren (met reden)
    blocked: {
        US: { reason: "Fytosanitaire restricties - geen import van bloembollen toegestaan" },
        CA: { reason: "Fytosanitaire restricties - geen import van bloembollen toegestaan" },
        AU: { reason: "Strenge quarantaineregels - geen import van plantmateriaal" },
        NZ: { reason: "Strenge quarantaineregels - geen import van plantmateriaal" },
        JP: { reason: "Complexe importprocedures en lange levertijden" },
        CN: { reason: "Importrestricties op plantmateriaal" },
        RU: { reason: "Momenteel geen verzending mogelijk" },
        BY: { reason: "Momenteel geen verzending mogelijk" }
    }
};

// Postcode restricties (bijv. voor eilanden of afgelegen gebieden)
const postalCodeRestrictions = {
    NL: {
        // Waddeneilanden - extra kosten
        surcharge: {
            patterns: ['88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'], // Ameland, Texel, etc.
            extraCost: 5.00,
            message: "Waddeneilanden: +€5,00 eilandtoeslag"
        }
    },
    DE: {
        // Duitse eilanden
        surcharge: {
            patterns: ['25', '26', '27'], // Schleswig-Holstein eilanden
            extraCost: 8.00,
            message: "Duitse Waddeneilanden: +€8,00 eilandtoeslag"
        }
    }
};

// Seizoensgebonden verzending
const seasonalShipping = {
    // Voorjaarsbollen (tulpen, narcissen, hyacinten, krokussen)
    springBulbs: {
        categories: ['tulpen', 'narcissen', 'hyacinten', 'krokussen', 'allium'],
        shippingPeriod: {
            start: { month: 9, day: 1 },   // 1 september
            end: { month: 12, day: 15 }    // 15 december
        },
        message: "Voorjaarsbollen worden verzonden van september t/m half december voor optimale planting."
    },
    
    // Zomerbollen (dahlia's, gladiolen, lelies)
    summerBulbs: {
        categories: ['dahlia', 'gladiolen', 'lelies', 'begonia'],
        shippingPeriod: {
            start: { month: 2, day: 15 },  // 15 februari
            end: { month: 5, day: 31 }     // 31 mei
        },
        message: "Zomerbollen worden verzonden van half februari t/m eind mei."
    }
};

// ========================================
// HELPER FUNCTIES
// ========================================

/**
 * Check of verzending naar een land toegestaan is
 */
function canShipToCountry(countryCode) {
    if (shippingRestrictions.blocked[countryCode]) {
        return {
            allowed: false,
            reason: shippingRestrictions.blocked[countryCode].reason
        };
    }
    
    const country = shippingRestrictions.allowed[countryCode];
    if (!country || !country.enabled) {
        return {
            allowed: false,
            reason: "Wij leveren momenteel niet in dit land."
        };
    }
    
    // Check seizoensrestricties
    if (country.restrictions?.seasonal) {
        const now = new Date();
        const month = now.getMonth() + 1;
        
        if (month < country.restrictions.seasonStart || month > country.restrictions.seasonEnd) {
            return {
                allowed: false,
                reason: country.restrictions.message
            };
        }
    }
    
    return { allowed: true, country: country };
}

/**
 * Bereken verzendkosten voor een land
 */
function calculateShippingCost(countryCode, subtotal, postalCode = null) {
    const check = canShipToCountry(countryCode);
    if (!check.allowed) {
        return { error: check.reason };
    }
    
    const country = check.country;
    let cost = country.shippingCost;
    let messages = [];
    
    // Check gratis verzending drempel
    if (subtotal >= country.freeShippingThreshold) {
        cost = 0;
        messages.push(`Gratis verzending naar ${country.name}!`);
    }
    
    // Check postcode toeslagen
    if (postalCode && postalCodeRestrictions[countryCode]?.surcharge) {
        const surcharge = postalCodeRestrictions[countryCode].surcharge;
        const prefix = postalCode.substring(0, 2);
        
        if (surcharge.patterns.includes(prefix)) {
            cost += surcharge.extraCost;
            messages.push(surcharge.message);
        }
    }
    
    // Check speciale certificaten (bijv. Zwitserland)
    if (country.restrictions?.requiresPhytosanitaryCertificate) {
        cost += 15.00;
        messages.push(country.restrictions.message);
    }
    
    return {
        cost: cost,
        freeFrom: country.freeShippingThreshold,
        deliveryDays: country.deliveryDays,
        messages: messages
    };
}

/**
 * Check of producten in het huidige seizoen verzonden kunnen worden
 */
function canShipProducts(cartItems) {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentDay = now.getDate();
    const issues = [];
    
    cartItems.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return;
        
        const category = product.category.toLowerCase();
        
        // Check voorjaarsbollen
        if (seasonalShipping.springBulbs.categories.includes(category)) {
            const period = seasonalShipping.springBulbs.shippingPeriod;
            const inSeason = (currentMonth >= period.start.month && currentMonth <= period.end.month);
            
            if (!inSeason) {
                issues.push({
                    product: product.name,
                    message: seasonalShipping.springBulbs.message
                });
            }
        }
        
        // Check zomerbollen
        if (seasonalShipping.summerBulbs.categories.includes(category)) {
            const period = seasonalShipping.summerBulbs.shippingPeriod;
            const inSeason = (currentMonth >= period.start.month && currentMonth <= period.end.month);
            
            if (!inSeason) {
                issues.push({
                    product: product.name,
                    message: seasonalShipping.summerBulbs.message
                });
            }
        }
    });
    
    return {
        canShip: issues.length === 0,
        issues: issues
    };
}

/**
 * Krijg beschikbare betaalmethodes voor een land
 */
function getPaymentMethodsForCountry(countryCode) {
    const check = canShipToCountry(countryCode);
    if (!check.allowed) {
        return [];
    }
    
    return check.country.paymentMethods;
}

/**
 * Genereer verzendopties dropdown HTML
 */
function generateCountrySelectHTML(selectedCountry = 'NL') {
    const options = Object.entries(shippingRestrictions.allowed)
        .filter(([code, country]) => country.enabled)
        .map(([code, country]) => {
            const selected = code === selectedCountry ? 'selected' : '';
            return `<option value="${code}" ${selected}>${country.name}</option>`;
        })
        .join('\n');
    
    return options;
}

// Exporteer naar window voor gebruik in andere scripts
window.shippingRestrictions = shippingRestrictions;
window.canShipToCountry = canShipToCountry;
window.calculateShippingCost = calculateShippingCost;
window.canShipProducts = canShipProducts;
window.getPaymentMethodsForCountry = getPaymentMethodsForCountry;
window.generateCountrySelectHTML = generateCountrySelectHTML;
window.seasonalShipping = seasonalShipping;

console.log('📦 Shipping Configuration loaded');
