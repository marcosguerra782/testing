window.LuxeApp = window.LuxeApp || {};

window.LuxeApp.createProductCard = function (product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            <button class="add-to-cart-btn">Agregar a la Bolsa</button>
        </div>
        <div class="product-info">
            <span class="product-category">${product.category}</span>
            <h3 class="product-title">${product.name}</h3>
            <span class="product-price">$${product.price.toFixed(2)}</span>
        </div>
    `;

    return card;
};
