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
                    <h2>{isRegistering ? 'Create Account' : 'Welcome to LuxeAura'}</h2>
                    <p>{isRegistering ? 'Join our exclusive community.' : 'Sign in to access exclusive members-only collections.'}</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            required
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
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
                        {isRegistering ? 'Create Account' : 'Sign In'}
                    </button>
                    <div className="auth-footer">
                        <a href="#" onClick={(e) => e.preventDefault()}>Forgot password?</a>
                        <span>
                            {isRegistering ? 'Already have an account? ' : 'New here? '}
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                setIsRegistering(!isRegistering);
                            }}>
                                {isRegistering ? 'Sign In' : 'Create an account'}
                            </a>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}
