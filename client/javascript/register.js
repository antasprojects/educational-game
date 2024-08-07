document.addEventListener('DOMContentLoaded', function() {

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
            localStorage.setItem("token", data.token);
            window.location.assign("index.html");
        } else {
            alert(data.error);
        }
    })
})