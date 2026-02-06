import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';

export function LoginPage({ onLogin, onRegister, pendingVerification }) {
  const navigate = useNavigate();

  const handleRegister = async (email, password) => {
    await onRegister(email, password);
    // La redirección se maneja desde App.jsx cuando pendingVerification cambia
  };

  return (
    <div className="auth-page">
      <LoginForm onLogin={onLogin} onRegister={handleRegister} />
    </div>
  );
}
