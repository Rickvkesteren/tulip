// ========================================
// Bollenstreek Direct - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initCart();
    initFeaturedProducts();
    initNewsletter();
    initAnimations();
    initKwekerPreview();
    initScrollToTop();
    initRevealAnimations();
});

// Initialiseer winkelwagen sidebar
function initCart() {
    const cartBtn = document.getElementById('cartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartClose = document.getElementById('cartClose');
    const cartOverlay = document.getElementById('cartOverlay');

    if (cartBtn && cartSidebar) {
        cartBtn.addEventListener('click', () => {
            cartSidebar.classList.add('open');
            cartOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        });

        const closeCart = () => {
            cartSidebar.classList.remove('open');
            cartOverlay.classList.remove('open');
            document.body.style.overflow = '';
        };

        if (cartClose) cartClose.addEventListener('click', closeCart);
        if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
        
        // Close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && cartSidebar.classList.contains('open')) {
                closeCart();
            }
        });
    }
}

// Laad uitgelichte producten op homepage
function initFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    if (!featuredContainer) return;

    // Selecteer 4 populaire producten
    const featured = products.filter(p => p.badge).slice(0, 4);

    featuredContainer.innerHTML = featured.map((product, index) => {
        const kweker = getKwekerForProduct(product);
        return createProductCard(product, kweker, index);
    }).join('');
}

// Maak product card HTML met verbeterde features
function createProductCard(product, kweker, index = 0) {
    const isFav = typeof favoritesManager !== 'undefined' && favoritesManager.isFavorite(product.id);
    
    return `
        <div class="product-card fade-in" data-product-id="${product.id}" style="animation-delay: ${index * 0.1}s">
            <div class="product-image" style="background: linear-gradient(135deg, ${kweker.color}22 0%, ${kweker.color}44 100%)" onclick="openProductModal(${product.id})">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <button class="product-favorite ${isFav ? 'active' : ''}" data-favorite="${product.id}" onclick="event.stopPropagation(); toggleFav(${product.id}, this)">
                    ${isFav ? '❤️' : '🤍'}
                </button>
                <span class="product-icon">${product.icon}</span>
                <div class="product-quick-view">
                    <span>👁️ Snel bekijken</span>
                </div>
            </div>
            <div class="product-info">
                <div class="product-kweker">
                    <span class="kweker-dot" style="background: ${kweker.color}"></span>
                    ${kweker.name}, ${kweker.location}
                </div>
                <h3 class="product-name" onclick="openProductModal(${product.id})">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-meta">
                    <span class="meta-item" title="Plant tijd">🌱 ${product.plantTime.split(' - ')[0]}</span>
                    <span class="meta-item" title="Bloei tijd">🌸 ${product.bloeiTime.split(' - ')[0]}</span>
                </div>
                <div class="product-footer">
                    <div class="product-price">
                        ${formatPrice(product.price)} <span>/ ${product.unit}</span>
                    </div>
                    <button class="add-to-cart" onclick="addWithAnimation(${product.id}, this)">
                        🛒
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Toggle favorite with animation
function toggleFav(productId, button) {
    if (typeof favoritesManager !== 'undefined') {
        const isFav = favoritesManager.toggleFavorite(productId);
        button.innerHTML = isFav ? '❤️' : '🤍';
        button.classList.toggle('active', isFav);
        button.classList.add('adding');
        setTimeout(() => button.classList.remove('adding'), 400);
    }
}

// Add to cart with animation
function addWithAnimation(productId, button) {
    cart.addItem(productId);
    
    // Animate button
    button.innerHTML = '✓';
    button.style.background = 'var(--secondary-color)';
    
    // Animate cart icon
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.classList.add('adding');
        setTimeout(() => cartBtn.classList.remove('adding'), 300);
    }
    
    // Reset button after delay
    setTimeout(() => {
        button.innerHTML = '🛒';
        button.style.background = '';
    }, 1500);
    
    // Show toast
    const product = products.find(p => p.id === productId);
    if (product && typeof showToast === 'function') {
        showToast(`${product.name} toegevoegd aan winkelwagen`, 'success');
    }
}

// Newsletter formulier
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        
        if (typeof showToast === 'function') {
            showToast(`Bedankt! We sturen updates naar: ${email}`, 'success');
        } else {
            alert(`Bedankt! We sturen updates naar: ${email}`);
        }
        form.reset();
    });
}

// Scroll animaties
function initAnimations() {
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.product-card, .usp-item, .location-card, .kweker-card').forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });
}

// Scroll-to-top button
function initScrollToTop() {
    // Create button if not exists
    let scrollBtn = document.querySelector('.scroll-indicator');
    if (!scrollBtn) {
        scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-indicator';
        scrollBtn.innerHTML = '↑';
        scrollBtn.setAttribute('aria-label', 'Scroll naar boven');
        document.body.appendChild(scrollBtn);
    }
    
    // Toggle visibility
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Reveal animations on scroll
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });
    
    revealElements.forEach(el => revealObserver.observe(el));
}

// Dynamic kweker preview on homepage
function initKwekerPreview() {
    const preview = document.querySelector('.kweker-card-preview');
    if (!preview) return;

    let currentIndex = 0;
    
    function updatePreview() {
        const kweker = kwekers[currentIndex];
        preview.innerHTML = `
            <div class="kweker-avatar">${kweker.avatar}</div>
            <h4>${kweker.name.split(' - ')[0]}</h4>
            <p>${kweker.location} - Sinds ${kweker.since}</p>
            <span class="specialty">${kweker.specialties[0]} Specialist</span>
        `;
        preview.style.animation = 'fadeInUp 0.5s ease';
        
        currentIndex = (currentIndex + 1) % kwekers.length;
    }

    // Change every 4 seconds
    setInterval(updatePreview, 4000);
}

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close modal with Escape
    if (e.key === 'Escape') {
        if (typeof closeProductModal === 'function') {
            closeProductModal();
        }
        // Close favorites modal if open
        const favModal = document.querySelector('.favorites-modal');
        if (favModal) {
            favModal.remove();
        }
    }
});
