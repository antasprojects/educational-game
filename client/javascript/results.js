document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('resultDetails')) {
        showResults();
    }

    if (document.getElementById('retryQuiz')) {
        document.getElementById('retryQuiz').addEventListener('click', () => {
            window.location.href = 'quizzes.html';
        });
    }

    function showResults() {
        const resultsContainer = document.getElementById('resultDetails');
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
