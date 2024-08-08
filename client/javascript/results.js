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
        console.log("first WE ARE HERE", localStorage.getItem("token"))

        try {



        const options = {
            method: "GET",
            headers: {
                "authorization": localStorage.getItem("token"),
            },
        }

        const token = localStorage.getItem("token");
        const decodedToken = jwt_decode(token);
        const subject = localStorage.getItem("subject");
        const level = localStorage.getItem("level");
        const quizGroup = localStorage.getItem("quizGroup");
        const updatedAt = localStorage.getItem("resultUpdate");
        const maxScore = localStorage.getItem("maxScore");


        const utcToBst = new Date(updatedAt.replace(" ", "T"));

        utcToBst.setTime(utcToBst.getTime() + 3600000);
        const pad = (n) => n.toString().padStart(2, '0');
        const bst = `${utcToBst.getFullYear()}-${pad(utcToBst.getMonth() + 1)}-${pad(utcToBst.getDate())} ` +
                   `${pad(utcToBst.getHours())}:${pad(utcToBst.getMinutes())}:${pad(utcToBst.getSeconds())}`.replace(/ /g, "%20");


        const response = await fetch(`http://localhost:3000/results/total-score/${decodedToken.id}?subject=${subject}&level=${level}&group_num=${quizGroup}&updated_at=${bst}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();

        console.log("firstsssss", data)

        resultsContainer.innerHTML = '<h2>Quiz Results</h2>';
        const score = Math.floor(Math.random() * 7);
        resultsContainer.innerHTML += `<p>For ${data.data.subject.toLowerCase()} on ${data.data.level.toLowerCase()} level for quiz group ${data.data.group_num}</p>`;
        resultsContainer.innerHTML += `<p>Your score: ${data.data.score} out of ${maxScore}</p>`;

        
        if (maxScore ) {
            resultsContainer.innerHTML += '<p>Great job! You did excellent!</p>';
        } else if (score >= 3) {
            resultsContainer.innerHTML += '<p>Good effort! Keep practicing to improve.</p>';
        } else {
            resultsContainer.innerHTML += '<p>You might want to study more and try again.</p>';
        }
    } catch (error) {
        console.log('Error updating results:', error);
    }
    }


});
