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

    const loginForm = document.getElementById('loginForm');


    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();


        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;


        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }

        const response = await fetch("https://educational-game-api.onrender.com/users/login", options);
        const data = await response.json();

        console.log(response);
        
        if (response.status == 200) {
            localStorage.setItem("token", data.token);
            window.location.assign("hello.html");



          } else {
            alert(data.error);
          }

    });
});
