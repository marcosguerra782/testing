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
                    <li><a href="#">New Arrivals</a></li>
                    <li><a href="#">Collections</a></li>
                    <li><a href="#">Accessories</a></li>
                </ul>
            </nav>
            <div class="user-actions">
                <a href="#" class="icon-link"><i class="fas fa-search"></i> Search</a>
                ${isLoggedIn ?
            `<a href="#" class="icon-link"><i class="fas fa-shopping-bag"></i> Cart (0)</a>` :
            `<a href="index.html" class="btn btn-primary">Login</a>`
        }
            </div>
        </div>
    `;

    return header;
};
