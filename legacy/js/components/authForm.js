window.LuxeApp = window.LuxeApp || {};

window.LuxeApp.createAuthForm = function () {
    const formContainer = document.createElement('div');
    formContainer.className = 'auth-container';

    formContainer.innerHTML = `
        <div class="auth-box">
            <div class="auth-header">
                <h2>Bienvenido a LuxeAura</h2>
                <p>Inicia sesión para acceder a colecciones exclusivas solo para miembros.</p>
            </div>
            <form id="loginForm">
                <div class="form-group">
                    <label for="email">Dirección de Correo</label>
                    <input type="email" id="email" required placeholder="nombre@ejemplo.com">
                </div>
                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" required placeholder="••••••••">
                </div>
                <button type="submit" class="btn btn-primary btn-block">Iniciar Sesión</button>
                <div class="auth-footer">
                    <a href="#">¿Olvidaste tu contraseña?</a>
                    <span>¿Eres nuevo? <a href="#">Crear una cuenta</a></span>
                </div>
            </form>
        </div>
    `;

    return formContainer;
};
