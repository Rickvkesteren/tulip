# 💳 Betalingen & Inkoop Implementeren - Bollenstreek Direct

## Inhoudsopgave
1. [Business Modellen](#-business-modellen)
2. [Betalingsstromen](#-betalingsstromen)
3. [Verzendrestricties](#-verzendrestricties)
4. [Mollie Setup](#-aanbevolen-mollie-nederlands)
5. [Backend Implementatie](#stap-2-backend-opzetten)

---

## 🏪 Business Modellen

### Model 1: Voorraad Inkopen (Traditioneel)
```
[Kweker] → Jij koopt voorraad → [Jouw Magazijn] → Klant bestelt → Jij verzendt
```
- ✅ Volledige controle over kwaliteit
- ✅ Snellere levering
- ❌ Kapitaal nodig voor voorraad
- ❌ Risico op onverkochte voorraad

### Model 2: Dropshipping
```
[Klant bestelt] → Jij stuurt order door → [Kweker verzendt direct naar klant]
```
- ✅ Geen voorraad nodig
- ✅ Laag risico
- ❌ Minder controle over verzending
- ❌ Afhankelijk van kweker

### Model 3: Marktplaats/Platform
```
[Kwekers verkopen via jouw site] → Jij neemt 15-20% commissie
```
- ✅ Schaalbaar
- ✅ Minimaal risico
- ❌ Mollie Connect nodig
- ❌ Complexer setup

---

## 💰 Betalingsstromen

### Standaard Flow (Aanbevolen)
```
1. Klant betaalt €50,00 via iDEAL
2. Mollie houdt fee in: €0,86 (1,21% + €0,25)
3. Jij ontvangt: €49,14 (na 2 werkdagen)
4. Jij maakt inkoop orders per leverancier
5. Leverancier verzendt
6. Jij betaalt leverancier (netto 14-30 dagen)
```

**Voorbeeld marge berekening:**
| | Bedrag |
|---|---:|
| Klant betaalt | €50,00 |
| Inkoopprijs producten | €38,00 |
| Verzendkosten (werkelijk) | €4,50 |
| Mollie fee | €0,86 |
| **Netto winst** | **€6,64 (13,3%)** |

### Dropship Flow
```
1. Klant betaalt €50,00
2. Jij houdt €12,00 (marge + platform fee)
3. Kweker ontvangt €38,00 en verzendt direct
```

---

## 🚚 Verzendrestricties

Het systeem heeft nu ingebouwde verzendrestricties:

### Ondersteunde Landen
| Land | Verzendkosten | Gratis vanaf | Levertijd |
|------|-------------:|-------------:|-----------|
| 🇳🇱 Nederland | €6,95 | €35 | 1-3 dagen |
| 🇧🇪 België | €9,95 | €50 | 2-4 dagen |
| 🇩🇪 Duitsland | €12,95 | €75 | 3-5 dagen |
| 🇫🇷 Frankrijk | €14,95 | €100 | 4-7 dagen |
| 🇦🇹 Oostenrijk | €14,95 | €100 | 4-6 dagen |
| 🇬🇧 UK | €19,95 | €150 | 5-10 dagen* |
| 🇨🇭 Zwitserland | €24,95 | €200 | 5-8 dagen* |

*Seizoensgebonden of met speciale certificaten

### Geblokkeerde Landen
- 🇺🇸 VS / 🇨🇦 Canada - Fytosanitaire restricties
- 🇦🇺 Australië / 🇳🇿 Nieuw-Zeeland - Quarantine
- 🇯🇵 Japan / 🇨🇳 China - Importrestricties

### Postcode Toeslagen
- Waddeneilanden (NL): +€5,00
- Duitse eilanden: +€8,00

### Seizoensgebonden Verzending
- **Voorjaarsbollen** (tulpen, narcissen, etc.): Sept - Dec
- **Zomerbollen** (dahlia's, lelies, etc.): Feb - Mei

---

## 🏆 Aanbevolen: Mollie (Nederlands)

Mollie is de beste keuze voor Nederlandse webshops:
- ✅ iDEAL (meest populair in NL)
- ✅ Bancontact (België)
- ✅ Creditcard
- ✅ PayPal
- ✅ Klarna (achteraf betalen)
- ✅ Apple Pay
- ✅ SOFORT (Duitsland)

### Stap 1: Mollie Account

1. Ga naar [mollie.com](https://www.mollie.com/nl)
2. Maak een account aan
3. Verifieer je bedrijf (KvK-nummer nodig)
4. Ontvang je API keys in het dashboard

### Stap 2: Backend Opzetten

Je hebt 3 opties:

#### Optie A: Vercel Serverless Functions (Gratis, Aanbevolen)

Maak een bestand `api/create-payment.js`:

```javascript
// api/create-payment.js
import Mollie from '@mollie/api-client';

const mollieClient = new Mollie({ apiKey: process.env.MOLLIE_API_KEY });

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { amount, description, redirectUrl, items } = req.body;

        const payment = await mollieClient.payments.create({
            amount: {
                currency: 'EUR',
                value: amount.toFixed(2) // Mollie vereist string met 2 decimalen
            },
            description: description,
            redirectUrl: redirectUrl,
            webhookUrl: `${process.env.BASE_URL}/api/mollie-webhook`,
            metadata: { items }
        });

        res.json({ 
            checkoutUrl: payment.getCheckoutUrl(),
            paymentId: payment.id 
        });
    } catch (error) {
        console.error('Mollie error:', error);
        res.status(500).json({ error: 'Betaling kon niet worden aangemaakt' });
    }
}
```

Maak ook `api/mollie-webhook.js`:

```javascript
// api/mollie-webhook.js
import Mollie from '@mollie/api-client';

const mollieClient = new Mollie({ apiKey: process.env.MOLLIE_API_KEY });

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        const payment = await mollieClient.payments.get(req.body.id);
        
        if (payment.status === 'paid') {
            // Bestelling is betaald!
            // - Stuur bevestigingsmail
            // - Update database
            console.log('Payment successful:', payment.id);
        }

        res.status(200).end();
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).end();
    }
}
```

#### Optie B: Node.js/Express Server

```javascript
// server.js
const express = require('express');
const Mollie = require('@mollie/api-client');
require('dotenv').config();

const app = express();
const mollieClient = new Mollie({ apiKey: process.env.MOLLIE_API_KEY });

app.use(express.json());

app.post('/api/payments/create', async (req, res) => {
    try {
        const { amount, description, items } = req.body;

        const payment = await mollieClient.payments.create({
            amount: {
                currency: 'EUR',
                value: amount.toFixed(2)
            },
            description: description,
            redirectUrl: `${process.env.BASE_URL}/betaling-voltooid`,
            webhookUrl: `${process.env.BASE_URL}/api/webhook`,
            metadata: { items }
        });

        res.json({ checkoutUrl: payment.getCheckoutUrl() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3001, () => console.log('Server running on port 3001'));
```

#### Optie C: Netlify Functions

```javascript
// netlify/functions/create-payment.js
const Mollie = require('@mollie/api-client');
const mollieClient = new Mollie({ apiKey: process.env.MOLLIE_API_KEY });

exports.handler = async (event) => {
    const { amount, description } = JSON.parse(event.body);

    const payment = await mollieClient.payments.create({
        amount: { currency: 'EUR', value: amount.toFixed(2) },
        description,
        redirectUrl: process.env.REDIRECT_URL,
        webhookUrl: `${process.env.URL}/.netlify/functions/mollie-webhook`
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ checkoutUrl: payment.getCheckoutUrl() })
    };
};
```

### Stap 3: Frontend Aanpassen

Update `checkout.html` om de API aan te roepen:

```javascript
async function processPayment(orderData) {
    try {
        const response = await fetch('/api/create-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: orderData.total,
                description: `Bollenstreek Direct - Order`,
                items: orderData.items,
                redirectUrl: window.location.origin + '/betaling-voltooid.html'
            })
        });

        const { checkoutUrl } = await response.json();
        
        // Redirect naar Mollie betaalpagina
        window.location.href = checkoutUrl;
    } catch (error) {
        console.error('Payment error:', error);
        alert('Er ging iets mis met de betaling. Probeer opnieuw.');
    }
}
```

### Stap 4: Environment Variables

Zet in je `.env` bestand:

```
MOLLIE_API_KEY=test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
BASE_URL=https://jouw-domein.nl
```

**Test keys** beginnen met `test_`  
**Live keys** beginnen met `live_`

---

## 🔄 Alternatief: Stripe

Stripe is internationaler en heeft uitstekende documentatie:

```javascript
// api/create-checkout.js (Stripe)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'ideal', 'bancontact'],
        line_items: req.body.items.map(item => ({
            price_data: {
                currency: 'eur',
                product_data: { name: item.name },
                unit_amount: Math.round(item.price * 100) // Stripe uses cents
            },
            quantity: item.quantity
        })),
        mode: 'payment',
        success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BASE_URL}/checkout`
    });

    res.json({ url: session.url });
}
```

---

## 📦 Deployment Opties

| Platform | Prijs | Geschikt voor |
|----------|-------|---------------|
| **Vercel** | Gratis | GitHub Pages + API |
| **Netlify** | Gratis | Statische sites + Functions |
| **Railway** | €5/mo | Full Node.js server |
| **Render** | Gratis | Full backend |

### Vercel met GitHub Pages

1. Push je code naar GitHub
2. Verbind Vercel met je repository
3. Voeg environment variables toe in Vercel dashboard
4. Deploy automatisch bij elke push

---

## ✅ Checklist voor Live Gaan

- [ ] Mollie account geverifieerd
- [ ] Live API key ingesteld
- [ ] Webhook URL geconfigureerd
- [ ] SSL certificaat (https://)
- [ ] Privacy policy pagina
- [ ] Algemene voorwaarden
- [ ] Retourbeleid
- [ ] Test betalingen gedaan

---

## 🧪 Testen

Gebruik Mollie's test modus:
- API key: `test_xxxxx`
- Test iDEAL bank: "TBM Bank"
- Test creditcard: 4242 4242 4242 4242

---

## 📞 Support

- Mollie Docs: https://docs.mollie.com
- Stripe Docs: https://stripe.com/docs
- Vercel Docs: https://vercel.com/docs

---

*Laatste update: Januari 2025*
