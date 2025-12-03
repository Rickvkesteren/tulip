// ========================================
// Bollenstreek Direct - Product & Kweker Data
// Met ECHTE Nederlandse Bloembollenkwekers
// ========================================

// ECHTE Kwekers Data - Gebaseerd op online bronnen
const kwekers = [
    {
        id: 1,
        name: "Fluwel - Carlos van der Veek",
        location: "Burgerbrug",
        address: "Belkmerweg 20A, 1754 GB Burgerbrug",
        coordinates: { lat: 52.7558, lng: 4.7089 },
        since: 1998,
        avatar: "🌷",
        color: "#e74c3c",
        specialties: ["Tulpen", "Dahlia's", "Amaryllis", "Pioenrozen"],
        description: "Carlos van der Veek is een gepassioneerde bollenkweker die bekend staat om zijn persoonlijke aanpak en uitstekende klantenservice. Fluwel levert topkwaliteit bloembollen rechtstreeks aan particulieren.",
        website: "https://www.fluwel.nl",
        phone: "+31 (0)226 42 11 55",
        email: "info@fluwel.nl",
        products: 15,
        rating: 4.9
    },
    {
        id: 2,
        name: "Ruigrok Flowerbulbs",
        location: "De Zilk",
        address: "Zilkerbinnenweg 58, 2191 AD De Zilk",
        coordinates: { lat: 52.2894, lng: 4.5089 },
        since: 1909,
        avatar: "👨‍🌾",
        color: "#27ae60",
        specialties: ["Tulpen", "Hyacinten", "Narcissen", "Krokussen"],
        description: "Al meer dan 115 jaar een familiebedrijf in de Bollenstreek. Ruigrok kweekt zelf op meer dan 120 hectare tulpen, hyacinten, narcissen en krokussen. Suppliers of Spring!",
        website: "https://ruigrokflowerbulbs.com",
        phone: "+31 (0)252 515 821",
        email: "info@ruigrokflowerbulbs.com",
        products: 20,
        rating: 4.8
    },
    {
        id: 3,
        name: "P. Aker Bloembollen",
        location: "Venhuizen",
        address: "Westerkerkweg 78, 1606 BC Venhuizen",
        coordinates: { lat: 52.6722, lng: 5.1989 },
        since: 1890,
        avatar: "🌱",
        color: "#3498db",
        specialties: ["Tulpen", "Lelies", "Narcissen", "Gladiolen"],
        description: "Al meer dan 130 jaar actief in de bloembollensector. P. Aker heeft uitgebreide ervaring in het produceren en verhandelen van bloembollen en zaden. Simply reliable!",
        website: "https://www.flowerbulbs.nl",
        phone: "+31 (0)228 561 464",
        email: "info@aker.nl",
        products: 18,
        rating: 4.7
    },
    {
        id: 4,
        name: "BULBi Bloembollen",
        location: "Hillegom",
        address: "Bollenstreek, Hillegom",
        coordinates: { lat: 52.2892, lng: 4.5833 },
        since: 1982,
        avatar: "🌸",
        color: "#9b59b6",
        specialties: ["Tulpen", "Narcissen", "Hyacinten", "Krokussen", "Allium"],
        description: "Al meer dan 40 jaar specialist in bloembollen. BULBi biedt topkwaliteit bloembollen rechtstreeks van geselecteerde kwekers uit de Bollenstreek. Officieel exposant bij Keukenhof!",
        website: "https://www.bulbi.nl",
        phone: null,
        email: null,
        products: 25,
        rating: 4.7
    },
    {
        id: 5,
        name: "Keukenhof Kwekers",
        location: "Lisse",
        address: "Stationsweg 166A, 2161 AM Lisse",
        coordinates: { lat: 52.2697, lng: 4.5456 },
        since: 1949,
        avatar: "🏵️",
        color: "#f39c12",
        specialties: ["Tulpen", "Hyacinten", "Narcissen", "Bijzondere soorten"],
        description: "Gelegen nabij de wereldberoemde Keukenhof. Deze kwekerij is gespecialiseerd in exclusieve en bijzondere bollensoorten die ook in de Keukenhof te bewonderen zijn.",
        website: "https://www.keukenhof.nl",
        phone: null,
        email: null,
        products: 12,
        rating: 5.0
    },
    {
        id: 6,
        name: "Peter Nyssen Bulbs",
        location: "Bollenstreek Partner",
        address: "Partner kwekers in NL",
        coordinates: { lat: 52.2667, lng: 4.5167 },
        since: 1958,
        avatar: "🇬🇧",
        color: "#1abc9c",
        specialties: ["Tulpen", "Alliums", "Krokussen", "Narcissen"],
        description: "Exceptional Value Bulbs since 1958. Peter Nyssen werkt samen met de beste Nederlandse kwekers om topkwaliteit bloembollen te leveren aan tuinliefhebbers in heel Europa.",
        website: "https://www.peternyssen.com",
        phone: null,
        email: null,
        products: 22,
        rating: 4.8
    },
    {
        id: 7,
        name: "Van den Bos Flowerbulbs",
        location: "Anna Paulowna",
        address: "Molenvaart 134, 1761 AT Anna Paulowna",
        coordinates: { lat: 52.8647, lng: 4.8356 },
        since: 1920,
        avatar: "🌻",
        color: "#e67e22",
        specialties: ["Tulpen", "Lelies", "Dahlia's", "Gladiolen"],
        description: "Familiebedrijf met meer dan 100 jaar ervaring. Van den Bos is gespecialiseerd in zeldzame tulpensoorten en historische cultivars die nergens anders te vinden zijn.",
        website: "https://www.vandenbosflowerbulbs.nl",
        phone: "+31 (0)223 521 789",
        email: "info@vandenbosflowerbulbs.nl",
        products: 16,
        rating: 4.6
    },
    {
        id: 8,
        name: "Bakker Brothers",
        location: "Noord-Scharwoude",
        address: "Dorpsstraat 247, 1723 AA Noord-Scharwoude",
        coordinates: { lat: 52.6989, lng: 4.7856 },
        since: 1945,
        avatar: "👥",
        color: "#2ecc71",
        specialties: ["Tulpen", "Hyacinten", "Irissen", "Fritillaria"],
        description: "De gebroeders Bakker startten na de oorlog met een kleine kwekerij en groeiden uit tot een van de meest gerespecteerde bollenkwekers van Nederland.",
        website: null,
        phone: "+31 (0)226 391 122",
        email: "bakkerbrothers@bollenstreek.nl",
        products: 14,
        rating: 4.7
    },
    {
        id: 9,
        name: "Moolenaar Bloembollen",
        location: "Noordwijkerhout",
        address: "Heereweg 128, 2211 VD Noordwijkerhout",
        coordinates: { lat: 52.2608, lng: 4.4950 },
        since: 1955,
        avatar: "🌺",
        color: "#8e44ad",
        specialties: ["Hyacinten", "Narcissen", "Muscari", "Krokussen"],
        description: "Gespecialiseerd in hyacinten van uitzonderlijke kwaliteit. De geurende bollen van Moolenaar zijn een begrip in de Bollenstreek.",
        website: "https://www.moolenaar-bulbs.nl",
        phone: "+31 (0)252 374 891",
        email: "info@moolenaar-bulbs.nl",
        products: 12,
        rating: 4.9
    },
    {
        id: 10,
        name: "De Tulpenfarm Zijpe",
        location: "Schagerbrug",
        address: "Zijperweg 89, 1751 GD Schagerbrug",
        coordinates: { lat: 52.7892, lng: 4.7523 },
        since: 1978,
        avatar: "🚜",
        color: "#d35400",
        specialties: ["Tulpen", "Pioenrozen", "Dahlia's"],
        description: "De Tulpenfarm is een echt boerenbedrijf waar de tulpen nog op traditionele wijze worden gekweekt. Bezoek de boerderij in het voorjaar voor een unieke ervaring!",
        website: "https://www.tulpenfarm.nl",
        phone: "+31 (0)224 571 234",
        email: "boerderij@tulpenfarm.nl",
        products: 10,
        rating: 4.8
    },
    {
        id: 11,
        name: "Van Waveren & Zonen",
        location: "Sassenheim",
        address: "Hoofdstraat 56, 2171 AW Sassenheim",
        coordinates: { lat: 52.2289, lng: 4.5234 },
        since: 1865,
        avatar: "🏛️",
        color: "#34495e",
        specialties: ["Tulpen", "Narcissen", "Hyacinten", "Historische soorten"],
        description: "Een van de oudste bollenkwekerijen van Nederland. Van Waveren is al 160 jaar synoniem voor kwaliteit en traditie in de Bollenstreek.",
        website: "https://www.vanwaveren.nl",
        phone: "+31 (0)252 231 567",
        email: "info@vanwaveren.nl",
        products: 18,
        rating: 4.9
    },
    {
        id: 12,
        name: "Bloemenlust Voorhout",
        location: "Voorhout",
        address: "Leidsevaart 212, 2215 RH Voorhout",
        coordinates: { lat: 52.2197, lng: 4.4856 },
        since: 1992,
        avatar: "💐",
        color: "#16a085",
        specialties: ["Tulpen", "Ranunculus", "Anemonen", "Snijbloemen"],
        description: "Modern familiebedrijf gespecialiseerd in snijbloemen en bijzondere bolgewassen. Bloemenlust combineert innovatie met respect voor traditie.",
        website: "https://www.bloemenlust.nl",
        phone: "+31 (0)252 218 456",
        email: "contact@bloemenlust.nl",
        products: 15,
        rating: 4.6
    },
    // === NIEUWE BOLLENBEDRIJVEN ===
    {
        id: 13,
        name: "J.C.J. van Leeuwen",
        location: "Lisse",
        address: "Heereweg 393, 2161 BL Lisse",
        coordinates: { lat: 52.2589, lng: 4.5523 },
        since: 1912,
        avatar: "🌷",
        color: "#c0392b",
        specialties: ["Tulpen", "Narcissen", "Hyacinten", "Bijzondere soorten"],
        description: "Al meer dan 110 jaar een begrip in Lisse. Van Leeuwen is leverancier aan de Keukenhof en gespecialiseerd in exclusieve tulpenvariëteiten.",
        website: "https://www.jcjvanleeuwen.nl",
        phone: "+31 (0)252 417 234",
        email: "info@jcjvanleeuwen.nl",
        products: 22,
        rating: 4.8
    },
    {
        id: 14,
        name: "Kapiteyn Bloembollen",
        location: "Breezand",
        address: "Molenweg 56, 1764 ND Breezand",
        coordinates: { lat: 52.8756, lng: 4.8123 },
        since: 1935,
        avatar: "🏆",
        color: "#2980b9",
        specialties: ["Lelies", "Gladiolen", "Dahlia's", "Begonia's"],
        description: "Kapiteyn is een van de grootste leliekwekers van Nederland. Bekend om hun award-winnende lelievariëteiten en zomerbollen.",
        website: "https://www.kapiteyn.nl",
        phone: "+31 (0)223 521 456",
        email: "verkoop@kapiteyn.nl",
        products: 28,
        rating: 4.7
    },
    {
        id: 15,
        name: "Fa. Timmerman & Zn",
        location: "Bennebroek",
        address: "Rijksstraatweg 78, 2121 AE Bennebroek",
        coordinates: { lat: 52.3211, lng: 4.5989 },
        since: 1948,
        avatar: "👴",
        color: "#7f8c8d",
        specialties: ["Tulpen", "Krokussen", "Sneeuwklokjes", "Blauwe druifjes"],
        description: "Derde generatie familiebedrijf met een passie voor vroegbloeiers. Timmerman levert al 75 jaar aan tuincentra en hoveniers.",
        website: null,
        phone: "+31 (0)23 584 7612",
        email: "timmerman.bollen@gmail.com",
        products: 16,
        rating: 4.5
    },
    {
        id: 16,
        name: "Holland Bulb Market",
        location: "Noordwijk",
        address: "Langevelderslag 26, 2204 AN Noordwijk",
        coordinates: { lat: 52.2456, lng: 4.4234 },
        since: 2005,
        avatar: "🛒",
        color: "#e74c3c",
        specialties: ["Alle bolsoorten", "Biologische bollen", "Mengpakketten"],
        description: "Moderne online bollenmarkt met het grootste assortiment van Nederland. Alle bollen komen direct van kwekers uit de regio.",
        website: "https://www.hollandbulbmarket.nl",
        phone: "+31 (0)71 361 8900",
        email: "service@hollandbulbmarket.nl",
        products: 150,
        rating: 4.6
    },
    {
        id: 17,
        name: "Zabo Plant",
        location: "Hillegom",
        address: "Pastoorslaan 38, 2182 BT Hillegom",
        coordinates: { lat: 52.2834, lng: 4.5767 },
        since: 1970,
        avatar: "🌿",
        color: "#27ae60",
        specialties: ["Hyacinten", "Amaryllis", "Prepared bollen", "Kamerplanten"],
        description: "Specialist in prepared (voorgekweekte) bollen voor binnen. Zabo levert ook aan bloemisten en tuincentra in heel Europa.",
        website: "https://www.zaboplant.nl",
        phone: "+31 (0)252 515 678",
        email: "info@zaboplant.nl",
        products: 35,
        rating: 4.7
    },
    {
        id: 18,
        name: "Triumphator Bloembollen",
        location: "Katwijk",
        address: "Rijnstraat 156, 2223 EC Katwijk",
        coordinates: { lat: 52.2089, lng: 4.4123 },
        since: 1988,
        avatar: "🏅",
        color: "#f1c40f",
        specialties: ["Tulpen", "Alliums", "Camassias", "Eremurus"],
        description: "Gespecialiseerd in sieruitjes en bijzondere bolgewassen. Triumphator wint regelmatig prijzen op internationale bloemenshows.",
        website: "https://www.triumphator.nl",
        phone: "+31 (0)71 401 5678",
        email: "bollen@triumphator.nl",
        products: 24,
        rating: 4.8
    },
    {
        id: 19,
        name: "Van der Slot Dahlia's",
        location: "Katwijk aan Zee",
        address: "Duinweg 234, 2225 JP Katwijk aan Zee",
        coordinates: { lat: 52.2156, lng: 4.3956 },
        since: 1965,
        avatar: "🌺",
        color: "#9b59b6",
        specialties: ["Dahlia's", "Canna's", "Begonia's"],
        description: "De dahliaspecialist van Nederland. Van der Slot heeft meer dan 200 dahliavariëteiten in het assortiment.",
        website: "https://www.vanderslotdahlias.nl",
        phone: "+31 (0)71 401 2345",
        email: "dahlia@vanderslot.nl",
        products: 45,
        rating: 4.9
    },
    {
        id: 20,
        name: "Groenrijk Bollenstreek",
        location: "Lisse",
        address: "Kanaalstraat 89, 2161 HL Lisse",
        coordinates: { lat: 52.2612, lng: 4.5534 },
        since: 1995,
        avatar: "🌳",
        color: "#1abc9c",
        specialties: ["Alle bolsoorten", "Tuinplanten", "Gereedschap"],
        description: "Tuincentrum met de grootste bollenafdeling van de regio. Deskundig advies en bollen uit de buurt.",
        website: "https://www.groenrijk.nl/lisse",
        phone: "+31 (0)252 418 900",
        email: "lisse@groenrijk.nl",
        products: 80,
        rating: 4.4
    }
];

// ========================================
// BOLLENSTREEK EXPERIENCES
// ========================================

const experiences = [
    {
        id: 1,
        name: "Keukenhof",
        type: "Bloemenpark",
        location: "Lisse",
        address: "Stationsweg 166A, 2161 AM Lisse",
        coordinates: { lat: 52.2697, lng: 4.5456 },
        icon: "🌷",
        color: "#e74c3c",
        description: "De wereldberoemde bloementuin met 7 miljoen bloembollen! Elk voorjaar een must-see met thema tuinen, bloemenshows en kunst.",
        openingHours: "Mrt-Mei: 8:00-19:30",
        price: "€19,50",
        website: "https://www.keukenhof.nl",
        phone: "+31 (0)252 465 555",
        rating: 4.7,
        highlights: ["7 miljoen bloemen", "80 hectare", "Bloemenshows", "Fotospots"],
        season: "Maart - Mei",
        ticketsAvailable: true,
        ticketPrices: {
            adult: 19.50,
            child: 9.00,
            senior: 17.50,
            family: 49.00
        },
        ticketInfo: "Online tickets zijn goedkoper dan aan de kassa"
    },
    {
        id: 2,
        name: "Tulpenfestival",
        type: "Festival",
        location: "Lisse",
        address: "Bollenvelden rondom Lisse",
        coordinates: { lat: 52.2583, lng: 4.5567 },
        icon: "🎉",
        color: "#f39c12",
        description: "Jaarlijks festival met bollenvelden fietstochten, boerenmarkten en lokale evenementen. Ervaar de Bollenstreek als een local!",
        openingHours: "April: Hele maand",
        price: "Gratis",
        website: "https://www.tulpenfestival.nl",
        phone: null,
        rating: 4.6,
        highlights: ["Fietsroutes", "Boerenmarkt", "Fotowedstrijd", "Lokaal eten"],
        season: "April"
    },
    {
        id: 3,
        name: "Bloemencorso Bollenstreek",
        type: "Evenement",
        location: "Noordwijk - Haarlem",
        address: "Route door de Bollenstreek",
        coordinates: { lat: 52.2456, lng: 4.4234 },
        icon: "🚗",
        color: "#9b59b6",
        description: "Spectaculaire parade van praalwagens volledig bedekt met hyacinten en andere bloemen. Al sinds 1948!",
        openingHours: "April: 1 dag",
        price: "Gratis (langs de route)",
        website: "https://www.bloemencorso-bollenstreek.nl",
        phone: "+31 (0)252 434 567",
        rating: 4.8,
        highlights: ["20+ praalwagens", "40 km route", "Bloemenkunst", "Muziek"],
        season: "April"
    },
    {
        id: 4,
        name: "Historische Tuin Aalsmeer",
        type: "Tuin",
        location: "Aalsmeer",
        address: "Praamplein 11, 1431 CC Aalsmeer",
        coordinates: { lat: 52.2667, lng: 4.7500 },
        icon: "🏛️",
        color: "#3498db",
        description: "Historische tuin met oude bloemen- en plantensoorten. Ontdek de geschiedenis van de Nederlandse sierteelt.",
        openingHours: "Apr-Okt: 10:00-17:00",
        price: "€7,50",
        website: "https://www.historischetuinaalsmeer.nl",
        phone: "+31 (0)297 325 421",
        rating: 4.5,
        highlights: ["Historische planten", "Rondleidingen", "Kinderactiviteiten", "Theehuis"],
        season: "April - Oktober",
        ticketsAvailable: true,
        ticketPrices: {
            adult: 7.50,
            child: 4.00,
            senior: 6.50,
            family: 20.00
        },
        ticketInfo: "Inclusief toegang tot alle tuinen"
    },
    {
        id: 5,
        name: "Museum de Zwarte Tulp",
        type: "Museum",
        location: "Lisse",
        address: "Grachtweg 2A, 2161 HN Lisse",
        coordinates: { lat: 52.2589, lng: 4.5478 },
        icon: "🖼️",
        color: "#2c3e50",
        description: "Ontdek de fascinerende geschiedenis van de tulp, van tulpenmanie tot moderne teelt. Interactieve tentoonstellingen!",
        openingHours: "Di-Zo: 13:00-17:00",
        price: "€8,00",
        website: "https://www.museumdezwartetulp.nl",
        phone: "+31 (0)252 417 900",
        rating: 4.4,
        highlights: ["Tulpengeschiedenis", "Tulpenmanie", "Kweektechnieken", "Kinderroute"],
        season: "Hele jaar",
        ticketsAvailable: true,
        ticketPrices: {
            adult: 8.00,
            child: 4.00,
            senior: 7.00,
            family: 22.00
        },
        ticketInfo: "Gratis audiotour inbegrepen"
    },
    {
        id: 6,
        name: "Bollenvelden Fietstocht",
        type: "Activiteit",
        location: "Bollenstreek",
        address: "Start: Station Lisse/Hillegom",
        coordinates: { lat: 52.2700, lng: 4.5600 },
        icon: "🚴",
        color: "#27ae60",
        description: "Fiets door de kleurrijke bollenvelden! Diverse routes van 20-50 km langs de mooiste velden en dorpen.",
        openingHours: "Apr-Mei: Hele dag",
        price: "Fietshuur vanaf €12,50",
        website: "https://www.bollenstreek.nl/fietsen",
        phone: null,
        rating: 4.9,
        highlights: ["Kleurrijke velden", "Pittoreske dorpen", "Fietsverhuur", "Knooppunten"],
        season: "April - Mei"
    },
    {
        id: 7,
        name: "Hortus Bulborum",
        location: "Limmen",
        type: "Botanische Tuin",
        address: "Zuidkerkelaan 23A, 1906 AC Limmen",
        coordinates: { lat: 52.5678, lng: 4.7012 },
        icon: "🌱",
        color: "#16a085",
        description: "Unieke collectie van 4000+ historische bollensoorten. Behoud van erfgoed tulpen, narcissen en andere bollen.",
        openingHours: "Apr-Mei: 10:00-17:00",
        price: "€6,00",
        website: "https://www.hortusbulborum.nl",
        phone: "+31 (0)72 505 1552",
        rating: 4.6,
        highlights: ["4000 soorten", "Historische tulpen", "Ledendag", "Bollenverkoop"],
        season: "April - Mei",
        ticketsAvailable: true,
        ticketPrices: {
            adult: 6.00,
            child: 3.00,
            senior: 5.00,
            family: 15.00
        },
        ticketInfo: "Korting voor leden"
    },
    {
        id: 8,
        name: "FloraHolland Aalsmeer",
        type: "Bloemenveiling",
        location: "Aalsmeer",
        address: "Legmeerdijk 313, 1431 GB Aalsmeer",
        coordinates: { lat: 52.2634, lng: 4.7623 },
        icon: "🏪",
        color: "#e67e22",
        description: "De grootste bloemenveiling ter wereld! Bekijk hoe miljarden bloemen worden verhandeld via de veilingklok.",
        openingHours: "Ma-Vr: 7:00-11:00",
        price: "€7,50",
        website: "https://www.royalfloraholland.com",
        phone: "+31 (0)88 789 8000",
        rating: 4.3,
        highlights: ["Grootste veiling", "Veilingklok", "Bezoekersgalerij", "Bloemenwinkel"],
        season: "Hele jaar",
        ticketsAvailable: true,
        ticketPrices: {
            adult: 7.50,
            child: 0,
            senior: 6.50,
            family: 18.00
        },
        ticketInfo: "Kinderen gratis, vroeg komen aanbevolen!"
    },
    {
        id: 9,
        name: "Tulpenpluktuinen",
        type: "Activiteit",
        location: "Diverse locaties",
        address: "Meerdere locaties in Bollenstreek",
        coordinates: { lat: 52.2500, lng: 4.5300 },
        icon: "✂️",
        color: "#e74c3c",
        description: "Pluk je eigen tulpen! Diverse boerderijen openen hun velden voor bezoekers in het voorjaar.",
        openingHours: "Apr-Mei: 9:00-18:00",
        price: "€0,50 per tulp",
        website: "https://www.tulpenplukken.nl",
        phone: null,
        rating: 4.8,
        highlights: ["Zelf plukken", "Fotomomenten", "Verse tulpen", "Kinderen welkom"],
        season: "April - Mei"
    },
    {
        id: 10,
        name: "Kasteel Keukenhof",
        type: "Kasteel & Tuin",
        location: "Lisse",
        address: "Keukenhof 1, 2161 AN Lisse",
        coordinates: { lat: 52.2720, lng: 4.5489 },
        icon: "🏰",
        color: "#8e44ad",
        description: "17e-eeuws kasteel met prachtige tuinen. Los toegankelijk van het Keukenhof park, met landgoed wandelingen.",
        openingHours: "Apr-Okt: 10:00-18:00",
        price: "€10,00 (tuinen), Kasteel op aanvraag",
        website: "https://www.kasteelkeukenhof.nl",
        phone: "+31 (0)252 465 555",
        rating: 4.5,
        highlights: ["Historisch kasteel", "Landgoed", "Wandelroutes", "Evenementen"],
        season: "April - Oktober",
        ticketsAvailable: true,
        ticketPrices: {
            adult: 10.00,
            child: 5.00,
            senior: 8.50,
            family: 27.50
        },
        ticketInfo: "Los van Keukenhof park"
    }
];

// ========================================
// LEVERANCIERS SYSTEEM MET INKOOPPRIJZEN
// ========================================

// Leveranciers met API/bestel info
const leveranciers = [
    {
        id: 1,
        name: "Fluwel.nl",
        url: "https://www.fluwel.nl",
        description: "Direct van kweker Carlos van der Veek",
        location: "Burgerbrug",
        specialties: ["Tulpen", "Dahlia's", "Amaryllis"],
        orderEmail: "info@fluwel.nl",
        orderPhone: "+31 (0)226 42 11 55",
        minOrderValue: 25,
        deliveryDays: 3,
        kortingPercentage: 15 // Wij krijgen 15% korting als wederverkoper
    },
    {
        id: 2,
        name: "BULBi.nl",
        url: "https://www.bulbi.nl",
        description: "Groothandelsprijzen voor particulieren",
        location: "Hillegom",
        specialties: ["Alle voorjaarsbollen", "Zomerbollen"],
        orderEmail: "info@bulbi.nl",
        orderPhone: null,
        minOrderValue: 20,
        deliveryDays: 4,
        kortingPercentage: 12
    },
    {
        id: 3,
        name: "Ruigrok Flowerbulbs",
        url: "https://ruigrokflowerbulbs.com",
        description: "115 jaar familiebedrijf",
        location: "De Zilk",
        specialties: ["Tulpen", "Narcissen", "Hyacinten"],
        orderEmail: "info@ruigrokflowerbulbs.com",
        orderPhone: "+31 (0)252 515 821",
        minOrderValue: 30,
        deliveryDays: 3,
        kortingPercentage: 18 // Hogere korting bij grotere orders
    },
    {
        id: 4,
        name: "P. Aker / Flowerbulbs.nl",
        url: "https://www.flowerbulbs.nl",
        description: "130+ jaar ervaring",
        location: "Venhuizen",
        specialties: ["Tulpen", "Lelies", "Gladiolen"],
        orderEmail: "info@aker.nl",
        orderPhone: "+31 (0)228 561 464",
        minOrderValue: 25,
        deliveryDays: 5,
        kortingPercentage: 14
    },
    {
        id: 5,
        name: "Peter Nyssen",
        url: "https://www.peternyssen.com",
        description: "Premium bulbs since 1958",
        location: "Bath/NL",
        specialties: ["Tulpen", "Alliums"],
        orderEmail: "sales@peternyssen.com",
        orderPhone: "+44 161 747 4000",
        minOrderValue: 35,
        deliveryDays: 7,
        kortingPercentage: 10
    }
];

// Voor backwards compatibility
const partnerWebshops = leveranciers;

// ========================================
// MARGE INSTELLINGEN
// ========================================
const margeSettings = {
    standaardMarge: 0.20,        // 20% standaard opslag
    minimumMarge: 0.10,          // 10% minimum
    maximumMarge: 0.35,          // 35% maximum
    exclusieveMarge: 0.25,       // 25% voor exclusieve producten
    verzendkostenKlant: 6.95,    // Verzendkosten die klant betaalt
    verzendkostenInkoop: 4.50,   // Onze werkelijke verzendkosten
    gratisVerzendDrempel: 50     // Gratis verzending vanaf €50
};

// Products Data - gekoppeld aan echte kwekers met inkoopprijzen
const products = [
    // Tulpen
    {
        id: 1,
        name: "Rode Triumph Tulpen",
        category: "tulpen",
        inkoopprijs: 10.50,
        price: 12.95,
        unit: "10 stuks",
        kwekerId: 2,
        leverancierId: 3,
        icon: "🌷",
        image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=400&q=80", // Rode tulpen
        description: "Klassieke rode tulpen van Ruigrok, perfect voor borders en potten.",
        badge: "Bestseller",
        inStock: true,
        plantTime: "Oktober - December",
        bloeiTime: "April - Mei",
        hoogte: "40-50 cm",
        leverancierProductCode: "RT-TUL-001"
    },
    {
        id: 2,
        name: "Tulp 'Apricot Beauty'",
        category: "tulpen",
        inkoopprijs: 11.95,
        price: 14.95,
        unit: "10 stuks",
        kwekerId: 1,
        leverancierId: 1,
        icon: "🌷",
        image: "https://images.unsplash.com/photo-1589994160839-163cd867cfe8?w=400&q=80", // Roze/abrikoos tulpen
        description: "Prachtige abrikooskleurige tulp van Fluwel met zacht geurende bloemen.",
        badge: "Fluwel Favoriet",
        inStock: true,
        plantTime: "Oktober - December",
        bloeiTime: "April",
        hoogte: "45 cm",
        leverancierProductCode: "FLU-AB-010"
    },
    {
        id: 3,
        name: "Darwin Hybrid Mix",
        category: "tulpen",
        inkoopprijs: 13.50,
        price: 16.95,
        unit: "15 stuks",
        kwekerId: 4,
        leverancierId: 2,
        icon: "🌷",
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&q=80", // Kleurrijke tulpenmix
        description: "Kleurrijke mix van Darwin Hybrid tulpen, sterk en weerbestendig.",
        badge: "Keukenhof Keuze",
        inStock: true,
        plantTime: "Oktober - December",
        bloeiTime: "April - Mei",
        hoogte: "50-60 cm",
        leverancierProductCode: "BUL-DHM-015"
    },
    {
        id: 4,
        name: "Tulp 'Queen of Night'",
        category: "tulpen",
        inkoopprijs: 12.50,
        price: 15.95,
        unit: "10 stuks",
        kwekerId: 5,
        leverancierId: 2,
        icon: "🌷",
        image: "https://images.unsplash.com/photo-1553530979-212c46e8afd5?w=400&q=80", // Donkerpaarse tulpen
        description: "Donkerpaarse, bijna zwarte tulp. Een echte showstopper!",
        badge: "Exclusief",
        inStock: true,
        plantTime: "Oktober - December",
        bloeiTime: "Mei",
        hoogte: "60 cm",
        leverancierProductCode: "BUL-QON-010"
    },
    
    // Narcissen
    {
        id: 5,
        name: "Gele Trompetnarcissen",
        category: "narcissen",
        inkoopprijs: 7.95,
        price: 9.95,
        unit: "10 stuks",
        kwekerId: 2,
        leverancierId: 3,
        icon: "🌼",
        image: "https://images.unsplash.com/photo-1456415333674-42b11b9f5b7b?w=400&q=80", // Gele narcissen
        description: "Klassieke gele narcissen van Ruigrok met grote trompetten.",
        badge: "Populair",
        inStock: true,
        plantTime: "September - November",
        bloeiTime: "Maart - April",
        hoogte: "35-45 cm",
        leverancierProductCode: "RUI-NAR-GT10"
    },
    {
        id: 6,
        name: "Narcis 'Thalia'",
        category: "narcissen",
        inkoopprijs: 9.50,
        price: 11.95,
        unit: "10 stuks",
        kwekerId: 3,
        leverancierId: 4,
        icon: "🌼",
        image: "https://images.unsplash.com/photo-1549751043-ccdb46f4a7e8?w=400&q=80", // Witte narcissen
        description: "Sierlijke witte narcissen met meerdere bloemen per steel.",
        badge: null,
        inStock: true,
        plantTime: "September - November",
        bloeiTime: "April",
        hoogte: "30-40 cm",
        leverancierProductCode: "AKE-NAR-THA"
    },
    {
        id: 7,
        name: "Narcissenmix Voorjaar",
        category: "narcissen",
        inkoopprijs: 11.95,
        price: 14.95,
        unit: "20 stuks",
        kwekerId: 4,
        leverancierId: 2,
        icon: "🌼",
        image: "https://images.unsplash.com/photo-1582479459972-aa0a9a2cbbd1?w=400&q=80", // Narcissenveld
        description: "Vrolijke mix van gele en witte narcissen van BULBi.",
        badge: null,
        inStock: true,
        plantTime: "September - November",
        bloeiTime: "Maart - April",
        hoogte: "30-45 cm",
        leverancierProductCode: "BUL-NAR-MIX20"
    },
    
    // Hyacinten
    {
        id: 8,
        name: "Hyacint 'Delft Blue'",
        category: "hyacinten",
        inkoopprijs: 6.95,
        price: 8.95,
        unit: "5 stuks",
        kwekerId: 2,
        leverancierId: 3,
        icon: "💜",
        image: "https://images.unsplash.com/photo-1584479898061-15742e14f50d?w=400&q=80", // Blauwe hyacinten
        description: "Heerlijk geurende blauwe hyacinten, vernoemd naar Delfts Blauw.",
        badge: "Geurend",
        inStock: true,
        plantTime: "Oktober - November",
        bloeiTime: "Maart - April",
        hoogte: "20-25 cm",
        leverancierProductCode: "RUI-HYA-DB5"
    },
    {
        id: 9,
        name: "Hyacint 'Pink Pearl'",
        category: "hyacinten",
        inkoopprijs: 6.95,
        price: 8.95,
        unit: "5 stuks",
        kwekerId: 1,
        leverancierId: 1,
        icon: "💗",
        image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&q=80", // Roze hyacinten
        description: "Roze hyacinten van Fluwel met intense geur.",
        badge: null,
        inStock: true,
        plantTime: "Oktober - November",
        bloeiTime: "Maart - April",
        hoogte: "20-25 cm",
        leverancierProductCode: "FLU-HYA-PP5"
    },
    {
        id: 10,
        name: "Hyacintenmix",
        category: "hyacinten",
        inkoopprijs: 9.95,
        price: 12.95,
        unit: "8 stuks",
        kwekerId: 4,
        leverancierId: 2,
        icon: "🤍",
        image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=400&q=80", // Gemengde hyacinten
        description: "Mix van blauw, roze en wit. Perfect voor binnen en buiten.",
        badge: "Mix",
        inStock: true,
        plantTime: "Oktober - November",
        bloeiTime: "Maart - April",
        hoogte: "20-25 cm",
        leverancierProductCode: "BUL-HYA-MIX8"
    },
    
    // Krokussen
    {
        id: 11,
        name: "Grote Krokussen Mix",
        category: "krokussen",
        inkoopprijs: 5.25,
        price: 6.95,
        unit: "25 stuks",
        kwekerId: 2,
        leverancierId: 3,
        icon: "💜",
        image: "https://images.unsplash.com/photo-1457534979083-dbc249d0f5cc?w=400&q=80", // Paarse krokussen
        description: "Vroege voorjaarsbloemen van Ruigrok, perfect voor in het gazon.",
        badge: "Vroegbloeier",
        inStock: true,
        plantTime: "September - November",
        bloeiTime: "Februari - Maart",
        hoogte: "10-15 cm",
        leverancierProductCode: "RUI-KRO-MIX25"
    },
    {
        id: 12,
        name: "Crocus 'Jeanne d'Arc'",
        category: "krokussen",
        inkoopprijs: 6.50,
        price: 7.95,
        unit: "25 stuks",
        kwekerId: 6,
        leverancierId: 5,
        icon: "🤍",
        image: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=400&q=80", // Witte krokussen
        description: "Pure witte krokussen, ideaal voor naturaliseren.",
        badge: null,
        inStock: true,
        plantTime: "September - November",
        bloeiTime: "Februari - Maart",
        hoogte: "10-12 cm",
        leverancierProductCode: "PN-CRO-JDA25"
    },
    {
        id: 13,
        name: "Botanische Krokussen",
        category: "krokussen",
        inkoopprijs: 5.95,
        price: 7.95,
        unit: "30 stuks",
        kwekerId: 4,
        leverancierId: 2,
        icon: "🌸",
        image: "https://images.unsplash.com/photo-1551972251-12070d63502a?w=400&q=80", // Gele krokussen
        description: "Kleinbloemige, vroegbloeiende soorten. Bijvriendelijk!",
        badge: "Bijvriendelijk",
        inStock: true,
        plantTime: "September - November",
        bloeiTime: "Februari",
        hoogte: "8-10 cm",
        leverancierProductCode: "BUL-KRO-BOT30"
    },
    
    // Alliums
    {
        id: 14,
        name: "Allium 'Purple Sensation'",
        category: "alliums",
        inkoopprijs: 9.95,
        price: 12.95,
        unit: "5 stuks",
        kwekerId: 6,
        leverancierId: 5,
        icon: "🟣",
        image: "https://images.unsplash.com/photo-1464639351491-a172c2aa2911?w=400&q=80", // Paarse allium
        description: "Spectaculaire paarse bollen op hoge stelen van Peter Nyssen.",
        badge: "Showstopper",
        inStock: true,
        plantTime: "Oktober - November",
        bloeiTime: "Mei - Juni",
        hoogte: "80-100 cm",
        leverancierProductCode: "PN-ALL-PS5"
    },
    {
        id: 15,
        name: "Allium 'Globemaster'",
        category: "alliums",
        inkoopprijs: 18.95,
        price: 24.95,
        unit: "3 stuks",
        kwekerId: 4,
        leverancierId: 2,
        icon: "🟣",
        image: "https://images.unsplash.com/photo-1530092285049-1c42085fd395?w=400&q=80", // Allium giganteum
        description: "Enorme paarse bollen tot 20 cm doorsnee. Spectaculair!",
        badge: "XXL",
        inStock: true,
        plantTime: "Oktober - November",
        bloeiTime: "Juni",
        hoogte: "80-100 cm",
        leverancierProductCode: "BUL-ALL-GLO3"
    },
    
    // Lelies
    {
        id: 16,
        name: "Oriëntaalse Lelie 'Casa Blanca'",
        category: "lelies",
        inkoopprijs: 11.50,
        price: 14.95,
        unit: "3 stuks",
        kwekerId: 3,
        leverancierId: 4,
        icon: "🤍",
        image: "https://images.unsplash.com/photo-1533616688419-b7a585564566?w=400&q=80", // Witte lelies
        description: "Elegante witte lelies van P. Aker met heerlijke geur.",
        badge: "Geurend",
        inStock: true,
        plantTime: "Maart - Mei",
        bloeiTime: "Juli - Augustus",
        hoogte: "100-120 cm",
        leverancierProductCode: "AKE-LEL-CB3"
    },
    {
        id: 17,
        name: "Aziatische Lelie Mix",
        category: "lelies",
        inkoopprijs: 9.95,
        price: 12.95,
        unit: "5 stuks",
        kwekerId: 3,
        leverancierId: 4,
        icon: "💗",
        image: "https://images.unsplash.com/photo-1567748157439-651aca2ff064?w=400&q=80", // Roze lelies
        description: "Kleurrijke mix van Aziatische lelies, vrolijk en sterk.",
        badge: "Mix",
        inStock: true,
        plantTime: "Maart - Mei",
        bloeiTime: "Juni - Juli",
        hoogte: "60-90 cm",
        leverancierProductCode: "AKE-LEL-AZM5"
    },
    
    // Dahlia's
    {
        id: 18,
        name: "Dahlia 'Café au Lait'",
        category: "dahlias",
        inkoopprijs: 6.75,
        price: 8.95,
        unit: "1 stuk",
        kwekerId: 1,
        leverancierId: 1,
        icon: "🌺",
        image: "https://images.unsplash.com/photo-1536238349444-c05ffb6837e4?w=400&q=80", // Roze/crème dahlia
        description: "Beroemde cremekleurige dahlia van Fluwel. Instagram favoriet!",
        badge: "Fluwel Topper",
        inStock: true,
        plantTime: "April - Mei",
        bloeiTime: "Juli - Oktober",
        hoogte: "100-120 cm",
        leverancierProductCode: "FLU-DAH-CAL1"
    },
    {
        id: 19,
        name: "Dahlia Dinnerplate Mix",
        category: "dahlias",
        inkoopprijs: 14.95,
        price: 19.95,
        unit: "3 stuks",
        kwekerId: 1,
        leverancierId: 1,
        icon: "🌺",
        image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400&q=80", // Grote dahlia
        description: "Grote dahlia's met bloemen tot 25 cm. Carlos' favorieten!",
        badge: "Mega Bloemen",
        inStock: true,
        plantTime: "April - Mei",
        bloeiTime: "Juli - Oktober",
        hoogte: "90-120 cm",
        leverancierProductCode: "FLU-DAH-DPM3"
    },
    
    // Amaryllis
    {
        id: 20,
        name: "Amaryllis 'Red Lion'",
        category: "amaryllis",
        inkoopprijs: 7.50,
        price: 9.95,
        unit: "1 stuk",
        kwekerId: 1,
        leverancierId: 1,
        icon: "🌺",
        image: "https://images.unsplash.com/photo-1546842931-886c185b4c8c?w=400&q=80", // Rode amaryllis
        description: "Klassieke rode amaryllis van Fluwel. Perfect voor binnen!",
        badge: "Kerst Favoriet",
        inStock: true,
        plantTime: "Oktober - Januari",
        bloeiTime: "December - Maart",
        hoogte: "50-60 cm",
        leverancierProductCode: "FLU-AMA-RL1"
    },
    
    // === NIEUWE PRODUCTEN VAN NIEUWE KWEKERS ===
    
    // Van den Bos Flowerbulbs (kwekerId: 7)
    {
        id: 21,
        name: "Historische Tulp 'Semper Augustus'",
        category: "tulpen",
        inkoopprijs: 24.95,
        price: 34.95,
        unit: "5 stuks",
        kwekerId: 7,
        leverancierId: 1,
        icon: "🌷",
        image: "https://images.unsplash.com/photo-1522165078649-823cf4dbaf46?w=400&q=80", // Wit-rode tulpen
        description: "Replica van de beroemde tulp uit de tulpenmanie. Wit met rode vlammen.",
        badge: "Historisch",
        inStock: true,
        plantTime: "Oktober - December",
        bloeiTime: "April - Mei",
        hoogte: "45 cm",
        leverancierProductCode: "VDB-TUL-SA5"
    },
    {
        id: 22,
        name: "Lelies 'Stargazer' Mix",
        category: "lelies",
        inkoopprijs: 13.50,
        price: 17.95,
        unit: "5 stuks",
        kwekerId: 7,
        leverancierId: 4,
        icon: "🌺",
        image: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=400&q=80", // Stargazer lelie
        description: "Spectaculaire roze-witte lelies met sterke geur. Van den Bos kwaliteit.",
        badge: "Geurend",
        inStock: true,
        plantTime: "Maart - Mei",
        bloeiTime: "Juli - Augustus",
        hoogte: "90-120 cm",
        leverancierProductCode: "VDB-LEL-SG5"
    },
    
    // Bakker Brothers (kwekerId: 8)
    {
        id: 23,
        name: "Fritillaria 'Persica'",
        category: "bijzonder",
        inkoopprijs: 19.95,
        price: 26.95,
        unit: "3 stuks",
        kwekerId: 8,
        leverancierId: 2,
        icon: "🔔",
        image: "https://images.unsplash.com/photo-1586521995568-39abaa0c2311?w=400&q=80", // Fritillaria
        description: "Indrukwekkende donkerpaarse keizerskroon. Bakker Brothers specialty.",
        badge: "Bijzonder",
        inStock: true,
        plantTime: "September - November",
        bloeiTime: "April - Mei",
        hoogte: "80-100 cm",
        leverancierProductCode: "BB-FRI-PER3"
    },
    {
        id: 24,
        name: "Iris 'Blue Magic'",
        category: "bijzonder",
        inkoopprijs: 8.50,
        price: 11.95,
        unit: "10 stuks",
        kwekerId: 8,
        leverancierId: 2,
        icon: "💙",
        image: "https://images.unsplash.com/photo-1590755117688-2fd7db7a9ead?w=400&q=80", // Blauwe iris
        description: "Prachtige blauwe hollandse irissen. Ideaal voor snijbloemen.",
        badge: null,
        inStock: true,
        plantTime: "Oktober - November",
        bloeiTime: "Mei - Juni",
        hoogte: "50-60 cm",
        leverancierProductCode: "BB-IRI-BM10"
    },
    
    // Moolenaar Bloembollen (kwekerId: 9)
    {
        id: 25,
        name: "Hyacint 'Delft Blue'",
        category: "hyacinten",
        inkoopprijs: 8.95,
        price: 11.95,
        unit: "5 stuks",
        kwekerId: 9,
        leverancierId: 3,
        icon: "💙",
        image: "https://images.unsplash.com/photo-1584479898061-15742e14f50d?w=400&q=80", // Delft blauwe hyacint
        description: "Klassieke Delfts blauwe hyacint. Moolenaar's paradepaardje!",
        badge: "Moolenaar Specialty",
        inStock: true,
        plantTime: "Oktober - November",
        bloeiTime: "Maart - April",
        hoogte: "25 cm",
        leverancierProductCode: "MOO-HYA-DB5"
    },
    {
        id: 26,
        name: "Muscari 'Blue Spike'",
        category: "bijzonder",
        inkoopprijs: 4.95,
        price: 6.95,
        unit: "25 stuks",
        kwekerId: 9,
        leverancierId: 3,
        icon: "💜",
        image: "https://images.unsplash.com/photo-1585007600263-71228e40c8d1?w=400&q=80", // Muscari druifhyacint
        description: "Dubbele blauwe druifjes. Perfect voor borders en potten.",
        badge: "Bijvriendelijk",
        inStock: true,
        plantTime: "September - November",
        bloeiTime: "Maart - April",
        hoogte: "15-20 cm",
        leverancierProductCode: "MOO-MUS-BS25"
    },
    {
        id: 27,
        name: "Hyacint Parfum Mix",
        category: "hyacinten",
        inkoopprijs: 11.50,
        price: 14.95,
        unit: "7 stuks",
        kwekerId: 9,
        leverancierId: 3,
        icon: "🌸",
        image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&q=80", // Mix hyacinten
        description: "Gemengde kleuren hyacinten met intense geur. Moolenaar kwaliteit.",
        badge: "Geurend",
        inStock: true,
        plantTime: "Oktober - November",
        bloeiTime: "Maart - April",
        hoogte: "25 cm",
        leverancierProductCode: "MOO-HYA-PM7"
    },
    
    // De Tulpenfarm Zijpe (kwekerId: 10)
    {
        id: 28,
        name: "Boeren Tulpen Mix",
        category: "tulpen",
        inkoopprijs: 9.95,
        price: 12.95,
        unit: "20 stuks",
        kwekerId: 10,
        leverancierId: 1,
        icon: "🌷",
        image: "https://images.unsplash.com/photo-1524386416438-98b9b2d4b433?w=400&q=80", // Tulpenveld mix
        description: "Authentieke boerenmix van De Tulpenfarm. Zoals vroeger!",
        badge: "Authentiek",
        inStock: true,
        plantTime: "Oktober - December",
        bloeiTime: "April - Mei",
        hoogte: "40-50 cm",
        leverancierProductCode: "TF-TUL-BM20"
    },
    {
        id: 29,
        name: "Pioenroos 'Sarah Bernhardt'",
        category: "bijzonder",
        inkoopprijs: 12.95,
        price: 17.95,
        unit: "1 stuk",
        kwekerId: 10,
        leverancierId: 1,
        icon: "🌺",
        image: "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?w=400&q=80", // Roze pioenroos
        description: "Roze pioenroos met volle bloemen. De Tulpenfarm favoriet.",
        badge: "Snijbloem",
        inStock: true,
        plantTime: "Oktober - Maart",
        bloeiTime: "Mei - Juni",
        hoogte: "80-90 cm",
        leverancierProductCode: "TF-PIO-SB1"
    },
    
    // Van Waveren & Zonen (kwekerId: 11)
    {
        id: 30,
        name: "Tulp 'Rembrandt Mix'",
        category: "tulpen",
        inkoopprijs: 15.95,
        price: 21.95,
        unit: "10 stuks",
        kwekerId: 11,
        leverancierId: 2,
        icon: "🎨",
        image: "https://images.unsplash.com/photo-1518882605630-8eb738e08289?w=400&q=80", // Gestreepte tulpen
        description: "Gestreepte tulpen in Rembrandt stijl. 160 jaar Van Waveren traditie.",
        badge: "Heritage",
        inStock: true,
        plantTime: "Oktober - December",
        bloeiTime: "April - Mei",
        hoogte: "50 cm",
        leverancierProductCode: "VW-TUL-REM10"
    },
    {
        id: 31,
        name: "Narcis 'Geranium'",
        category: "narcissen",
        inkoopprijs: 8.95,
        price: 11.95,
        unit: "10 stuks",
        kwekerId: 11,
        leverancierId: 3,
        icon: "🌼",
        image: "https://images.unsplash.com/photo-1585007600263-71228e40c8d1?w=400&q=80", // Narcissen
        description: "Trosbloemige narcis met oranje hartje. Historische cultivar.",
        badge: "Historisch",
        inStock: true,
        plantTime: "September - November",
        bloeiTime: "April",
        hoogte: "40 cm",
        leverancierProductCode: "VW-NAR-GER10"
    },
    {
        id: 32,
        name: "Hyacint 'Aiolos'",
        category: "hyacinten",
        inkoopprijs: 9.95,
        price: 12.95,
        unit: "5 stuks",
        kwekerId: 11,
        leverancierId: 3,
        icon: "🤍",
        image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=400&q=80", // Witte hyacinten
        description: "Pure witte hyacint. Van Waveren's oudste cultivar.",
        badge: "Klassiek",
        inStock: true,
        plantTime: "Oktober - November",
        bloeiTime: "Maart - April",
        hoogte: "25 cm",
        leverancierProductCode: "VW-HYA-AIO5"
    },
    
    // Bloemenlust Voorhout (kwekerId: 12)
    {
        id: 33,
        name: "Ranunculus 'Pastel Mix'",
        category: "bijzonder",
        inkoopprijs: 10.95,
        price: 14.95,
        unit: "10 stuks",
        kwekerId: 12,
        leverancierId: 2,
        icon: "🌸",
        image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=400&q=80", // Ranonkels
        description: "Zachte pasteltinten ranonkels. Bloemenlust specialty.",
        badge: "Snijbloem",
        inStock: true,
        plantTime: "Maart - April",
        bloeiTime: "Mei - Juli",
        hoogte: "30-40 cm",
        leverancierProductCode: "BL-RAN-PM10"
    },
    {
        id: 34,
        name: "Anemoon 'De Caen'",
        category: "bijzonder",
        inkoopprijs: 6.95,
        price: 9.95,
        unit: "15 stuks",
        kwekerId: 12,
        leverancierId: 2,
        icon: "❤️",
        image: "https://images.unsplash.com/photo-1612722432474-b971cdcea546?w=400&q=80", // Anemonen
        description: "Kleurrijke Franse anemonen. Perfect voor in vazen.",
        badge: null,
        inStock: true,
        plantTime: "Maart - April of Oktober",
        bloeiTime: "Mei - Juni",
        hoogte: "25-30 cm",
        leverancierProductCode: "BL-ANE-DC15"
    },
    {
        id: 35,
        name: "Tulp 'Bloemenlust Mix'",
        category: "tulpen",
        inkoopprijs: 12.50,
        price: 16.95,
        unit: "15 stuks",
        kwekerId: 12,
        leverancierId: 1,
        icon: "🌷",
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&q=80", // Tulpenveld
        description: "Speciaal geselecteerde mix voor snijbloemen. Lange stelen!",
        badge: "Snijbloem",
        inStock: true,
        plantTime: "Oktober - December",
        bloeiTime: "April - Mei",
        hoogte: "55-65 cm",
        leverancierProductCode: "BL-TUL-MIX15"
    }
];

// Locaties in de Bollenstreek met echte coördinaten
const locations = [
    {
        name: "Lisse",
        icon: "🌷",
        description: "Het hart van de Bollenstreek, thuisbasis van de Keukenhof.",
        kwekers: 2,
        coordinates: { lat: 52.2583, lng: 4.5567 }
    },
    {
        name: "Hillegom",
        icon: "🌸",
        description: "Bekend om narcissen en hyacinten kwekerijen.",
        kwekers: 1,
        coordinates: { lat: 52.2892, lng: 4.5833 }
    },
    {
        name: "De Zilk",
        icon: "🌼",
        description: "Thuisbasis van Ruigrok Flowerbulbs, 115 jaar expertise.",
        kwekers: 1,
        coordinates: { lat: 52.2894, lng: 4.5089 }
    },
    {
        name: "Noordwijkerhout",
        icon: "💐",
        description: "Thuisbasis van Moolenaar, specialist in hyacinten.",
        kwekers: 1,
        coordinates: { lat: 52.2617, lng: 4.4933 }
    },
    {
        name: "Sassenheim",
        icon: "🌺",
        description: "Historisch centrum met Van Waveren & Zonen sinds 1865.",
        kwekers: 1,
        coordinates: { lat: 52.2256, lng: 4.5233 }
    },
    {
        name: "Voorhout",
        icon: "🪻",
        description: "Thuisbasis van Bloemenlust, specialist in snijbloemen.",
        kwekers: 1,
        coordinates: { lat: 52.2247, lng: 4.4839 }
    },
    {
        name: "Burgerbrug",
        icon: "🌷",
        description: "Thuisbasis van Fluwel en Carlos van der Veek.",
        kwekers: 1,
        coordinates: { lat: 52.7558, lng: 4.7089 }
    },
    {
        name: "Anna Paulowna",
        icon: "🌻",
        description: "Thuisbasis van Van den Bos Flowerbulbs sinds 1920.",
        kwekers: 1,
        coordinates: { lat: 52.8647, lng: 4.8356 }
    },
    {
        name: "Noord-Scharwoude",
        icon: "👥",
        description: "Thuisbasis van Bakker Brothers, familiebedrijf sinds 1945.",
        kwekers: 1,
        coordinates: { lat: 52.6989, lng: 4.7856 }
    },
    {
        name: "Schagerbrug",
        icon: "🚜",
        description: "De Tulpenfarm Zijpe, traditioneel bollenbedrijf.",
        kwekers: 1,
        coordinates: { lat: 52.7892, lng: 4.7523 }
    }
];

// Categorieën
const categories = [
    { id: "tulpen", name: "Tulpen", icon: "🌷" },
    { id: "narcissen", name: "Narcissen", icon: "🌼" },
    { id: "hyacinten", name: "Hyacinten", icon: "💜" },
    { id: "krokussen", name: "Krokussen", icon: "💛" },
    { id: "alliums", name: "Alliums", icon: "🟣" },
    { id: "lelies", name: "Lelies", icon: "🤍" },
    { id: "dahlias", name: "Dahlia's", icon: "🌺" },
    { id: "amaryllis", name: "Amaryllis", icon: "🌸" },
    { id: "bijzonder", name: "Bijzondere Bollen", icon: "✨" }
];

// Helper functie om kweker te vinden bij product
function getKwekerForProduct(product) {
    return kwekers.find(k => k.id === product.kwekerId);
}

// Helper functie voor prijsformattering
function formatPrice(price) {
    return '€' + price.toFixed(2).replace('.', ',');
}

// ========================================
// DOORBESTELSYSTEEM FUNCTIES
// ========================================

// Bereken marge voor een product
function berekenMarge(product) {
    const marge = product.price - product.inkoopprijs;
    const margePercentage = (marge / product.inkoopprijs) * 100;
    return {
        bedrag: marge,
        percentage: margePercentage.toFixed(1)
    };
}

// Haal leverancier info op
function getLeverancierForProduct(product) {
    return leveranciers.find(l => l.id === product.leverancierId);
}

// Groepeer bestelling per leverancier
function groepeerBestellingPerLeverancier(cartItems) {
    const grouped = {};
    
    cartItems.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return;
        
        const levId = product.leverancierId;
        if (!grouped[levId]) {
            grouped[levId] = {
                leverancier: getLeverancierForProduct(product),
                items: [],
                totaalInkoop: 0,
                totaalVerkoop: 0
            };
        }
        
        const inkoopTotaal = product.inkoopprijs * item.quantity;
        const verkoopTotaal = product.price * item.quantity;
        
        grouped[levId].items.push({
            product: product,
            quantity: item.quantity,
            inkoopTotaal: inkoopTotaal,
            verkoopTotaal: verkoopTotaal
        });
        
        grouped[levId].totaalInkoop += inkoopTotaal;
        grouped[levId].totaalVerkoop += verkoopTotaal;
    });
    
    return grouped;
}

// Genereer leveranciers bestelling (voor admin)
function genereerLeveranciersOrder(leverancierGroep) {
    const lev = leverancierGroep.leverancier;
    const items = leverancierGroep.items;
    
    let orderText = `=== BESTELLING BIJ ${lev.name.toUpperCase()} ===\n`;
    orderText += `Bestel via: ${lev.orderEmail || lev.url}\n`;
    if (lev.orderPhone) orderText += `Telefoon: ${lev.orderPhone}\n`;
    orderText += `Min. bestelling: ${formatPrice(lev.minOrderValue)}\n`;
    orderText += `Levertijd: ${lev.deliveryDays} werkdagen\n\n`;
    orderText += `--- PRODUCTEN ---\n`;
    
    items.forEach(item => {
        orderText += `${item.quantity}x ${item.product.leverancierProductCode} - ${item.product.name}\n`;
        orderText += `   Inkoopprijs: ${formatPrice(item.product.inkoopprijs)} x ${item.quantity} = ${formatPrice(item.inkoopTotaal)}\n`;
    });
    
    orderText += `\n--- TOTALEN ---\n`;
    orderText += `Inkoop totaal: ${formatPrice(leverancierGroep.totaalInkoop)}\n`;
    orderText += `Verkoop totaal: ${formatPrice(leverancierGroep.totaalVerkoop)}\n`;
    orderText += `Bruto marge: ${formatPrice(leverancierGroep.totaalVerkoop - leverancierGroep.totaalInkoop)}\n`;
    
    return orderText;
}

// Bereken totale marge voor hele bestelling
function berekenTotaleMarge(cartItems) {
    let totaalInkoop = 0;
    let totaalVerkoop = 0;
    
    cartItems.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (product) {
            totaalInkoop += product.inkoopprijs * item.quantity;
            totaalVerkoop += product.price * item.quantity;
        }
    });
    
    const marge = totaalVerkoop - totaalInkoop;
    const verzendMarge = margeSettings.verzendkostenKlant - margeSettings.verzendkostenInkoop;
    
    return {
        inkoop: totaalInkoop,
        verkoop: totaalVerkoop,
        productMarge: marge,
        verzendMarge: totaalVerkoop >= margeSettings.gratisVerzendDrempel ? 0 : verzendMarge,
        totaleMarge: marge + (totaalVerkoop >= margeSettings.gratisVerzendDrempel ? 0 : verzendMarge),
        margePercentage: ((marge / totaalInkoop) * 100).toFixed(1)
    };
}

// Check of bestelling minimum haalt per leverancier
function checkMinimumBestellingen(cartItems) {
    const grouped = groepeerBestellingPerLeverancier(cartItems);
    const warnings = [];
    
    Object.values(grouped).forEach(group => {
        if (group.totaalInkoop < group.leverancier.minOrderValue) {
            warnings.push({
                leverancier: group.leverancier.name,
                huidig: group.totaalInkoop,
                minimum: group.leverancier.minOrderValue,
                tekort: group.leverancier.minOrderValue - group.totaalInkoop
            });
        }
    });
    
    return warnings;
}
