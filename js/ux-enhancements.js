// ========================================
// Bollenstreek Direct - UX Enhancements
// Reviews, Wishlist, Quick View, Chat, Newsletter
// ========================================

// ========================================
// REVIEWS SYSTEM
// ========================================
const reviewsData = {
    1: [ // Product ID 1
        {
            id: 1,
            author: "Maria van den Berg",
            avatar: "M",
            rating: 5,
            date: "2024-11-15",
            verified: true,
            content: "Prachtige tulpen! Ze bloeiden precies zoals op de foto. De bollen waren groot en gezond. Zeker een aanrader!",
            images: [],
            helpful: 12
        },
        {
            id: 2,
            author: "Jan Bakker",
            avatar: "J",
            rating: 4,
            date: "2024-10-28",
            verified: true,
            content: "Goede kwaliteit bollen, snelle levering. Eén bol was wat kleiner dan de rest, maar verder prima.",
            images: [],
            helpful: 5
        },
        {
            id: 3,
            author: "Sophie de Vries",
            avatar: "S",
            rating: 5,
            date: "2024-10-20",
            verified: false,
            content: "Al 3 jaar klant en altijd tevreden. De tulpen van Fluwel zijn echt de mooiste!",
            images: [],
            helpful: 8
        }
    ],
    2: [
        {
            id: 4,
            author: "Peter Jansen",
            avatar: "P",
            rating: 5,
            date: "2024-11-10",
            verified: true,
            content: "De Apricot Beauty is werkelijk schitterend. Zachte abrikooskleur, precies zoals beschreven.",
            images: [],
            helpful: 15
        }
    ]
};

function getProductReviews(productId) {
    return reviewsData[productId] || [];
}

function calculateAverageRating(reviews) {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
}

function renderStars(rating, size = 'normal') {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    
    let stars = '★'.repeat(full);
    if (half) stars += '½';
    stars += '☆'.repeat(empty);
    
    return `<span class="stars ${size}">${stars}</span>`;
}

function renderReviewsSection(productId) {
    const reviews = getProductReviews(productId);
    const avgRating = calculateAverageRating(reviews);
    
    // Calculate rating distribution
    const distribution = [0, 0, 0, 0, 0];
    reviews.forEach(r => distribution[r.rating - 1]++);
    
    return `
        <div class="reviews-section">
            <div class="reviews-header">
                <div class="reviews-summary">
                    <div class="reviews-average">
                        <div class="big-number">${avgRating}</div>
                        ${renderStars(avgRating)}
                        <div style="color: var(--text-light); font-size: 0.9rem;">${reviews.length} beoordelingen</div>
                    </div>
                    <div class="reviews-bars">
                        ${[5,4,3,2,1].map(i => `
                            <div class="review-bar">
                                <span>${i}★</span>
                                <div class="review-bar-fill">
                                    <span style="width: ${reviews.length ? (distribution[i-1] / reviews.length * 100) : 0}%"></span>
                                </div>
                                <span>${distribution[i-1]}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <button class="btn-write-review" onclick="openReviewModal(${productId})">
                    ✍️ Schrijf een review
                </button>
            </div>
            
            <div class="reviews-list">
                ${reviews.map(review => `
                    <div class="review-card">
                        <div class="review-header">
                            <div class="review-author">
                                <div class="review-avatar">${review.avatar}</div>
                                <div class="review-meta">
                                    <h4>${review.author}</h4>
                                    <span>${formatDate(review.date)}</span>
                                </div>
                            </div>
                            <div>
                                ${renderStars(review.rating)}
                                ${review.verified ? '<span class="verified-badge">✓ Geverifieerde aankoop</span>' : ''}
                            </div>
                        </div>
                        <div class="review-content">
                            ${review.content}
                        </div>
                        ${review.images.length ? `
                            <div class="review-images">
                                ${review.images.map(img => `<img src="${img}" alt="Review foto">`).join('')}
                            </div>
                        ` : ''}
                        <div style="margin-top: 15px; font-size: 0.85rem; color: var(--text-light);">
                            <button onclick="markHelpful(${review.id})" style="background: none; border: none; cursor: pointer;">
                                👍 Nuttig (${review.helpful})
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ========================================
// WISHLIST SYSTEM
// ========================================
let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast('❤️ Verwijderd uit verlanglijst', 'info');
    } else {
        wishlist.push(productId);
        showToast('❤️ Toegevoegd aan verlanglijst!', 'success');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistButtons();
    updateWishlistCount();
}

function isInWishlist(productId) {
    return wishlist.includes(productId);
}

function updateWishlistButtons() {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        const productId = parseInt(btn.dataset.productId);
        if (isInWishlist(productId)) {
            btn.classList.add('active');
            btn.innerHTML = '❤️';
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '🤍';
        }
    });
}

function updateWishlistCount() {
    const countEl = document.getElementById('wishlistCount');
    if (countEl) {
        countEl.textContent = wishlist.length;
    }
}

function getWishlistProducts() {
    if (typeof products === 'undefined') return [];
    return products.filter(p => wishlist.includes(p.id));
}

// ========================================
// QUICK VIEW MODAL
// ========================================
let currentQuickViewProduct = null;

function openQuickView(productId) {
    if (typeof products === 'undefined') return;
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentQuickViewProduct = product;
    const kweker = typeof kwekers !== 'undefined' ? kwekers.find(k => k.id === product.kwekerId) : null;
    const reviews = getProductReviews(productId);
    const avgRating = calculateAverageRating(reviews);
    
    const modal = document.getElementById('quickViewModal');
    if (!modal) {
        createQuickViewModal();
    }
    
    document.getElementById('quickViewModal').innerHTML = `
        <div class="quick-view-content">
            <button class="quick-view-close" onclick="closeQuickView()">✕</button>
            <div class="quick-view-image">
                ${product.icon || '🌷'}
            </div>
            <div class="quick-view-details">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <h2>${product.name}</h2>
                <div class="quick-view-kweker">
                    ${kweker ? `<span>${kweker.avatar}</span> <span>${kweker.name}</span>` : ''}
                </div>
                <div class="product-rating">
                    ${renderStars(avgRating)}
                    <span class="rating-count">(${reviews.length} reviews)</span>
                </div>
                <div class="quick-view-price">
                    €${product.price.toFixed(2).replace('.', ',')}
                    <small>/ ${product.unit}</small>
                </div>
                <p style="color: var(--text-light); margin-bottom: 20px;">
                    ${product.description}
                </p>
                <div class="quick-view-info">
                    <div class="quick-view-info-item">
                        <label>🌱 Planttijd</label>
                        <span>${product.plantTime || 'Oktober - December'}</span>
                    </div>
                    <div class="quick-view-info-item">
                        <label>🌸 Bloeitijd</label>
                        <span>${product.bloeiTime || 'April - Mei'}</span>
                    </div>
                    <div class="quick-view-info-item">
                        <label>📏 Hoogte</label>
                        <span>${product.hoogte || '40-50 cm'}</span>
                    </div>
                    <div class="quick-view-info-item">
                        <label>📦 Voorraad</label>
                        <span style="color: ${product.inStock ? '#27ae60' : '#e74c3c'}">
                            ${product.inStock ? '✓ Op voorraad' : '✗ Uitverkocht'}
                        </span>
                    </div>
                </div>
                <div class="quick-view-qty">
                    <span>Aantal:</span>
                    <div class="qty-selector">
                        <button onclick="changeQty(-1)">−</button>
                        <input type="number" id="quickViewQty" value="1" min="1" max="99">
                        <button onclick="changeQty(1)">+</button>
                    </div>
                </div>
                <div class="quick-view-actions">
                    <button class="btn btn-primary" onclick="addToCartFromQuickView()">
                        🛒 In Winkelwagen
                    </button>
                    <button class="btn btn-secondary" onclick="toggleWishlist(${product.id}); updateQuickViewWishlist();">
                        ${isInWishlist(product.id) ? '❤️' : '🤍'}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('quickViewModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function createQuickViewModal() {
    const modal = document.createElement('div');
    modal.id = 'quickViewModal';
    modal.className = 'quick-view-modal';
    modal.onclick = function(e) {
        if (e.target === this) closeQuickView();
    };
    document.body.appendChild(modal);
}

function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function changeQty(delta) {
    const input = document.getElementById('quickViewQty');
    if (input) {
        const newVal = Math.max(1, parseInt(input.value) + delta);
        input.value = newVal;
    }
}

function addToCartFromQuickView() {
    if (!currentQuickViewProduct) return;
    
    const qty = parseInt(document.getElementById('quickViewQty').value) || 1;
    
    if (typeof addToCart === 'function') {
        for (let i = 0; i < qty; i++) {
            addToCart(currentQuickViewProduct.id);
        }
    }
    
    showToast(`🛒 ${qty}x ${currentQuickViewProduct.name} toegevoegd!`, 'success');
    closeQuickView();
}

// ========================================
// LOYALTY POINTS SYSTEM
// ========================================
let loyaltyPoints = parseInt(localStorage.getItem('loyaltyPoints') || '0');
let loyaltyTier = localStorage.getItem('loyaltyTier') || 'bronze';

const loyaltyTiers = {
    bronze: { name: 'Bronze', min: 0, discount: 0, icon: '🥉' },
    silver: { name: 'Silver', min: 500, discount: 5, icon: '🥈' },
    gold: { name: 'Gold', min: 1500, discount: 10, icon: '🥇' },
    platinum: { name: 'Platinum', min: 5000, discount: 15, icon: '💎' }
};

function addLoyaltyPoints(amount) {
    // 1 punt per euro besteed
    const pointsEarned = Math.floor(amount);
    loyaltyPoints += pointsEarned;
    localStorage.setItem('loyaltyPoints', loyaltyPoints);
    
    // Check tier upgrade
    updateLoyaltyTier();
    
    return pointsEarned;
}

function updateLoyaltyTier() {
    let newTier = 'bronze';
    
    if (loyaltyPoints >= loyaltyTiers.platinum.min) {
        newTier = 'platinum';
    } else if (loyaltyPoints >= loyaltyTiers.gold.min) {
        newTier = 'gold';
    } else if (loyaltyPoints >= loyaltyTiers.silver.min) {
        newTier = 'silver';
    }
    
    if (newTier !== loyaltyTier) {
        loyaltyTier = newTier;
        localStorage.setItem('loyaltyTier', loyaltyTier);
        showToast(`🎉 Gefeliciteerd! Je bent nu ${loyaltyTiers[newTier].name} lid!`, 'success');
    }
}

function getLoyaltyDiscount() {
    return loyaltyTiers[loyaltyTier].discount;
}

function getNextTierProgress() {
    const tiers = Object.entries(loyaltyTiers);
    const currentIndex = tiers.findIndex(([key]) => key === loyaltyTier);
    
    if (currentIndex >= tiers.length - 1) {
        return { progress: 100, pointsNeeded: 0, nextTier: null };
    }
    
    const currentMin = tiers[currentIndex][1].min;
    const nextMin = tiers[currentIndex + 1][1].min;
    const progress = ((loyaltyPoints - currentMin) / (nextMin - currentMin)) * 100;
    
    return {
        progress: Math.min(100, progress),
        pointsNeeded: nextMin - loyaltyPoints,
        nextTier: tiers[currentIndex + 1][0]
    };
}

function renderLoyaltyBanner() {
    const tier = loyaltyTiers[loyaltyTier];
    const progress = getNextTierProgress();
    
    return `
        <div class="loyalty-banner">
            <div class="loyalty-info">
                <div class="loyalty-icon">${tier.icon}</div>
                <div>
                    <h3>Bollenstreek Rewards</h3>
                    <span class="loyalty-tier-badge ${loyaltyTier}">${tier.icon} ${tier.name}</span>
                    ${tier.discount > 0 ? `<span style="margin-left: 10px;">${tier.discount}% korting op alles!</span>` : ''}
                </div>
            </div>
            <div class="loyalty-points">
                <div class="points">${loyaltyPoints}</div>
                <div>punten</div>
                ${progress.nextTier ? `
                    <div class="loyalty-progress" style="width: 150px; margin-top: 10px;">
                        <div class="loyalty-progress-bar">
                            <div class="loyalty-progress-fill" style="width: ${progress.progress}%"></div>
                        </div>
                        <small style="opacity: 0.8;">Nog ${progress.pointsNeeded} voor ${loyaltyTiers[progress.nextTier].name}</small>
                    </div>
                ` : '<small style="opacity: 0.8;">Hoogste niveau bereikt!</small>'}
            </div>
        </div>
    `;
}

// ========================================
// LIVE CHAT WIDGET
// ========================================
let chatMessages = [];
let chatOpen = false;

const chatResponses = {
    greeting: "Hallo! 👋 Welkom bij Bollenstreek Direct. Hoe kan ik je helpen?",
    verzending: "We verzenden binnen 2-3 werkdagen binnen Nederland. Gratis verzending vanaf €50! 🚚",
    betalen: "We accepteren iDEAL, creditcard, PayPal, Klarna en meer via Mollie. 💳",
    retour: "Je kunt binnen 14 dagen retourneren. Neem contact op via info@bollenstreekdirect.nl 📧",
    planten: "De beste planttijd is oktober-december. Plant de bollen 2-3x hun hoogte diep. 🌱",
    default: "Bedankt voor je bericht! Een medewerker neemt zo snel mogelijk contact op. 📬"
};

function initChat() {
    const chatWidget = document.createElement('div');
    chatWidget.className = 'chat-widget';
    chatWidget.innerHTML = `
        <button class="chat-toggle" onclick="toggleChat()">
            💬
            <span class="badge" style="display: none;">1</span>
        </button>
        <div class="chat-window" id="chatWindow">
            <div class="chat-header">
                <div class="chat-avatar">🌷</div>
                <div>
                    <strong>Bollenstreek Support</strong>
                    <div class="chat-status">Online</div>
                </div>
            </div>
            <div class="chat-messages" id="chatMessages"></div>
            <div class="chat-quick-replies">
                <button class="chat-quick-reply" onclick="sendQuickReply('verzending')">📦 Verzending</button>
                <button class="chat-quick-reply" onclick="sendQuickReply('betalen')">💳 Betalen</button>
                <button class="chat-quick-reply" onclick="sendQuickReply('planten')">🌱 Planttips</button>
                <button class="chat-quick-reply" onclick="sendQuickReply('retour')">↩️ Retour</button>
            </div>
            <div class="chat-input">
                <input type="text" id="chatInput" placeholder="Typ je bericht..." onkeypress="handleChatKeypress(event)">
                <button onclick="sendChatMessage()">➤</button>
            </div>
        </div>
    `;
    document.body.appendChild(chatWidget);
    
    // Add greeting after delay
    setTimeout(() => {
        addBotMessage(chatResponses.greeting);
    }, 1000);
}

function toggleChat() {
    chatOpen = !chatOpen;
    document.getElementById('chatWindow').classList.toggle('active', chatOpen);
    
    if (chatOpen) {
        document.querySelector('.chat-toggle .badge').style.display = 'none';
    }
}

function addBotMessage(text) {
    chatMessages.push({ type: 'bot', text, time: new Date() });
    renderChatMessages();
}

function addUserMessage(text) {
    chatMessages.push({ type: 'user', text, time: new Date() });
    renderChatMessages();
}

function renderChatMessages() {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    
    container.innerHTML = chatMessages.map(msg => `
        <div class="chat-message ${msg.type}">
            <div class="chat-bubble">${msg.text}</div>
            <div class="chat-time">${msg.time.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
    `).join('');
    
    container.scrollTop = container.scrollHeight;
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    
    if (!text) return;
    
    addUserMessage(text);
    input.value = '';
    
    // Simple keyword matching for auto-response
    setTimeout(() => {
        const lowerText = text.toLowerCase();
        let response = chatResponses.default;
        
        if (lowerText.includes('verzend') || lowerText.includes('lever')) {
            response = chatResponses.verzending;
        } else if (lowerText.includes('betal') || lowerText.includes('ideal') || lowerText.includes('prijs')) {
            response = chatResponses.betalen;
        } else if (lowerText.includes('retour') || lowerText.includes('terug')) {
            response = chatResponses.retour;
        } else if (lowerText.includes('plant') || lowerText.includes('tuin') || lowerText.includes('grond')) {
            response = chatResponses.planten;
        }
        
        addBotMessage(response);
    }, 800);
}

function sendQuickReply(topic) {
    addUserMessage(topic.charAt(0).toUpperCase() + topic.slice(1) + '?');
    setTimeout(() => {
        addBotMessage(chatResponses[topic] || chatResponses.default);
    }, 500);
}

function handleChatKeypress(e) {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
}

// ========================================
// NEWSLETTER POPUP
// ========================================
let newsletterShown = localStorage.getItem('newsletterShown') === 'true';

function showNewsletterPopup() {
    if (newsletterShown) return;
    
    const popup = document.createElement('div');
    popup.className = 'newsletter-popup active';
    popup.id = 'newsletterPopup';
    popup.innerHTML = `
        <div class="newsletter-content">
            <button class="newsletter-close" onclick="closeNewsletter()">✕</button>
            <div class="newsletter-image">🌷</div>
            <div class="newsletter-body">
                <h2>Ontvang 10% korting!</h2>
                <p>Schrijf je in voor onze nieuwsbrief en ontvang exclusieve aanbiedingen, planttips en 10% korting op je eerste bestelling.</p>
                <div class="newsletter-discount">🎁 Code: WELKOM10</div>
                <form class="newsletter-form" onsubmit="submitNewsletter(event)">
                    <input type="email" id="newsletterEmail" placeholder="Je e-mailadres" required>
                    <button type="submit">Aanmelden</button>
                </form>
                <p class="newsletter-privacy">🔒 We respecteren je privacy. Je kunt je altijd uitschrijven.</p>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
    document.body.style.overflow = 'hidden';
}

function closeNewsletter() {
    const popup = document.getElementById('newsletterPopup');
    if (popup) {
        popup.remove();
        document.body.style.overflow = '';
        localStorage.setItem('newsletterShown', 'true');
        newsletterShown = true;
    }
}

function submitNewsletter(e) {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value;
    
    // In production: POST to email service
    console.log('Newsletter signup:', email);
    
    showToast('🎉 Bedankt! Check je inbox voor je kortingscode.', 'success');
    closeNewsletter();
}

// Exit intent detection
function initExitIntent() {
    if (newsletterShown) return;
    
    document.addEventListener('mouseout', function(e) {
        if (e.clientY < 10 && !newsletterShown) {
            showNewsletterPopup();
        }
    });
}

// ========================================
// MOBILE MENU
// ========================================
function initMobileMenu() {
    const header = document.querySelector('.header-content');
    if (!header || document.querySelector('.mobile-menu-toggle')) return;
    
    // Add mobile toggle button
    const toggle = document.createElement('button');
    toggle.className = 'mobile-menu-toggle';
    toggle.onclick = toggleMobileMenu;
    toggle.innerHTML = '<span></span><span></span><span></span>';
    
    // Insert before header-actions
    const actions = header.querySelector('.header-actions');
    if (actions) {
        header.insertBefore(toggle, actions);
    }
    
    // Create mobile menu
    const menu = document.createElement('div');
    menu.className = 'mobile-menu';
    menu.id = 'mobileMenu';
    menu.innerHTML = `
        <a href="index.html" class="mobile-nav-link">🏠 Home</a>
        
        <div class="mobile-nav-link" onclick="toggleMobileSubmenu(this)">
            🛒 Shop <span class="arrow">▼</span>
        </div>
        <div class="mobile-submenu">
            <a href="shop.html?cat=tulpen">🌷 Tulpen</a>
            <a href="shop.html?cat=narcissen">🌼 Narcissen</a>
            <a href="shop.html?cat=hyacinten">💜 Hyacinten</a>
            <a href="shop.html?cat=krokussen">💛 Krokussen</a>
            <a href="shop.html?cat=allium">🟣 Allium</a>
            <a href="shop.html">Alle Producten</a>
        </div>
        
        <div class="mobile-nav-link" onclick="toggleMobileSubmenu(this)">
            🗺️ Ontdek <span class="arrow">▼</span>
        </div>
        <div class="mobile-submenu">
            <a href="bollenstreek.html">🗺️ Interactieve Kaart</a>
            <a href="kwekers.html">👨‍🌾 Onze Kwekers</a>
            <a href="experiences.html">🎟️ Experiences & Tickets</a>
            <a href="blog.html">📝 Blog & Tips</a>
        </div>
        
        <a href="contact.html" class="mobile-nav-link">📧 Contact</a>
        
        <div class="mobile-menu-footer">
            <div class="language-switcher">
                <button class="lang-btn" onclick="setLanguage('nl')">🇳🇱</button>
                <button class="lang-btn" onclick="setLanguage('en')">🇬🇧</button>
                <button class="lang-btn" onclick="setLanguage('de')">🇩🇪</button>
                <button class="lang-btn" onclick="setLanguage('fr')">🇫🇷</button>
                <button class="lang-btn" onclick="setLanguage('zh')">🇨🇳</button>
            </div>
        </div>
    `;
    document.body.appendChild(menu);
}

function toggleMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.getElementById('mobileMenu');
    
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
}

function toggleMobileSubmenu(el) {
    el.classList.toggle('expanded');
    const submenu = el.nextElementSibling;
    if (submenu && submenu.classList.contains('mobile-submenu')) {
        submenu.classList.toggle('active');
    }
}

// ========================================
// LOADING SKELETONS
// ========================================
function showLoadingSkeletons(container, count = 6) {
    container.innerHTML = Array(count).fill('').map(() => `
        <div class="skeleton-card">
            <div class="skeleton skeleton-image"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text short"></div>
            <div class="skeleton skeleton-price"></div>
        </div>
    `).join('');
}

// ========================================
// TOAST NOTIFICATIONS
// ========================================
function showToast(message, type = 'success') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = message;
    container.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ========================================
// INITIALIZE ALL FEATURES
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Init chat widget
    initChat();
    
    // Init mobile menu
    initMobileMenu();
    
    // Init exit intent for newsletter
    setTimeout(initExitIntent, 5000);
    
    // Update wishlist buttons
    updateWishlistButtons();
    updateWishlistCount();
    
    console.log('🚀 UX Enhancements loaded');
});

// Export functions for global use
window.toggleWishlist = toggleWishlist;
window.openQuickView = openQuickView;
window.closeQuickView = closeQuickView;
window.showToast = showToast;
window.renderLoyaltyBanner = renderLoyaltyBanner;
window.showNewsletterPopup = showNewsletterPopup;
window.closeNewsletter = closeNewsletter;
window.toggleMobileMenu = toggleMobileMenu;
window.toggleMobileSubmenu = toggleMobileSubmenu;
