import React, { useState } from 'react';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

export function HomePage({ user, cart, setCart, onLogout, searchQuery, setSearchQuery }) {
  const [categoryFilter, setCategoryFilter] = useState(null);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleCategoryClick = (category) => {
    setCategoryFilter(category === 'Colecciones' ? null : category);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter ? product.category === categoryFilter || (categoryFilter === 'Nuevas Llegadas') : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">
      <Header
        cartCount={cart.length}
        onSearch={setSearchQuery}
        onCategoryClick={handleCategoryClick}
        onLogout={onLogout}
        user={user}
      />

      <main>
        <div className="shop-hero">
          <div className="container">
            <h1>{categoryFilter || 'La Colección de Otoño'}</h1>
            <p>Descubre el nuevo estándar de lujo.</p>
          </div>
        </div>

        <div className="container">
          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => {
                const isInCart = cart.some(item => item.id === product.id);
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isInCart={isInCart}
                    onAddToCart={handleAddToCart}
                    onRemoveFromCart={handleRemoveFromCart}
                  />
                );
              })
            ) : (
              <p style={{ gridColumn: '1/-1', textAlign: 'center' }}>No se encontraron productos.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
