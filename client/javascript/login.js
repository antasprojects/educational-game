document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Here you would typically send a request to your server to authenticate the user
        console.log('Login attempt:', { email, password });

        // For demonstration purposes, we'll just log a success message
        alert('Login successful!');
        
        // Clear the form
        loginForm.reset();
    });
});
