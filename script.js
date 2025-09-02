// Product catalog data
const catalog = {
    "telegram": {
        "name": "Telegram",
        "price_rub": "от 250₽",
        "price_usd": "от 1.5 USD",
        "price_ton": "от 0.5 TON",
        "price_stars": "от 150⭐",
        "guarantee": "12 часов",
        "desc": "Аккаунт Telegram с любой страной (кроме РФ).",
        "icon": "fab fa-telegram"
    },
    "tiktok": {
        "name": "TikTok",
        "price_rub": "от 250₽",
        "price_usd": "от 1 USD",
        "price_ton": "от 0.35 TON",
        "price_stars": "от 100⭐",
        "guarantee": "24 часов",
        "desc": "Аккаунт TikTok с любым активом.",
        "icon": "fab fa-tiktok"
    },
    "discord": {
        "name": "Discord",
        "price_rub": "от 250₽",
        "price_usd": "от 1 USD",
        "price_ton": "от 0.35 TON",
        "price_stars": "от 100⭐",
        "guarantee": "12 часов",
        "desc": "Discord аккаунт с любыми параметрами.",
        "icon": "fab fa-discord"
    },
    "instagram": {
        "name": "Instagram",
        "price_rub": "от 250₽",
        "price_usd": "от 1 USD",
        "price_ton": "от 0.35 TON",
        "price_stars": "от 100⭐",
        "guarantee": "24 часа",
        "desc": "Аккаунт Instagram с любым активом.",
        "icon": "fab fa-instagram"
    },
    "roblox": {
        "name": "Roblox",
        "price_rub": "от 250₽",
        "price_usd": "от 1.5 USD",
        "price_ton": "от 0.5 TON",
        "price_stars": "от 150⭐",
        "guarantee": "12 часов",
        "desc": "Roblox с редкими предметами.",
        "icon": "fas fa-gamepad"
    },
    "supercell": {
        "name": "Supercell",
        "price_rub": "от 250₽",
        "price_usd": "от 1 USD",
        "price_ton": "от 0.35 TON",
        "price_stars": "от 100⭐",
        "guarantee": "24 часа",
        "desc": "Brawl Stars / Clash Royale / Clash of Clans.",
        "icon": "fas fa-mobile-alt"
    },
    "steam": {
        "name": "Steam / Epic Games",
        "price_rub": "от 250₽",
        "price_usd": "от 1 USD",
        "price_ton": "от 0.35 TON",
        "price_stars": "от 100⭐",
        "guarantee": "24 часа",
        "desc": "Аккаунт с популярными играми и другими параметрами.",
        "icon": "fab fa-steam"
    },
    "minecraft": {
        "name": "Minecraft",
        "price_rub": "от 250₽",
        "price_usd": "от 2 USD",
        "price_ton": "0.7 TON",
        "price_stars": "от 200⭐",
        "guarantee": "24 часа",
        "desc": "Minecraft аккаунт (очень дешево!).",
        "icon": "fas fa-cube"
    },
    "genshin": {
        "name": "Genshin Impact",
        "price_rub": "250₽",
        "price_usd": "от 1.5 USD",
        "price_ton": "0.5 TON",
        "price_stars": "от 150⭐",
        "guarantee": "24 часа",
        "desc": "Аккаунт Genshin Impact с любыми уровнями и персонажами.",
        "icon": "fas fa-magic"
    },
    "fortnite": {
        "name": "Fortnite / Valorant",
        "price_rub": "от 250₽",
        "price_usd": "от 1 USD",
        "price_ton": "от 0.35 TON",
        "price_stars": "от 100⭐",
        "guarantee": "24 часа",
        "desc": "Аккаунт Fortnite или Valorant с любыми предметами.",
        "icon": "fas fa-crosshairs"
    },
    "wot": {
        "name": "World of Tanks / World of Tanks",
        "price_rub": "от 250₽",
        "price_usd": "от 1 USD",
        "price_ton": "от 0.35 TON",
        "price_stars": "от 100⭐",
        "guarantee": "24 часа",
        "desc": "WOT и Blitz аккаунт, любое кол-во боев,любые ценности .",
        "icon": "fas fa-tank"
    },
    "vpn": {
        "name": "VPN",
        "price_rub": "от 250₽",
        "price_usd": "от 1.5 USD",
        "price_ton": "0.5 TON",
        "price_stars": "от 150⭐",
        "guarantee": "7 дней",
        "desc": "VPN аккаунт.",
        "icon": "fas fa-shield-alt"
    },
    "manuals": {
        "name": "Мануалы",
        "price_rub": "от 250₽",
        "price_usd": "от 1 USD",
        "price_ton": "от 0.35 TON",
        "price_stars": "от 100⭐",
        "guarantee": "Навсегда",
        "desc": "Полезные мануалы и инструкции,уточнять в лс.",
        "icon": "fas fa-book"
    }
};

// Global state
let currentUser = null;
let cart = [];
let currentCurrency = 'rub';
let isLoginMode = true;

// DOM elements
const themeToggle = document.getElementById('themeToggle');
const currencySelect = document.getElementById('currencySelect');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const authBtn = document.getElementById('authBtn');
const productsGrid = document.getElementById('productsGrid');

// Modal elements
const cartModal = document.getElementById('cartModal');
const authModal = document.getElementById('authModal');
const cartModalClose = document.getElementById('cartModalClose');
const authModalClose = document.getElementById('authModalClose');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    loadCartData();
    renderProducts();
    updateCartUI();
    updateAuthUI();
    initializeEventListeners();
});

// Event listeners
function initializeEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Currency selector
    currencySelect.addEventListener('change', (e) => {
        currentCurrency = e.target.value;
        renderProducts();
        updateCartUI();
    });
    
    // Cart modal
    cartBtn.addEventListener('click', () => openModal(cartModal));
    cartModalClose.addEventListener('click', () => closeModal(cartModal));
    
    // Auth modal
    authBtn.addEventListener('click', () => openModal(authModal));
    authModalClose.addEventListener('click', () => closeModal(authModal));
    
    // Auth form
    document.getElementById('authForm').addEventListener('submit', handleAuth);
    document.getElementById('switchAuthMode').addEventListener('click', switchAuthMode);
    
    // Cart actions
    document.getElementById('clearCart').addEventListener('click', clearCart);
    document.getElementById('checkoutBtn').addEventListener('click', checkout);
    
    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
}

// Theme functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const icon = themeToggle.querySelector('i');
    icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const icon = themeToggle.querySelector('i');
    icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Product rendering
function renderProducts() {
    productsGrid.innerHTML = '';
    
    Object.entries(catalog).forEach(([key, product]) => {
        const productCard = createProductCard(key, product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(key, product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const price = getCurrentPrice(product);
    
    card.innerHTML = `
        <div class="product-header">
            <div class="product-icon">
                <i class="${product.icon}"></i>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">${price}</div>
            </div>
        </div>
        <p class="product-desc">${product.desc}</p>
        <div class="product-details">
            <div class="guarantee">
                <i class="fas fa-shield-alt"></i>
                <span>Гарантия: ${product.guarantee}</span>
            </div>
        </div>
        <button class="add-to-cart" onclick="addToCart('${key}')">
            <i class="fas fa-shopping-cart"></i>
            Добавить в корзину
        </button>
    `;
    
    return card;
}

function getCurrentPrice(product) {
    const priceKey = `price_${currentCurrency}`;
    return product[priceKey] || product.price_rub;
}

// Cart functionality
function addToCart(productKey) {
    if (!currentUser) {
        openModal(authModal);
        return;
    }
    
    const existingItem = cart.find(item => item.key === productKey);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            key: productKey,
            product: catalog[productKey],
            quantity: 1
        });
    }
    
    saveCartData();
    updateCartUI();
    
    // Show success animation
    showNotification('Товар добавлен в корзину!', 'success');
}

function removeFromCart(productKey) {
    cart = cart.filter(item => item.key !== productKey);
    saveCartData();
    updateCartUI();
    renderCartItems();
}

function updateQuantity(productKey, change) {
    const item = cart.find(item => item.key === productKey);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productKey);
        } else {
            saveCartData();
            updateCartUI();
            renderCartItems();
        }
    }
}

function clearCart() {
    cart = [];
    saveCartData();
    updateCartUI();
    renderCartItems();
    showNotification('Корзина очищена', 'info');
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    
    renderCartItems();
}

function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Корзина пуста</div>';
        cartTotal.textContent = '0';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const price = getCurrentPrice(item.product);
        const numericPrice = extractNumericPrice(price);
        const itemTotal = numericPrice * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.product.name}</h4>
                <div class="cart-item-price">${price}</div>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity('${item.key}', -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.key}', 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart('${item.key}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = formatPrice(total, currentCurrency);
}

function extractNumericPrice(priceString) {
    const match = priceString.match(/(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
}

function formatPrice(amount, currency) {
    const symbols = {
        'rub': '₽',
        'usd': ' USD',
        'ton': ' TON',
        'stars': '⭐'
    };
    
    return `${amount}${symbols[currency] || '₽'}`;
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Корзина пуста!', 'error');
        return;
    }
    
    // Simulate checkout process
    showNotification('Перенаправляем в Telegram бот для оформления заказа...', 'info');
    
    setTimeout(() => {
        window.open('https://t.me/wox_shop_bot', '_blank');
        clearCart();
        closeModal(cartModal);
        showNotification('Заказ отправлен! Свяжитесь с ботом для завершения покупки.', 'success');
    }, 1500);
}

// Authentication
function handleAuth(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!isLoginMode && password !== confirmPassword) {
        showNotification('Пароли не совпадают!', 'error');
        return;
    }
    
    if (isLoginMode) {
        // Simulate login
        const savedUser = localStorage.getItem('wox_user');
        if (savedUser) {
            const user = JSON.parse(savedUser);
            if (user.username === username && user.email === email) {
                currentUser = user;
                showNotification('Добро пожаловать!', 'success');
                closeModal(authModal);
                updateAuthUI();
                return;
            }
        }
        showNotification('Неверные данные для входа!', 'error');
    } else {
        // Simulate registration
        currentUser = { username, email };
        localStorage.setItem('wox_user', JSON.stringify(currentUser));
        showNotification('Регистрация успешна!', 'success');
        closeModal(authModal);
        updateAuthUI();
    }
}

function switchAuthMode() {
    isLoginMode = !isLoginMode;
    const title = document.getElementById('authModalTitle');
    const submitBtn = document.getElementById('authSubmit');
    const switchBtn = document.getElementById('switchAuthMode');
    const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
    
    if (isLoginMode) {
        title.textContent = 'Вход';
        submitBtn.textContent = 'Войти';
        switchBtn.textContent = 'Регистрация';
        confirmPasswordGroup.style.display = 'none';
    } else {
        title.textContent = 'Регистрация';
        submitBtn.textContent = 'Зарегистрироваться';
        switchBtn.textContent = 'Вход';
        confirmPasswordGroup.style.display = 'block';
    }
}

function updateAuthUI() {
    const authBtnSpan = authBtn.querySelector('span');
    const authBtnIcon = authBtn.querySelector('i');
    
    if (currentUser) {
        authBtnSpan.textContent = currentUser.username;
        authBtnIcon.className = 'fas fa-user-check';
        authBtn.onclick = logout;
    } else {
        authBtnSpan.textContent = 'Войти';
        authBtnIcon.className = 'fas fa-user';
        authBtn.onclick = () => openModal(authModal);
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('wox_user');
    cart = [];
    saveCartData();
    updateAuthUI();
    updateCartUI();
    showNotification('Вы вышли из аккаунта', 'info');
}

// Modal functionality
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    if (modal === cartModal) {
        renderCartItems();
    }
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Data persistence
function saveCartData() {
    if (currentUser) {
        localStorage.setItem(`wox_cart_${currentUser.username}`, JSON.stringify(cart));
    }
}

function loadCartData() {
    if (currentUser) {
        const savedCart = localStorage.getItem(`wox_cart_${currentUser.username}`);
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
    }
}

function loadUserData() {
    const savedUser = localStorage.getItem('wox_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        loadCartData();
    }
    loadTheme();
}

// Notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-primary);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px var(--shadow);
        border-left: 4px solid ${getNotificationColor(type)};
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'info': 'info-circle',
        'warning': 'exclamation-triangle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        'success': '#48bb78',
        'error': '#f56565',
        'info': '#667eea',
        'warning': '#ed8936'
    };
    return colors[type] || '#667eea';
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);