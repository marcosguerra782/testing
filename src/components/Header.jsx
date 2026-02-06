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
                        <li><a onClick={() => onCategoryClick('New Arrivals')}>New Arrivals</a></li>
                        <li><a onClick={() => onCategoryClick('Collections')}>Collections</a></li>
                        <li><a onClick={() => onCategoryClick('Accessories')}>Accessories</a></li>
                    </ul>
                </nav>
                <div className="user-actions">
                    <div className="search-bar">
                        <i className="fas fa-search"></i>
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    </div>

                    {user ? (
                        <>
                            <a href="#" className="icon-link">
                                <i className="fas fa-shopping-bag"></i> Cart ({cartCount})
                            </a>
                            <button onClick={onLogout} className="btn btn-outline" style={{ padding: '5px 10px', fontSize: '0.8rem' }}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <button className="btn btn-primary">Login</button>
                    )}
                </div>
            </div>
        </header>
    );
}
