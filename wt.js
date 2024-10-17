
let quizData = [];

async function fetchQuizQuestions() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple');
        const data = await response.json();
        quizData = data.results.map((item, index) => ({
            question: item.question,
            options: [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5),
            answer: item.correct_answer
        }));
        loadQuiz();
    } catch (error) {
        console.error("Error fetching quiz questions:", error);
    }
}

const quizContainer = document.getElementById("quiz");

function loadQuiz() {
    quizContainer.innerHTML = "";
    quizData.forEach((quizItem, index) => {
        const questionElement = document.createElement("div");
        questionElement.className = "question";
        questionElement.innerHTML = `<p>${index + 1}. ${quizItem.question}</p>`;

        quizItem.options.forEach(option => {
            const optionElement = document.createElement("div");
            optionElement.className = "option";
            optionElement.innerHTML = `
                <input type="radio" name="question${index}" value="${option}">
                ${option}
            `;
            questionElement.appendChild(optionElement);
        });

        quizContainer.appendChild(questionElement);
    });
}

function submitQuiz() {
    let score = 0;
    quizData.forEach((quizItem, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && selectedOption.value === quizItem.answer) {
            score++;
        }
    });

    const resultElement = document.getElementById("result");
    resultElement.innerText = `Your score: ${score}/${quizData.length}`;
}

fetchQuizQuestions();