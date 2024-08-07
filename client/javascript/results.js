document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('resultDetails')) {
        showResults();
    }

    if (document.getElementById('retryQuiz')) {
        document.getElementById('retryQuiz').addEventListener('click', () => {
            window.location.href = 'quizzes.html';
        });
    }

    async function showResults() {
        const resultsContainer = document.getElementById('resultDetails');
        // console.log("first WE ARE HERE", localStorage.getItem("token"))
        // const options = {
        //     method: "GET",
        //     headers: {
        //         "authorization": localStorage.getItem("token")
        //     },
        // }

        // const response = await fetch("http://localhost:3000/results", options);
        // const data = await response.json();

        // console.log("firstsssss", data)

        resultsContainer.innerHTML = '<h2>Quiz Results</h2>';
        const score = Math.floor(Math.random() * 7);
        resultsContainer.innerHTML += `<p>Your score: ${score} out of 6</p>`;
        
        if (score >= 4) {
            resultsContainer.innerHTML += '<p>Great job! You did excellent!</p>';
        } else if (score >= 3) {
            resultsContainer.innerHTML += '<p>Good effort! Keep practicing to improve.</p>';
        } else {
            resultsContainer.innerHTML += '<p>You might want to study more and try again.</p>';
        }
    }


});
