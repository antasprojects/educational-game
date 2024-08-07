
document.addEventListener('DOMContentLoaded', () => {
    const subjectButtons = document.querySelectorAll('.subject-btn');
    const levelButtons = document.querySelectorAll('.level-btn');
    const quizButtons = document.querySelectorAll('.quiz-btn');
    const quizzesSection = document.getElementById('quizzes');
    const quizLevelSection = document.getElementById('quiz-level');
    const quizSelectionSection = document.getElementById('quiz-selection');

    const quizSection = document.getElementById('quiz');
    const submitQuizButton = document.getElementById('submitquiz');
    const quizSectionDiv = document.getElementById('questions');   

    let selectedSubject = '';
    let selectedLevel = '';
    let selectedQuiz = '';

    function showSection(sectionId) {
        document.querySelectorAll('main > section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(sectionId).classList.remove('hidden');
    }

    subjectButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedSubject = button.dataset.subject;
            showSection('quiz-level');
        });
    });

    levelButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedLevel = button.dataset.level;
            showSection('quiz-selection');
        });
    });

    quizButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedQuiz = button.dataset.quiz;
            fetchQuizData(selectedSubject, selectedLevel, selectedQuiz);
        });
    });
    async function fetchQuizData(selectedSubject, selectedLevel, selectedQuiz) {
        try {
            const respData = await fetch(`http://localhost:3000/questions/quizdata/${selectedQuiz}?subject=${selectedSubject}&level=${selectedLevel}`);
           if (respData.ok) {
                const data = await respData.json();
                loadQuiz(data);
            } else {
                throw "Something has gone wrong with one of the API requests";
            }
        } catch (e) {
            console.log(e);
        }
    }
    submitQuizButton.addEventListener('click', () => {
        // Here you handle quiz submission
        console.log('Quiz submitted');
        // You can add code here to process the answers and show results
    });

    function loadQuiz(datas) {
        quizSectionDiv.innerHTML = '';
        showSection('quiz');
        datas.forEach(data => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');

            const questionText = document.createElement('p');
            questionText.textContent = `Question: ${data.question}`;
            questionElement.appendChild(questionText);

            ['option_1', 'option_2', 'option_3', 'option_4'].forEach(option => {
                const optionLabel = document.createElement('label');
                const optionInput = document.createElement('input');
                optionInput.type = 'radio';
                optionInput.name = `question_${data.id}`;
                optionInput.value = data[option];
                optionLabel.appendChild(optionInput);
                optionLabel.appendChild(document.createTextNode(data[option]));
                questionElement.appendChild(optionLabel);
                questionElement.appendChild(document.createElement('br'));
            });
            quizSectionDiv.appendChild(questionElement);
    })
    
}; 
});

