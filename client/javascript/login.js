document.addEventListener('DOMContentLoaded', function() {
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

        const response = await fetch("http://localhost:3000/users/login", options);
        const data = await response.json();

        console.log(response);
        
        if (response.status == 200) {
            alert("Logged in")
            localStorage.setItem("token", data.token);
            alert('Login successful!');

          } else {
            alert(data.error);
          }

    });
});
