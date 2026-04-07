/** 
 * Lumina Tech - Javascript logic
 * Version 2.0 - Includes Checkout Simulation
 */

// 1. Data Store
const PRODUCTS = [
    {
      id: 1,
      title: "Laptop Titan Pro",
      category: "Laptops",
      price: 2499.00,
      image: "assets/laptop.png",
      description: "Alto rendimiento para profesionales exigentes."
    },
    {
      id: 2,
      title: "Audio Max Noise",
      category: "Audio",
      price: 349.00,
      image: "assets/headphones.png",
      description: "Cancelación de ruido líder en la industria."
    },
    {
      id: 3,
      title: "Lumina Watch S5",
      category: "Accesorios",
      price: 199.00,
      image: "assets/smartwatch.png",
      description: "Monitoriza cada latido de tu vida digital."
    },
    {
      id: 4,
      title: "Mouse Precision X",
      category: "Accesorios",
      price: 79.00,
      image: "assets/mouse.png",
      description: "Precisión milimétrica para diseñadores."
    },
    {
      id: 5,
      title: "Tablet Vision Pro",
      category: "Laptops",
      price: 899.00,
      image: "assets/tablet.png",
      description: "La versatilidad de una laptop en un cuerpo ligero."
    },
    {
      id: 6,
      title: "Earpods Studio",
      category: "Audio",
      price: 159.00,
      image: "assets/earpods.png",
      description: "Sonido de estudio en un tamaño compacto."
    }
];

let cart = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('product-search');
const filterBtns = document.querySelectorAll('.filters__btn');
const cartToggle = document.getElementById('cart-toggle');
const cartClose = document.getElementById('cart-close');
const cartModal = document.getElementById('cart-modal');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartBadge = document.getElementById('cart-count');

// Checkout Elements
const openCheckoutBtn = document.getElementById('open-checkout');
const checkoutModal = document.getElementById('checkout-modal');
const checkoutCloseBtn = document.getElementById('checkout-close-btn');
const goToPaymentBtn = document.getElementById('go-to-payment');
const paymentForm = document.getElementById('payment-form');
const finishCheckoutBtn = document.getElementById('finish-checkout');

const step1 = document.getElementById('checkout-step-1');
const step2 = document.getElementById('checkout-step-2');
const stepSuccess = document.getElementById('checkout-step-success');
const step1Indicator = document.getElementById('step-1-indicator');
const step2Indicator = document.getElementById('step-2-indicator');

const checkoutSummaryList = document.getElementById('checkout-summary-list');
const checkoutTotalVal = document.getElementById('checkout-total-val');

// --- Functions ---

function renderProducts(items) {
    if (!productGrid) return;
    productGrid.innerHTML = '';
    
    if (items.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #64748b;">No se encontraron productos.</p>';
        return;
    }

    items.forEach(product => {
        const productArticle = document.createElement('article');
        productArticle.classList.add('product-card');
        productArticle.innerHTML = `
            <div class="product-card__image-container">
                <img src="${product.image}" alt="${product.title}" class="product-card__image" onerror="this.src='https://placehold.co/300x300/f8fafc/6366f1?text=Tech+Image'">
            </div>
            <div class="product-card__info">
                <span class="product-card__category">${product.category}</span>
                <h3 class="product-card__title">${product.title}</h3>
                <div class="product-card__footer">
                    <span class="product-card__price">$${product.price.toFixed(2)}</span>
                    <button class="product-card__add-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
        productGrid.appendChild(productArticle);
    });
}

function handleFilters() {
    const query = searchInput.value.toLowerCase();
    const activeBtn = document.querySelector('.filters__btn--active');
    const category = activeBtn.dataset.filter;

    const filtered = PRODUCTS.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query);
        const matchesCategory = category === 'all' || p.category === category;
        return matchesSearch && matchesCategory;
    });

    renderProducts(filtered);
}

// --- Cart Logic ---

window.addToCart = (productId) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    toggleCart(true);
};

window.removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
};

function updateCartUI() {
    const totalItems = cart.reduce((acc, current) => acc + current.quantity, 0);
    cartBadge.textContent = totalItems;
    
    cartBadge.classList.add('animate-pop');
    setTimeout(() => cartBadge.classList.remove('animate-pop'), 300);

    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #64748b; margin-top: 2rem;">Tu carrito está vacío.</p>';
        cartTotalElement.textContent = '$0.00';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-modal__item');
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-modal__item-img" onerror="this.src='https://placehold.co/80x80/f8fafc/6366f1?text=Tech'">
            <div class="cart-modal__item-info">
                <h4 class="cart-modal__item-title">${item.title}</h4>
                <div class="cart-modal__item-controls">
                    <span class="cart-modal__item-price">$${item.price.toFixed(2)} x ${item.quantity}</span>
                    <button class="cart-modal__item-remove" onclick="removeFromCart(${item.id})">Eliminar</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

function toggleCart(open) {
    if (open) {
        cartModal.classList.add('cart-modal--open');
        cartOverlay.classList.add('cart-modal__overlay--visible');
    } else {
        cartModal.classList.remove('cart-modal--open');
        cartOverlay.classList.remove('cart-modal__overlay--visible');
    }
}

// --- Checkout Simulation Logic ---

function openCheckout() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    toggleCart(false);
    checkoutModal.classList.add('checkout-modal--open');
    document.body.style.overflow = 'hidden'; // Stop scroll
    
    renderCheckoutSummary();
    resetCheckoutSteps();
}

function closeCheckout() {
    checkoutModal.classList.remove('checkout-modal--open');
    document.body.style.overflow = 'auto';
}

function renderCheckoutSummary() {
    checkoutSummaryList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        
        const summaryItem = document.createElement('div');
        summaryItem.classList.add('checkout-modal__summary-item');
        summaryItem.innerHTML = `
            <span>${item.title} x${item.quantity}</span>
            <span>$${subtotal.toFixed(2)}</span>
        `;
        checkoutSummaryList.appendChild(summaryItem);
    });

    checkoutTotalVal.textContent = `$${total.toFixed(2)}`;
}

function resetCheckoutSteps() {
    step1.classList.remove('u-hidden');
    step2.classList.add('u-hidden');
    stepSuccess.classList.add('u-hidden');
    step1Indicator.classList.add('checkout-step--active');
    step2Indicator.classList.remove('checkout-step--active');
}

// --- Event Listeners ---

document.addEventListener('DOMContentLoaded', () => {
    renderProducts(PRODUCTS);
});

// Filters
if (searchInput) searchInput.addEventListener('input', handleFilters);
filterBtns.forEach(btn => btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('filters__btn--active'));
    btn.classList.add('filters__btn--active');
    handleFilters();
}));

// Nav & Cart
if (cartToggle) cartToggle.addEventListener('click', () => toggleCart(true));
if (cartClose) cartClose.addEventListener('click', () => toggleCart(false));
if (cartOverlay) cartOverlay.addEventListener('click', () => toggleCart(false));

// Checkout Actions
if (openCheckoutBtn) openCheckoutBtn.addEventListener('click', openCheckout);
if (checkoutCloseBtn) checkoutCloseBtn.addEventListener('click', closeCheckout);

if (goToPaymentBtn) goToPaymentBtn.addEventListener('click', () => {
    step1.classList.add('u-hidden');
    step2.classList.remove('u-hidden');
    step1Indicator.classList.remove('checkout-step--active');
    step2Indicator.classList.add('checkout-step--active');
});

if (paymentForm) paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    step2.classList.add('u-hidden');
    stepSuccess.classList.remove('u-hidden');
    
    // Clear cart after success
    cart = [];
    updateCartUI();
});

if (finishCheckoutBtn) finishCheckoutBtn.addEventListener('click', closeCheckout);

// Forms simulation
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("¡Gracias por suscribirte a Lumina Tech!");
    newsletterForm.reset();
});

const contactForm = document.getElementById('contact-form');
if (contactForm) contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Mensaje enviado correctamente. Nos pondremos en contacto pronto.");
    contactForm.reset();
});
