document.addEventListener("DOMContentLoaded", () => {
    const navBar = document.getElementById('nav-bar');
    const footer = document.querySelector('footer');

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

    document.getElementById('logout').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    if (document.querySelector('.subject-btn')) {
        document.querySelectorAll('.subject-btn').forEach(button => {
            button.addEventListener('click', () => {
                const subject = button.getAttribute('data-subject');
                showSection('quiz-level');
            });
        });
    }

    if (document.querySelector('#quiz-level button')) {
        document.querySelectorAll('#quiz-level button').forEach(button => {
            button.addEventListener('click', () => {
                const level = button.getAttribute('data-level');
                startQuiz(level);
                showSection('quiz');
            });
        });
    }

    if (document.getElementById('submitQuiz')) {
        document.getElementById('submitQuiz').addEventListener('click', () => {
            window.location.href = 'results.html';
        });
    }

    if (document.getElementById('retryQuiz')) {
        document.getElementById('retryQuiz').addEventListener('click', () => {
            window.location.href = 'quizzes.html';
        });
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

    if (document.getElementById('resultDetails')) {
        showResults();
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
