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

        // LÓGICA DE SIMULACIÓN DE PHISHING
        console.warn('SIMULACIÓN DE PHISHING: ¡Credenciales capturadas!');
        console.log('Correo:', email);
        console.log('Contraseña:', password);

        alert(`⚠️ SIMULACIÓN DE PHISHING ⚠️\n\nEn un ataque real, estas credenciales se hubieran enviado al atacante:\n\nCorreo: ${email}\nContraseña: ${password}\n\n¡Siempre verifica la URL antes de iniciar sesión!`);

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
