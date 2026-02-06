window.LuxeApp = window.LuxeApp || {};

window.LuxeApp.createAuthForm = function () {
    const formContainer = document.createElement('div');
    formContainer.className = 'auth-container';

    formContainer.innerHTML = `
        <div class="auth-box">
            <div class="auth-header">
                <h2>Welcome to LuxeAura</h2>
                <p>Sign in to access exclusive members-only collections.</p>
            </div>
            <form id="loginForm">
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" required placeholder="name@example.com">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" required placeholder="••••••••">
                </div>
                <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                <div class="auth-footer">
                    <a href="#">Forgot password?</a>
                    <span>New here? <a href="#">Create an account</a></span>
                </div>
            </form>
        </div>
    `;

    return formContainer;
};
