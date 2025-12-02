// ========================================
// Bollenstreek Direct - Shop Page JavaScript
// ========================================

let currentView = 'grid';
let currentSort = 'popular';

document.addEventListener('DOMContentLoaded', function() {
    initFilters();
    loadProducts();
    checkURLParams();
    updateResultsCount();
});

// Initialiseer filters
function initFilters() {
    // Categorie filters
    const categoryFilters = document.getElementById('categoryFilters');
    if (categoryFilters) {
        categoryFilters.innerHTML = categories.map(cat => `
            <div class="filter-option">
                <input type="checkbox" id="cat-${cat.id}" onchange="handleCategoryChange('${cat.id}')">
                <label for="cat-${cat.id}">${cat.icon} ${cat.name}</label>
            </div>
        `).join('');
    }

    // Kweker filters
    const kwekerFilters = document.getElementById('kwekerFilters');
    if (kwekerFilters) {
        kwekerFilters.innerHTML = kwekers.map(kweker => `
            <div class="filter-option">
                <input type="checkbox" id="kweker-${kweker.id}" onchange="filterProducts()">
                <label for="kweker-${kweker.id}">
                    <span class="kweker-dot" style="background: ${kweker.color}"></span>
                    ${kweker.name}
                </label>
            </div>
        `).join('');
    }

    // Locatie filters
    const locationFilters = document.getElementById('locationFilters');
    if (locationFilters) {
        const uniqueLocations = [...new Set(kwekers.map(k => k.location))];
        locationFilters.innerHTML = uniqueLocations.map(loc => `
            <div class="filter-option">
                <input type="checkbox" id="loc-${loc.toLowerCase().replace(/\s/g, '-')}" onchange="filterProducts()">
                <label for="loc-${loc.toLowerCase().replace(/\s/g, '-')}">📍 ${loc}</label>
            </div>
        `).join('');
    }
}

// Laad producten
function loadProducts(filteredProducts = null) {
    const container = document.getElementById('shopProducts');
    if (!container) return;

    let productsToShow = filteredProducts || products;
    
    // Sorteer producten
    productsToShow = sortProductsArray(productsToShow);

    // Update view class
    container.className = `shop-products ${currentView === 'list' ? 'list-view' : ''}`;

    if (productsToShow.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <h3>Geen producten gevonden</h3>
                <p>Probeer andere filters of bekijk al onze producten.</p>
                <button class="btn btn-primary" onclick="resetFilters()">Reset Filters</button>
            </div>
        `;
        updateResultsCount(0);
        return;
    }

    container.innerHTML = productsToShow.map((product, index) => {
        const kweker = getKwekerForProduct(product);
        const isFavorite = typeof favoritesManager !== 'undefined' && favoritesManager.isFavorite(product.id);
        
        return `
            <div class="product-card fade-in" style="animation-delay: ${index * 0.05}s">
                <div class="product-image" onclick="openProductModal(${product.id})" style="background: linear-gradient(135deg, ${kweker.color}22 0%, ${kweker.color}44 100%)">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                    <button class="product-favorite ${isFavorite ? 'active' : ''}" 
                            onclick="event.stopPropagation(); toggleProductFavorite(${product.id}, this)"
                            title="${isFavorite ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}">
                        ${isFavorite ? '❤️' : '🤍'}
                    </button>
                    <span class="product-icon">${product.icon}</span>
                    <div class="product-quick-view">👁️ Bekijk details</div>
                </div>
                <div class="product-info">
                    <div class="product-kweker">
                        <span class="kweker-dot" style="background: ${kweker.color}"></span>
                        ${kweker.name}, ${kweker.location}
                    </div>
                    <h3 class="product-name" onclick="openProductModal(${product.id})">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-meta">
                        <span class="meta-item">🌱 ${product.plantTime}</span>
                        <span class="meta-item">🌸 ${product.bloeiTime}</span>
                    </div>
                    <div class="product-footer">
                        <div class="product-price">
                            ${formatPrice(product.price)} <span style="font-size: 0.8rem; font-weight: normal;">/ ${product.unit}</span>
                        </div>
                        <button class="add-to-cart" onclick="addToCartWithToast(${product.id})">
                            🛒
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    updateResultsCount(productsToShow.length);
}

// Toggle favoriet
function toggleProductFavorite(productId, button) {
    if (typeof favoritesManager !== 'undefined') {
        const isFav = favoritesManager.toggleFavorite(productId);
        button.innerHTML = isFav ? '❤️' : '🤍';
        button.classList.toggle('active', isFav);
        button.title = isFav ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten';
    }
}

// Voeg toe aan cart met toast
function addToCartWithToast(productId) {
    cart.addItem(productId);
    const product = products.find(p => p.id === productId);
    if (product && typeof showToast === 'function') {
        showToast(`${product.name} toegevoegd aan winkelwagen`, 'success');
    }
}

// Sorteer producten array
function sortProductsArray(productsArr) {
    const sorted = [...productsArr];
    switch (currentSort) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'popular':
        default:
            // Sorteer op badge (bestseller eerst) dan op id
            return sorted.sort((a, b) => {
                if (a.badge === 'Bestseller' && b.badge !== 'Bestseller') return -1;
                if (b.badge === 'Bestseller' && a.badge !== 'Bestseller') return 1;
                return a.id - b.id;
            });
    }
}

// Sorteer producten
function sortProducts() {
    const select = document.getElementById('sortSelect');
    if (select) {
        currentSort = select.value;
        filterProducts();
    }
}

// Set weergave
function setView(view) {
    currentView = view;
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });
    filterProducts();
}

// Update resultaten teller
function updateResultsCount(count = null) {
    const counter = document.getElementById('resultsCount');
    if (counter) {
        const num = count !== null ? count : products.length;
        counter.textContent = `${num} product${num !== 1 ? 'en' : ''}`;
    }
}

// Handle categorie verandering
function handleCategoryChange(categoryId) {
    const allCheckbox = document.getElementById('cat-all');
    const categoryCheckbox = document.getElementById(`cat-${categoryId}`);
    
    if (categoryCheckbox.checked) {
        allCheckbox.checked = false;
    }
    
    // Check of er nog categorieën geselecteerd zijn
    const anySelected = categories.some(cat => 
        document.getElementById(`cat-${cat.id}`)?.checked
    );
    
    if (!anySelected) {
        allCheckbox.checked = true;
    }
    
    filterProducts();
}

// Filter producten
function filterProducts() {
    let filtered = [...products];

    // Categorie filter
    const allCategoriesChecked = document.getElementById('cat-all')?.checked;
    if (!allCategoriesChecked) {
        const selectedCategories = categories
            .filter(cat => document.getElementById(`cat-${cat.id}`)?.checked)
            .map(cat => cat.id);
        
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(p => selectedCategories.includes(p.category));
        }
    }

    // Kweker filter
    const selectedKwekers = kwekers
        .filter(k => document.getElementById(`kweker-${k.id}`)?.checked)
        .map(k => k.id);
    
    if (selectedKwekers.length > 0) {
        filtered = filtered.filter(p => selectedKwekers.includes(p.kwekerId));
    }

    // Locatie filter
    const uniqueLocations = [...new Set(kwekers.map(k => k.location))];
    const selectedLocations = uniqueLocations
        .filter(loc => document.getElementById(`loc-${loc.toLowerCase().replace(/\s/g, '-')}`)?.checked);
    
    if (selectedLocations.length > 0) {
        const kwekerIdsInLocations = kwekers
            .filter(k => selectedLocations.includes(k.location))
            .map(k => k.id);
        filtered = filtered.filter(p => kwekerIdsInLocations.includes(p.kwekerId));
    }

    // Prijs filter
    const priceLow = document.getElementById('price-low')?.checked;
    const priceMid = document.getElementById('price-mid')?.checked;
    const priceHigh = document.getElementById('price-high')?.checked;

    if (priceLow) {
        filtered = filtered.filter(p => p.price < 10);
    } else if (priceMid) {
        filtered = filtered.filter(p => p.price >= 10 && p.price <= 15);
    } else if (priceHigh) {
        filtered = filtered.filter(p => p.price > 15);
    }

    loadProducts(filtered);
}

// Reset filters
function resetFilters() {
    // Reset alle checkboxes
    document.querySelectorAll('.shop-filters input[type="checkbox"]').forEach(cb => {
        cb.checked = cb.id === 'cat-all';
    });
    
    document.querySelectorAll('.shop-filters input[type="radio"]').forEach(rb => {
        rb.checked = rb.id === 'price-all';
    });

    // Reset sort
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.value = 'popular';
        currentSort = 'popular';
    }

    loadProducts();
}

// Check URL parameters
function checkURLParams() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('cat');
    
    if (category) {
        document.getElementById('cat-all').checked = false;
        const catCheckbox = document.getElementById(`cat-${category}`);
        if (catCheckbox) {
            catCheckbox.checked = true;
            filterProducts();
        }
    }
}
