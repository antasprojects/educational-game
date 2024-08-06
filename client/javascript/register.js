document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Here you would typically send a request to your server to register the user
        console.log('Registration attempt:', { name, email, password });

        // For demonstration purposes, we'll just log a success message
        alert('Registration successful!');
        
        // Clear the form
        registerForm.reset();
    });
});
