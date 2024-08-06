document.addEventListener("DOMContentLoaded", () => {
    function showSection(sectionId) {
        document.querySelectorAll('main > section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(sectionId).classList.remove('hidden');
    }

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

    document.getElementById('logout').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});
