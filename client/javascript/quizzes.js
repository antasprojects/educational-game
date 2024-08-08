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
    let rightAnswers = [];
    let resultsData;
    let score = 0
    const correctAnswersHelper = [];
    const selectedHelper = [];
    const token = localStorage.getItem('token')
    const decodedToken = jwt_decode(token);
    console.log(decodedToken);
    console.log(decodedToken.id);

    

    function showSection(sectionId) {
        document.querySelectorAll('main > section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(sectionId).classList.remove('hidden');
    }

    subjectButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedSubject = button.dataset.subject;
            console.log("dataset subject", button);
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
            localStorage.setItem("subject", selectedSubject);
            localStorage.setItem("level", selectedLevel);
            localStorage.setItem("quizGroup", selectedQuiz);
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
    
    function loadQuiz(datas) {
        datas.map(data => {
            correctAnswersHelper.push({
                question_id: data.id,
                answer: data.answer
            })
        });
        console.log("helper", correctAnswersHelper);
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
            rightAnswers.push(data.answer)
            quizSectionDiv.appendChild(questionElement);
    })
    
}; 
    submitQuizButton.addEventListener('click', () => {
    // Here you handle quiz submission
    console.log('Quiz submitted');
    // You can add code here to process the answers and show results
    
    document.querySelectorAll('.question').forEach((questionDiv, i) => {
        const answers = {};
        const questionId = questionDiv.querySelector('input[type="radio"]').name.split('_')[1];
        const selectedOption = questionDiv.querySelector('input[type="radio"]:checked');
        console.log("selectOption " + String(i) + ".", selectedOption.value);
        console.log("question", questionId)
        selectedHelper.push({
            question_id: questionId,
            answer: selectedOption.value
        });
        console.log("selectedDone", selectedHelper);
        updateResult();
        
    });
    async function updateResult() {
        try {

            const scores = correctAnswersHelper.map((data, index) => {
                return {
                    question_id: data.question_id,
                    user_id: decodedToken.id,
                    score: data.answer === selectedHelper[index].answer ? 1 : 0
                }
            });

            console.log("SCORES", scores);

            resultsData = await Promise.all(scores.map(async data => {
                const body = {
                    question_id: data.question_id,
                    score: data.score,
                    user_id: data.user_id
                }

                const option = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body),

                }
                const response = await fetch(`http://localhost:3000/results`, option);

                if (response.ok) {
                    const res = await response.json();
                    console.log(res);
                    return res.data;
                }
            }));

            localStorage.setItem("resultUpdate", resultsData[0].updated_at);
            localStorage.setItem("maxScore", String(resultsData.length));

            window.location.assign(window.location.origin + "/results.html");

        } catch (error) {
            console.log('Error updating results:', error);
        }
    }
});
});


// user_id, subject, level, group_num, update_at