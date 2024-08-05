document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navBar = document.getElementById('nav-bar');
    const footer = document.querySelector('footer');

    const validEmail = 'cameliabaronescu@gmail.com';
    const validPassword = 'password123'; 

    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email && password) {
            showSection('quizzes');
            navBar.classList.remove('hidden');
            footer.classList.remove('hidden');
            document.getElementById('registerFeedback').textContent = '';
        } else {
            document.getElementById('registerFeedback').textContent = 'Please fill in all fields.';
        }
    });

    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const loginEmail = document.getElementById('loginEmail').value;
        const loginPassword = document.getElementById('loginPassword').value;

        if (loginEmail === validEmail && loginPassword === validPassword) {
            showSection('quizzes');
            navBar.classList.remove('hidden');
            footer.classList.remove('hidden');
            document.getElementById('loginFeedback').textContent = '';
        } else {
            document.getElementById('loginFeedback').textContent = 'Invalid email or password.';
        }
    });

    document.getElementById('logout').addEventListener('click', () => {
        showSection('welcome');
        navBar.classList.add('hidden');
        footer.classList.add('hidden');
    });

    document.getElementById('historyBtn').addEventListener('click', () => {
        showSection('quiz-level');
    });

    document.querySelectorAll('#quiz-level button').forEach(button => {
        button.addEventListener('click', () => {
            startQuiz(button.getAttribute('data-level'));
            showSection('quiz');
        });
    });

    document.getElementById('submitQuiz').addEventListener('click', () => {
        showSection('results');
        showResults();
    });

    document.getElementById('retryQuiz').addEventListener('click', () => {
        showSection('quiz-level');
    });

    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(sectionId).classList.remove('hidden');
    }

    function startQuiz(level) {
        const questionsContainer = document.getElementById('questions');
        questionsContainer.innerHTML = '';
        for (let i = 1; i <= 6; i++) {
            const question = `
                <div class="question">
                    <h3>Question ${i}</h3>
                    <p>This is a sample question for ${level} level quiz.</p>
                    <input type="radio" name="q${i}" value="a"> Answer A<br>
                    <input type="radio" name="q${i}" value="b"> Answer B<br>
                    <input type="radio" name="q${i}" value="c"> Answer C<br>
                    <input type="radio" name="q${i}" value="d"> Answer D<br>
                </div>
            `;
            questionsContainer.innerHTML += question;
        }
    }

    function showResults() {
        const resultsContainer = document.getElementById('resultDetails');
        resultsContainer.innerHTML = '<h2>Quiz Results</h2>';
        const score = Math.floor(Math.random() * 7); // Random score between 0 and 6
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
