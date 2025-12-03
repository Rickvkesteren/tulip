// ========================================
// Bollenstreek Direct - Shop Page JavaScript
// ========================================

let currentView = 'grid';
let currentSort = 'popular';

// Product afbeeldingen database - GEVERIFIEERDE bloembollen foto's
const productImages = {
    tulpen: [
        'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=400&q=80',  // Rode tulpen
        'https://images.unsplash.com/photo-1589994160839-163cd867cfe8?w=400&q=80',  // Roze tulpen
        'https://images.unsplash.com/photo-1518882605630-8eb738e08289?w=400&q=80',  // Gele tulpen
        'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&q=80',  // Tulpenveld
        'https://images.unsplash.com/photo-1524386416438-98b9b2d4b433?w=400&q=80',  // Tulpen zonsondergang
        'https://images.unsplash.com/photo-1553530979-212c46e8afd5?w=400&q=80',  // Paarse tulpen
        'https://images.unsplash.com/photo-1522165078649-823cf4dbaf46?w=400&q=80'   // Witte tulpen
    ],
    narcissen: [
        'https://images.unsplash.com/photo-1456415333674-42b11b9f5b7b?w=400&q=80',  // Gele narcissen
        'https://images.unsplash.com/photo-1549751043-ccdb46f4a7e8?w=400&q=80',  // Witte narcissen
        'https://images.unsplash.com/photo-1582479459972-aa0a9a2cbbd1?w=400&q=80',  // Narcissen veld
        'https://images.unsplash.com/photo-1585007600263-71228e40c8d1?w=400&q=80'   // Daffodils close-up
    ],
    hyacinten: [
        'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=400&q=80',  // Paarse hyacinten
        'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&q=80',  // Roze hyacinten
        'https://images.unsplash.com/photo-1584479898061-15742e14f50d?w=400&q=80'   // Blauwe hyacinten
    ],
    krokussen: [
        'https://images.unsplash.com/photo-1457534979083-dbc249d0f5cc?w=400&q=80',  // Paarse krokussen
        'https://images.unsplash.com/photo-1551972251-12070d63502a?w=400&q=80',  // Gele krokussen
        'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=400&q=80'   // Witte krokussen
    ],
    allium: [
        'https://images.unsplash.com/photo-1464639351491-a172c2aa2911?w=400&q=80',  // Paarse allium
        'https://images.unsplash.com/photo-1530092285049-1c42085fd395?w=400&q=80',  // Allium giganteum
        'https://images.unsplash.com/photo-1559563458-527698bf5295?w=400&q=80'   // Allium close-up
    ],
    lelies: [
        'https://images.unsplash.com/photo-1533616688419-b7a585564566?w=400&q=80',  // Witte lelies
        'https://images.unsplash.com/photo-1567748157439-651aca2ff064?w=400&q=80',  // Roze lelies
        'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=400&q=80'   // Oranje lelies
    ],
    dahlia: [
        'https://images.unsplash.com/photo-1536238349444-c05ffb6837e4?w=400&q=80',  // Roze dahlia
        'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400&q=80',  // Rode dahlia
        'https://images.unsplash.com/photo-1501577316534-56c21cf11eb5?w=400&q=80'   // Oranje dahlia
    ],
    gladiolen: [
        'https://images.unsplash.com/photo-1567331711402-509c12c41959?w=400&q=80',  // Roze gladiolen
        'https://images.unsplash.com/photo-1502977249166-824b3a8a4d6d?w=400&q=80'   // Rode gladiolen
    ],
    default: [
        'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&q=80'   // Tulpenveld default
    ]
};

// Get product image based on product.image property or fallback to category
function getProductImage(product) {
    // Gebruik de product-specifieke afbeelding als die bestaat
    if (product.image) {
        return product.image;
    }
    // Fallback naar categorie-gebaseerde afbeelding
    const category = product.category.toLowerCase();
    const images = productImages[category] || productImages.default;
    const index = product.id % images.length;
    return images[index];
}

document.addEventListener('DOMContentLoaded', function() {
    initFilters();
    loadProducts();
    checkURLParams();
    updateResultsCount();
    
    // Reload products when language changes
    document.addEventListener('languageChanged', function() {
        loadProducts();
    });
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
                <h3>${typeof t === 'function' ? t('noProductsFound') : 'Geen producten gevonden'}</h3>
                <p>${typeof t === 'function' ? t('tryOtherFilters') : 'Probeer andere filters of bekijk al onze producten.'}</p>
                <button class="btn btn-primary" onclick="resetFilters()">${typeof t === 'function' ? t('resetFilters') : 'Reset Filters'}</button>
            </div>
        `;
        updateResultsCount(0);
        return;
    }

    container.innerHTML = productsToShow.map((product, index) => {
        const kweker = getKwekerForProduct(product);
        const isFavorite = typeof favoritesManager !== 'undefined' && favoritesManager.isFavorite(product.id);
        const productImage = getProductImage(product);
        const variant = (product.id % 5);
        const addToCartText = typeof t === 'function' ? t('order') : 'Bestel';
        const viewDetailsText = typeof t === 'function' ? t('viewDetails') : 'Bekijk details';
        const addFavText = typeof t === 'function' ? t('addToFavorites') : 'Voeg toe aan favorieten';
        const removeFavText = typeof t === 'function' ? t('removeFromFavorites') : 'Verwijder uit favorieten';
        
        return `
            <div class="product-card fade-in" style="animation-delay: ${index * 0.05}s">
                <div class="product-image has-image" 
                     data-category="${product.category}" 
                     data-variant="${variant}"
                     onclick="openProductModal(${product.id})" 
                     style="background-image: url('${productImage}'); background-size: cover; background-position: center;">
                    ${product.badge ? `<span class="product-badge ${product.badge === 'Uitverkoop' ? 'sale' : product.badge === 'Nieuw' ? 'new' : product.badge === 'Exclusief' ? 'exclusive' : ''}">${product.badge}</span>` : ''}
                    <button class="product-favorite ${isFavorite ? 'active' : ''}" 
                            onclick="event.stopPropagation(); toggleProductFavorite(${product.id}, this)"
                            title="${isFavorite ? removeFavText : addFavText}">
                        ${isFavorite ? '❤️' : '🤍'}
                    </button>
                    <div class="product-quick-view">👁️ ${viewDetailsText}</div>
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
                            <span class="price">${formatPrice(product.price)}</span>
                            <span style="font-size: 0.8rem; font-weight: normal; color: var(--text-light);">/ ${product.unit}</span>
                        </div>
                        <button class="add-to-cart btn btn-primary btn-small" onclick="addToCartWithToast(${product.id})">
                            🛒 ${addToCartText}
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
