// ========================================
// Bollenstreek Direct - Favorites System
// ========================================

class FavoritesManager {
    constructor() {
        this.favorites = this.loadFavorites();
        this.init();
    }

    init() {
        this.updateFavoritesUI();
    }

    loadFavorites() {
        const saved = localStorage.getItem('bollenstreekFavorites');
        return saved ? JSON.parse(saved) : [];
    }

    saveFavorites() {
        localStorage.setItem('bollenstreekFavorites', JSON.stringify(this.favorites));
    }

    toggleFavorite(productId) {
        const index = this.favorites.indexOf(productId);
        const product = products.find(p => p.id === productId);
        
        if (index === -1) {
            this.favorites.push(productId);
            showToast(`${product.name} toegevoegd aan favorieten`, 'success');
        } else {
            this.favorites.splice(index, 1);
            showToast(`${product.name} verwijderd uit favorieten`, 'info');
        }

        this.saveFavorites();
        this.updateFavoritesUI();
        
        // Update heart icons on page
        document.querySelectorAll(`[data-favorite="${productId}"]`).forEach(btn => {
            btn.classList.toggle('active', this.favorites.includes(productId));
            btn.innerHTML = this.favorites.includes(productId) ? '❤️' : '🤍';
        });
    }

    isFavorite(productId) {
        return this.favorites.includes(productId);
    }

    getFavorites() {
        return this.favorites.map(id => products.find(p => p.id === id)).filter(Boolean);
    }

    updateFavoritesUI() {
        const favCount = document.getElementById('favCount');
        if (favCount) {
            favCount.textContent = this.favorites.length;
        }
    }
}

// Global toast notification function
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠'
    };

    toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    // Animate in
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize favorites
const favorites = new FavoritesManager();

// Favorites sidebar toggle
document.addEventListener('DOMContentLoaded', function() {
    const favBtn = document.getElementById('favBtn');
    if (favBtn) {
        favBtn.addEventListener('click', () => {
            showFavoritesModal();
        });
    }
});

function showFavoritesModal() {
    const favProducts = favorites.getFavorites();
    
    let content = `
        <div class="favorites-modal-content">
            <h2>❤️ Mijn Favorieten</h2>
    `;

    if (favProducts.length === 0) {
        content += `
            <div class="favorites-empty">
                <div style="font-size: 4rem; margin-bottom: 20px;">💔</div>
                <p>Je hebt nog geen favorieten</p>
                <a href="shop.html" class="btn btn-primary">Bekijk Producten</a>
            </div>
        `;
    } else {
        content += `<div class="favorites-grid">`;
        favProducts.forEach(product => {
            const kweker = getKwekerForProduct(product);
            content += `
                <div class="favorite-item">
                    <div class="favorite-icon">${product.icon}</div>
                    <div class="favorite-details">
                        <h4>${product.name}</h4>
                        <p>${kweker.name}</p>
                        <div class="favorite-price">${formatPrice(product.price)}</div>
                    </div>
                    <div class="favorite-actions">
                        <button class="btn-small" onclick="cart.addItem(${product.id}); closeProductModal();">🛒</button>
                        <button class="btn-small btn-outline" onclick="favorites.toggleFavorite(${product.id}); showFavoritesModal();">🗑️</button>
                    </div>
                </div>
            `;
        });
        content += `</div>`;
        content += `
            <div class="favorites-footer">
                <button class="btn btn-primary" onclick="addAllFavoritesToCart()">
                    🛒 Alles Toevoegen aan Winkelwagen
                </button>
            </div>
        `;
    }

    content += `</div>`;
    
    document.getElementById('modalBody').innerHTML = content;
    document.getElementById('productModal').classList.add('open');
}

function addAllFavoritesToCart() {
    const favProducts = favorites.getFavorites();
    favProducts.forEach(product => {
        cart.addItem(product.id);
    });
    closeProductModal();
    showToast(`${favProducts.length} producten toegevoegd aan winkelwagen`, 'success');
}
