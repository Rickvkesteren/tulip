// ========================================
// Bollenstreek Direct - Shopping Cart
// ========================================

class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.init();
    }

    init() {
        this.updateCartUI();
    }

    // Laad winkelwagen uit localStorage
    loadCart() {
        const saved = localStorage.getItem('bollenstreekCart');
        return saved ? JSON.parse(saved) : [];
    }

    // Sla winkelwagen op in localStorage
    saveCart() {
        localStorage.setItem('bollenstreekCart', JSON.stringify(this.items));
    }

    // Voeg product toe aan winkelwagen
    addItem(productId, quantity = 1) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.items.find(item => item.productId === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                productId: productId,
                quantity: quantity
            });
        }

        this.saveCart();
        this.updateCartUI();
        this.showNotification(`${product.name} toegevoegd aan winkelwagen`);
    }

    // Verwijder product uit winkelwagen
    removeItem(productId) {
        this.items = this.items.filter(item => item.productId !== productId);
        this.saveCart();
        this.updateCartUI();
    }

    // Update hoeveelheid
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.productId === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartUI();
            }
        }
    }

    // Bereken totaal
    getTotal() {
        return this.items.reduce((total, item) => {
            const product = products.find(p => p.id === item.productId);
            return total + (product ? product.price * item.quantity : 0);
        }, 0);
    }

    // Bereken verzendkosten
    getShippingCost() {
        const subtotal = this.getTotal();
        if (subtotal >= margeSettings.gratisVerzendDrempel) {
            return 0;
        }
        return margeSettings.verzendkostenKlant;
    }

    // Bereken totaal met verzending
    getTotalWithShipping() {
        return this.getTotal() + this.getShippingCost();
    }

    // Bereken hoeveel nog nodig voor gratis verzending
    getAmountForFreeShipping() {
        const subtotal = this.getTotal();
        if (subtotal >= margeSettings.gratisVerzendDrempel) {
            return 0;
        }
        return margeSettings.gratisVerzendDrempel - subtotal;
    }

    // Aantal items in winkelwagen
    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    // Update winkelwagen UI
    updateCartUI() {
        // Update cart count
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = this.getItemCount();
        }

        // Update cart items
        const cartItems = document.getElementById('cartItems');
        if (cartItems) {
            if (this.items.length === 0) {
                cartItems.innerHTML = `
                    <div class="cart-empty">
                        <div class="cart-empty-icon">🛒</div>
                        <p>Uw winkelwagen is leeg</p>
                    </div>
                `;
            } else {
                cartItems.innerHTML = this.items.map(item => {
                    const product = products.find(p => p.id === item.productId);
                    const kweker = getKwekerForProduct(product);
                    return `
                        <div class="cart-item">
                            <div class="cart-item-image">${product.icon}</div>
                            <div class="cart-item-details">
                                <div class="cart-item-name">${product.name}</div>
                                <div class="cart-item-kweker">📍 ${kweker.name}, ${kweker.location}</div>
                                <div class="cart-item-footer">
                                    <div class="cart-item-quantity">
                                        <button class="quantity-btn" onclick="cart.updateQuantity(${product.id}, ${item.quantity - 1})">-</button>
                                        <span>${item.quantity}</span>
                                        <button class="quantity-btn" onclick="cart.updateQuantity(${product.id}, ${item.quantity + 1})">+</button>
                                    </div>
                                    <div class="cart-item-price">${formatPrice(product.price * item.quantity)}</div>
                                </div>
                            </div>
                            <button class="cart-item-remove" onclick="cart.removeItem(${product.id})">🗑️</button>
                        </div>
                    `;
                }).join('');
            }
        }

        // Update cart total
        const cartTotal = document.getElementById('cartTotal');
        if (cartTotal) {
            cartTotal.textContent = formatPrice(this.getTotal());
        }

        // Update shipping info
        const shippingInfo = document.getElementById('shippingInfo');
        if (shippingInfo && this.items.length > 0) {
            const shipping = this.getShippingCost();
            const freeShippingNeeded = this.getAmountForFreeShipping();
            
            if (shipping === 0) {
                shippingInfo.innerHTML = `
                    <div class="shipping-free">✅ Gratis verzending!</div>
                `;
            } else {
                shippingInfo.innerHTML = `
                    <div class="shipping-cost">
                        <span>Verzendkosten:</span>
                        <span>${formatPrice(shipping)}</span>
                    </div>
                    <div class="shipping-progress">
                        <div class="shipping-progress-bar" style="width: ${Math.min(100, (this.getTotal() / margeSettings.gratisVerzendDrempel) * 100)}%"></div>
                    </div>
                    <div class="shipping-hint">
                        Nog ${formatPrice(freeShippingNeeded)} voor gratis verzending!
                    </div>
                `;
            }
        }

        // Update final total with shipping
        const cartTotalFinal = document.getElementById('cartTotalFinal');
        if (cartTotalFinal && this.items.length > 0) {
            cartTotalFinal.textContent = formatPrice(this.getTotalWithShipping());
        }
    }

    // Toon notificatie
    showNotification(message) {
        // Verwijder bestaande notificatie
        const existing = document.querySelector('.cart-notification');
        if (existing) existing.remove();

        // Maak nieuwe notificatie
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <span>✓ ${message}</span>
        `;
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #27ae60;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 3000;
            animation: slideIn 0.3s ease;
        `;

        // Voeg animatie toe aan document
        if (!document.getElementById('notificationStyles')) {
            const style = document.createElement('style');
            style.id = 'notificationStyles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Verwijder na 3 seconden
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Leeg winkelwagen
    clear() {
        this.items = [];
        this.saveCart();
        this.updateCartUI();
    }
}

// Initialiseer winkelwagen
const cart = new ShoppingCart();
