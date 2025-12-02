// ========================================
// Bollenstreek Direct - Search System
// ========================================

class SearchManager {
    constructor() {
        this.init();
    }

    init() {
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        
        if (!searchInput) return;

        let debounceTimer;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 200);
        });

        searchInput.addEventListener('focus', () => {
            if (searchInput.value.length >= 2) {
                searchResults.classList.add('show');
            }
        });

        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-box')) {
                searchResults.classList.remove('show');
            }
        });

        // Handle keyboard navigation
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchResults.classList.remove('show');
                searchInput.blur();
            }
            if (e.key === 'Enter') {
                const firstResult = searchResults.querySelector('.search-result-item');
                if (firstResult) {
                    firstResult.click();
                }
            }
        });
    }

    performSearch(query) {
        const searchResults = document.getElementById('searchResults');
        
        if (query.length < 2) {
            searchResults.classList.remove('show');
            return;
        }

        const queryLower = query.toLowerCase();
        
        // Search in products
        const productResults = products.filter(p => 
            p.name.toLowerCase().includes(queryLower) ||
            p.description.toLowerCase().includes(queryLower) ||
            p.category.toLowerCase().includes(queryLower)
        ).slice(0, 5);

        // Search in kwekers
        const kwekerResults = kwekers.filter(k =>
            k.name.toLowerCase().includes(queryLower) ||
            k.location.toLowerCase().includes(queryLower) ||
            k.specialties.some(s => s.toLowerCase().includes(queryLower))
        ).slice(0, 3);

        // Search in categories
        const categoryResults = categories.filter(c =>
            c.name.toLowerCase().includes(queryLower)
        );

        this.renderResults(productResults, kwekerResults, categoryResults, query);
    }

    renderResults(productResults, kwekerResults, categoryResults, query) {
        const searchResults = document.getElementById('searchResults');
        
        if (productResults.length === 0 && kwekerResults.length === 0 && categoryResults.length === 0) {
            searchResults.innerHTML = `
                <div class="search-no-results">
                    <p>Geen resultaten voor "${query}"</p>
                    <small>Probeer een andere zoekterm</small>
                </div>
            `;
            searchResults.classList.add('show');
            return;
        }

        let html = '';

        // Categories
        if (categoryResults.length > 0) {
            html += `<div class="search-section"><div class="search-section-title">Categorieën</div>`;
            categoryResults.forEach(cat => {
                html += `
                    <a href="shop.html?cat=${cat.id}" class="search-result-item">
                        <span class="search-result-icon">${cat.icon}</span>
                        <div class="search-result-info">
                            <div class="search-result-name">${cat.name}</div>
                        </div>
                    </a>
                `;
            });
            html += `</div>`;
        }

        // Products
        if (productResults.length > 0) {
            html += `<div class="search-section"><div class="search-section-title">Producten</div>`;
            productResults.forEach(product => {
                const kweker = getKwekerForProduct(product);
                html += `
                    <div class="search-result-item" onclick="openProductModal(${product.id})">
                        <span class="search-result-icon">${product.icon}</span>
                        <div class="search-result-info">
                            <div class="search-result-name">${this.highlightMatch(product.name, query)}</div>
                            <div class="search-result-meta">${kweker.name} • ${formatPrice(product.price)}</div>
                        </div>
                        <button class="search-result-add" onclick="event.stopPropagation(); cart.addItem(${product.id})">🛒</button>
                    </div>
                `;
            });
            html += `</div>`;
        }

        // Kwekers
        if (kwekerResults.length > 0) {
            html += `<div class="search-section"><div class="search-section-title">Kwekers</div>`;
            kwekerResults.forEach(kweker => {
                html += `
                    <a href="kwekers.html#kweker-${kweker.id}" class="search-result-item">
                        <span class="search-result-icon">${kweker.avatar}</span>
                        <div class="search-result-info">
                            <div class="search-result-name">${this.highlightMatch(kweker.name, query)}</div>
                            <div class="search-result-meta">${kweker.location} • ${kweker.products} producten</div>
                        </div>
                    </a>
                `;
            });
            html += `</div>`;
        }

        // View all link
        html += `
            <a href="shop.html?search=${encodeURIComponent(query)}" class="search-view-all">
                Bekijk alle resultaten voor "${query}" →
            </a>
        `;

        searchResults.innerHTML = html;
        searchResults.classList.add('show');
    }

    highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
}

// Product Modal Functions
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const kweker = getKwekerForProduct(product);
    const leverancier = getLeverancierForProduct(product);
    const isFav = favorites.isFavorite(productId);
    
    // Get related products (same category)
    const related = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="product-detail">
            <div class="product-detail-image" style="background: linear-gradient(135deg, ${kweker.color}22 0%, ${kweker.color}44 100%)">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <span class="product-detail-icon">${product.icon}</span>
                <button class="favorite-btn ${isFav ? 'active' : ''}" data-favorite="${product.id}" onclick="favorites.toggleFavorite(${product.id})">
                    ${isFav ? '❤️' : '🤍'}
                </button>
            </div>
            <div class="product-detail-info">
                <div class="product-detail-kweker">
                    <span class="kweker-avatar">${kweker.avatar}</span>
                    <a href="kwekers.html#kweker-${kweker.id}">${kweker.name}</a>
                    <span class="kweker-rating">⭐ ${kweker.rating}</span>
                </div>
                <h1 class="product-detail-name">${product.name}</h1>
                <p class="product-detail-description">${product.description}</p>
                
                <div class="product-detail-specs">
                    <div class="spec-item">
                        <span class="spec-icon">🌱</span>
                        <div>
                            <strong>Plant tijd</strong>
                            <span>${product.plantTime}</span>
                        </div>
                    </div>
                    <div class="spec-item">
                        <span class="spec-icon">🌸</span>
                        <div>
                            <strong>Bloei tijd</strong>
                            <span>${product.bloeiTime}</span>
                        </div>
                    </div>
                    <div class="spec-item">
                        <span class="spec-icon">📏</span>
                        <div>
                            <strong>Hoogte</strong>
                            <span>${product.hoogte}</span>
                        </div>
                    </div>
                    <div class="spec-item">
                        <span class="spec-icon">📍</span>
                        <div>
                            <strong>Herkomst</strong>
                            <span>${kweker.location}</span>
                        </div>
                    </div>
                </div>

                <div class="product-detail-footer">
                    <div class="product-detail-price">
                        <span class="price-main">${formatPrice(product.price)}</span>
                        <span class="price-unit">/ ${product.unit}</span>
                    </div>
                    <div class="product-detail-actions">
                        <div class="quantity-selector">
                            <button onclick="updateModalQuantity(-1)">-</button>
                            <input type="number" id="modalQuantity" value="1" min="1" max="99">
                            <button onclick="updateModalQuantity(1)">+</button>
                        </div>
                        <button class="btn btn-primary btn-add-cart" onclick="addFromModal(${product.id})">
                            🛒 In Winkelwagen
                        </button>
                    </div>
                </div>

                ${product.inStock ? 
                    '<div class="stock-status in-stock">✓ Op voorraad - Verzending binnen 3 dagen</div>' : 
                    '<div class="stock-status out-of-stock">✕ Tijdelijk uitverkocht</div>'
                }
            </div>
        </div>
        
        ${related.length > 0 ? `
            <div class="product-related">
                <h3>Gerelateerde Producten</h3>
                <div class="related-grid">
                    ${related.map(p => {
                        const k = getKwekerForProduct(p);
                        return `
                            <div class="related-item" onclick="openProductModal(${p.id})">
                                <div class="related-icon">${p.icon}</div>
                                <div class="related-info">
                                    <div class="related-name">${p.name}</div>
                                    <div class="related-price">${formatPrice(p.price)}</div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        ` : ''}
    `;

    document.getElementById('productModal').classList.add('open');
    document.body.style.overflow = 'hidden';
    
    // Close search results
    const searchResults = document.getElementById('searchResults');
    if (searchResults) searchResults.classList.remove('show');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('open');
    document.body.style.overflow = '';
}

function updateModalQuantity(delta) {
    const input = document.getElementById('modalQuantity');
    const newVal = Math.max(1, Math.min(99, parseInt(input.value) + delta));
    input.value = newVal;
}

function addFromModal(productId) {
    const quantity = parseInt(document.getElementById('modalQuantity').value);
    cart.addItem(productId, quantity);
    closeProductModal();
}

// Initialize search
document.addEventListener('DOMContentLoaded', () => {
    new SearchManager();
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProductModal();
    }
});
