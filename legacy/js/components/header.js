window.LuxeApp = window.LuxeApp || {};

window.LuxeApp.createHeader = function (isLoggedIn = false) {
    const header = document.createElement('header');
    header.className = 'site-header';

    header.innerHTML = `
        <div class="container header-content">
            <div class="logo">
                <img src="assets/logo.png" alt="LuxeAura Paris">
            </div>
            <nav>
                <ul>
                    <li><a href="#">Nuevas Llegadas</a></li>
                    <li><a href="#">Colecciones</a></li>
                    <li><a href="#">Accesorios</a></li>
                </ul>
            </nav>
            <div class="user-actions">
                <a href="#" class="icon-link"><i class="fas fa-search"></i> Buscar</a>
                ${isLoggedIn ?
            `<a href="#" class="icon-link"><i class="fas fa-shopping-bag"></i> Carrito (0)</a>` :
            `<a href="index.html" class="btn btn-primary">Iniciar Sesión</a>`
        }
            </div>
        </div>
    `;

    return header;
};
