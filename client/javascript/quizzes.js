document.addEventListener('DOMContentLoaded', () => {
    const subjectButtons = document.querySelectorAll('.subject-btn');
    const levelButtons = document.querySelectorAll('.level-btn');
    const quizButtons = document.querySelectorAll('.quiz-btn');
    const quizzesSection = document.getElementById('quizzes');
    const quizLevelSection = document.getElementById('quiz-level');
    const quizSelectionSection = document.getElementById('quiz-selection');
    const quizSection = document.getElementById('quiz');
    const submitQuizButton = document.getElementById('submitquiz');

    let selectedSubject = '';
    let selectedLevel = '';
    let selectedQuiz = '';

    subjectButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedSubject = button.dataset.subject;
            quizzesSection.classList.add('hidden');
            quizLevelSection.classList.remove('hidden');
        });
    });

    levelButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedLevel = button.dataset.level;
            quizLevelSection.classList.add('hidden');
            quizSelectionSection.classList.remove('hidden');
        });
    });

    quizButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedQuiz = button.dataset.quiz;
            loadQuiz(selectedSubject, selectedLevel, selectedQuiz);
        });
    });

    submitQuizButton.addEventListener('click', () => {
        // Here you handle quiz submission
        console.log('Quiz submitted');
        // You can add code here to process the answers and show results
    });

    function loadQuiz(subject, level, quizNumber) {
        // Here you need to fetch the quiz data from a server
        // For this example, we'll just display a message
        quizSelectionSection.classList.add('hidden');
        quizSection.classList.remove('hidden');
        document.getElementById('questions').innerHTML = `
            <p>Loading ${subject} quiz, level: ${level}, quiz number: ${quizNumber}</p>
            <p>Quiz questions would be displayed here.</p>
        `;
    }
});
