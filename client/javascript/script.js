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
        document.getElementById('registerForm').addEventListener('submit', async (e) => {
            e.preventDefault();


            const email = e.target[0].value
            const password = e.target[1].value
            const confirmPassword = e.target[2].value

            if (password !== confirmPassword) {
                alert('Passwords do not match.')
                return
            }

            const options = {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword
                })
            };

            const response = await fetch("http://localhost:3000/users/register", options);
            const data = await response.json();

            if (response.status == 201) {
                window.location.assign("quizzes.html");
            } else {
                alert(data.error);
            }


            // if (email && password) {
            //     window.location.href = 'quizzes.html';
            // } else {
            //     document.getElementById('registerFeedback').textContent = 'Please fill in all fields.';
            // }
        });
    }

    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();

            // if (loginEmail === validEmail && loginPassword === validPassword) {
            //     window.location.href = 'quizzes.html';
            // } else {
            //     document.getElementById('loginFeedback').textContent = 'Invalid email or password.';
            // }
        });
    }
});
