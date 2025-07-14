document.addEventListener('DOMContentLoaded', () => {
    // Autofill for testing
    if (document.getElementById('loginForm')) {
        document.getElementById('username').value = 'testuser';
        document.getElementById('password').value = 'password123';
    }

    if (document.getElementById('signupForm')) {
        document.getElementById('username').value = 'newuser';
        document.getElementById('password').value = 'password123';
        document.getElementById('confirmPassword').value = 'password123';
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = 'role-selection.html';
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real application, you would validate credentials here
            // For this example, we'll just redirect to the main app
            window.location.href = 'index.html';
        });
    }
});
