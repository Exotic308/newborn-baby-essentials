// Function to create a product card
function createProductCard(product) {
    const linkTarget = product.link ? `href="${product.link}" target="_blank"` : '';
    const isLink = product.link ? 'a' : 'div';
    
    return `
        <${isLink} class="product-card" ${linkTarget}>
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <!--<div class="product-quantity">${product.details}</div>-->
            </div>
            <div class="product-price-section">
                <div class="product-price">${product.price} BAM</div>
                <!--<button class="add-to-cart" onclick="event.preventDefault(); event.stopPropagation(); addToCart('${product.name}')">
                    <svg class="cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10.12 17.063c1.074 0 1.944.881 1.944 1.968 0 1.088-.87 1.969-1.943 1.969s-1.943-.881-1.943-1.969c0-1.087.87-1.968 1.943-1.968m6.806 0c1.073 0 1.943.881 1.943 1.968 0 1.088-.87 1.969-1.943 1.969s-1.943-.881-1.943-1.969c0-1.087.87-1.968 1.943-1.968M4.683 4c.135.003 1.366.045 1.77.646.43.636.35.939.668 1.434a1 1 0 0 0 .798.454H21.15c.28 0 .52.087.683.297s.21.49.124.743l-1.824 5.956a2.5 2.5 0 0 1-2.162 1.716H9.224a2.57 2.57 0 0 1-2.132-1.605c-.01-.04-.08-.172-.08-.263-.29-.979-1.594-6.35-1.883-6.844a.88.88 0 0 0-.817-.454H3.026A1.033 1.033 0 0 1 2 5.04C2 4.466 2.46 4 3.026 4Z"></path>
                    </svg>
                </button>-->
            </div>
        </${isLink}>
    `;
}

// Function to calculate store total
function calculateStoreTotal(products) {
    let total = 0;
    products.forEach(product => {
        if (product.price) {
            const price = parseFloat(product.price.replace(',', '.'));
            total += price;
        }
    });
    return total.toFixed(2).replace('.', ',');
}

// Function to create a store section
function createStoreSection(store, index) {
    const storeTotal = calculateStoreTotal(store.products);
    const productCount = store.products ? store.products.length : 0;
    
    let productsHTML = '';
    if (store.products && store.products.length > 0) {
        productsHTML = store.products.map(product => createProductCard(product)).join('');
    }
    
    return `
        <section class="store-section">
            <div class="store-header" onclick="toggleStore('${store.id}')">
                <div class="store-info">
                    <img src="${store.logo}" alt="${store.name}" class="store-logo">
                    <span class="product-count" style="white-space: nowrap;">${productCount} proizvoda</span>
                </div>
                <div class="store-right">
                    <div class="store-total">${storeTotal} BAM</div>
                    <svg class="toggle-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                    </svg>
                </div>
            </div>
            <div class="products-list" id="store-${store.id}">
                ${productsHTML}
            </div>
        </section>
    `;
}

// Function to toggle store visibility
function toggleStore(storeId) {
    const productsList = document.getElementById(`store-${storeId}`);
    const storeSection = productsList.closest('.store-section');
    const arrow = storeSection.querySelector('.toggle-arrow');
    
    if (productsList.classList.contains('collapsed')) {
        productsList.classList.remove('collapsed');
        arrow.classList.remove('rotated');
    } else {
        productsList.classList.add('collapsed');
        arrow.classList.add('rotated');
    }
}

// Function to add to cart (placeholder)
function addToCart(productName) {
    alert(`Dodato u korpu: ${productName}`);
}

// Load and render products
function loadProducts() {
    fetch('products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(stores => {
            if (!Array.isArray(stores)) {
                throw new Error('Invalid data structure - expected array of stores');
            }
            
            const container = document.getElementById('stores-container');
            
            // Create sections for each store
            stores.forEach((store, index) => {
                const section = createStoreSection(store, index);
                container.innerHTML += section;
            });

            // Calculate and update total
            calculateTotal(stores);
        })
        .catch(error => {
            console.error('Error loading products:', error);
            const container = document.getElementById('stores-container');
            container.innerHTML = `
                <div style="padding: 40px; text-align: center; color: #e74c3c;">
                    <h2>⚠️ Greška pri učitavanju proizvoda</h2>
                    <p>Molimo proverite da li je products.json fajl dostupan.</p>
                    <p style="font-size: 0.9em; color: #666; margin-top: 10px;">Error: ${error.message}</p>
                </div>
            `;
        });
}

// Calculate total from all stores
function calculateTotal(stores) {
    let total = 0;
    stores.forEach(store => {
        if (store.products) {
            store.products.forEach(product => {
                if (product.price) {
                    const price = parseFloat(product.price.replace(',', '.'));
                    total += price;
                }
            });
        }
    });
    document.getElementById('total-amount').textContent = `Ukupno: ${total.toFixed(2).replace('.', ',')} BAM`;
}

// Load products when page loads
document.addEventListener('DOMContentLoaded', loadProducts);
