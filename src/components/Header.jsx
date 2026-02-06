import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Header({ cartCount, onSearch, onCategoryClick, onLogout, user }) {
    const navigate = useNavigate();
    
    return (
        <header className="site-header">
            <div className="container header-content">
                <div className="logo">
                    <img src="/assets/logo.png" alt="LuxeAura Paris" />
                </div>
                <nav>
                    <ul>
                        <li><a onClick={() => onCategoryClick('Nuevas Llegadas')}>Nuevas Llegadas</a></li>
                        <li><a onClick={() => onCategoryClick('Colecciones')}>Colecciones</a></li>
                        <li><a onClick={() => onCategoryClick('Accesorios')}>Accesorios</a></li>
                    </ul>
                </nav>
                <div className="user-actions">
                    <div className="search-bar">
                        <i className="fas fa-search"></i>
                        <input
                            type="text"
                            placeholder="Buscar..."
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    </div>

                    {user ? (
                        <>
                            <button
                                className="icon-link"
                                onClick={() => navigate('/cart')}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    color: 'inherit',
                                    padding: 0,
                                    marginRight: '15px'
                                }}
                            >
                                <i className="fas fa-shopping-bag"></i> Carrito ({cartCount})
                            </button>
                            <button onClick={onLogout} className="btn btn-outline" style={{ padding: '5px 10px', fontSize: '0.8rem' }}>
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        <button className="btn btn-primary">Iniciar Sesión</button>
                    )}
                </div>
            </div>
        </header>
    );
}
