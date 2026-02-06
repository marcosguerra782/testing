import React from 'react';

export function ProductCard({ product, isInCart, onAddToCart, onRemoveFromCart }) {
    return (
        <div className="product-card">
            <div className="product-image">
                <img src={product.image} alt={product.name} />
                {isInCart ? (
                    <button
                        className="add-to-cart-btn"
                        title="Ir al carrito para ver detalles"
                        style={{ backgroundColor: '#333', color: '#fff' }}
                        onClick={() => onRemoveFromCart(product.id)}
                    >
                        ✓ En el Carrito
                    </button>
                ) : (
                    <button
                        className="add-to-cart-btn"
                        onClick={() => onAddToCart(product)}
                    >
                        Agregar a la Bolsa
                    </button>
                )}
            </div>
            <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-title">{product.name}</h3>
                <span className="product-price">${product.price.toFixed(2)}</span>
            </div>
        </div>
    );
}
