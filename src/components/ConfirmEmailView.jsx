import React from 'react';

export function ConfirmEmailView({ email, onBackToLogin }) {
    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-box" style={{ textAlign: 'center' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <i className="fas fa-envelope" style={{ fontSize: '3rem', color: '#8B7355' }}></i>
                    </div>
                    <div className="auth-header">
                        <h2>¡Verifica tu Email!</h2>
                        <p>Hemos enviado un correo de confirmación a:</p>
                        <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333', marginTop: '10px' }}>
                            {email}
                        </p>
                    </div>
                    <div style={{ marginTop: '30px', lineHeight: '1.8' }}>
                        <p>Por favor, haz clic en el enlace de confirmación en el correo para activar tu cuenta.</p>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>Si no ves el correo, revisa tu carpeta de spam.</p>
                    </div>
                    <button
                        onClick={onBackToLogin}
                        className="btn btn-primary"
                        style={{ marginTop: '30px', width: '100%' }}
                    >
                        Volver a Inicio de Sesión
                    </button>
                </div>
            </div>
        </div>
    );
}
