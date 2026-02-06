import React from 'react';

export function Header({ cartCount, onSearch, onCategoryClick, onLogout, user }) {
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
                            <a href="#" className="icon-link">
                                <i className="fas fa-shopping-bag"></i> Carrito ({cartCount})
                            </a>
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
