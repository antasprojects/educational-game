// document.addEventListener('DOMContentLoaded', function() {

//     document.getElementById("register-form").addEventListener("submit", async (e) => {
//         e.preventDefault();
//         console.log(e);
//         const form = new FormData(e.target);

//         const options = {
//             method: "POST",
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 username: form.get(""),
//                 password: form.get("password")
//             })
//         };

//         console.log(options);

//         const response = await fetch("http://localhost:3000/users/register", options);
//         const data = await response.json();

//         if (response.status == 201) {
//             window.location.assign("login.html");
//         } else {
//             alert(data.error);
//         }
//     });
// });
