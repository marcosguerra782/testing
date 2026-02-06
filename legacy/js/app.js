document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const isShopPage = path.includes('shop.html');

    if (isShopPage) {
        initShop();
    } else {
        initAuth();
    }
});

function initAuth() {
    const app = document.getElementById('app');
    if (!app) return;

    // Use global namespace
    app.appendChild(window.LuxeApp.createAuthForm());

    const form = document.getElementById('loginForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // PHISHING SIMULATION LOGIC
        console.warn('PHISHING SIMULATION: Credentials captured!');
        console.log('Email:', email);
        console.log('Password:', password);

        alert(`⚠️ PHISHING SIMULATION ⚠️\n\nIn a real attack, these credentials would have been sent to the attacker:\n\nEmail: ${email}\nPassword: ${password}\n\nAlways check the URL before logging in!`);

        // Redirect to the "real" site to complete the illusion
        window.location.href = 'shop.html';
    });
}

function initShop() {
    const headerContainer = document.getElementById('header-container');
    const productGrid = document.getElementById('product-grid');

    if (headerContainer) {
        headerContainer.appendChild(window.LuxeApp.createHeader(true));
    }

    if (productGrid) {
        window.LuxeApp.products.forEach(product => {
            productGrid.appendChild(window.LuxeApp.createProductCard(product));
        });
    }
}
