import React, { useState } from 'react';

export function LoginForm({ onLogin, onRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegistering) {
            onRegister(email, password);
        } else {
            onLogin(email, password);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-header">
                    <h2>{isRegistering ? 'Crear Cuenta' : 'Bienvenido a LuxeAura'}</h2>
                    <p>{isRegistering ? 'Únete a nuestra comunidad exclusiva.' : 'Inicia sesión para acceder a colecciones exclusivas solo para miembros.'}</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Dirección de Correo</label>
                        <input
                            type="email"
                            id="email"
                            required
                            placeholder="nombre@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                        {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
                    </button>
                    <div className="auth-footer">
                        <a href="#" onClick={(e) => e.preventDefault()}>¿Olvidaste tu contraseña?</a>
                        <span>
                            {isRegistering ? '¿Ya tienes una cuenta? ' : '¿Eres nuevo? '}
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                setIsRegistering(!isRegistering);
                            }}>
                                {isRegistering ? 'Iniciar Sesión' : 'Crear una cuenta'}
                            </a>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}
