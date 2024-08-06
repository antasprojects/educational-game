document.addEventListener("DOMContentLoaded", () => {
    const validEmail = 'cameliabaronescu@gmail.com';
    const validPassword = 'password123';

    function showSection(sectionId) {
        document.querySelectorAll('main > section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(sectionId).classList.remove('hidden');
    }

    if (document.getElementById('registerBtn')) {
        document.getElementById('registerBtn').addEventListener('click', () => {
            showSection('register');
        });
    }

    if (document.getElementById('loginBtn')) {
        document.getElementById('loginBtn').addEventListener('click', () => {
            showSection('login');
        });
    }

    if (document.getElementById('registerForm')) {
        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (username && email && password) {
                window.location.href = 'quizzes.html';
            } else {
                document.getElementById('registerFeedback').textContent = 'Please fill in all fields.';
            }
        });
    }

    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const loginEmail = document.getElementById('loginEmail').value;
            const loginPassword = document.getElementById('loginPassword').value;

            if (loginEmail === validEmail && loginPassword === validPassword) {
                window.location.href = 'quizzes.html';
            } else {
                document.getElementById('loginFeedback').textContent = 'Invalid email or password.';
            }
        });
    }
});
