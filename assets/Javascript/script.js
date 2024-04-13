const startButton = document.getElementById('startQuiz')
const questionContainterElement = document.getElementById('questionContainer')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answerButtons')
const quizContainer = document.getElementById('quizContainer')
const controls = document.getElementById('controls')
let time = document.getElementById('time')
let clockid = ""
const title = document.getElementById('title')
let answerchoiceA = document.getElementById('answerA')
let answerChoiceB = document.getElementById('answerB')
let answerChoiceC = document.getElementById('answerC')
let answerChoiceD = document.getElementById('answerD')
let initialContainer = document.getElementById('initialContainer')
let userScores = JSON.parse(localStorage.getItem("userScores")) || []
let initialsBtn = document.getElementById('Initials-btn')
let initialInput = document.getElementById('initial-input')
let saveHighScoreContainer = document.getElementById('highScoreContainer')
let scoreList = document.getElementById('scoreList')
let startOverBtn = document.getElementById('startOver')
let resetScores = document.getElementById('resetScores')
//Quiz questions array
let questions = [
    {
        question: "What is the correct way to declare a variable in Javascript?",
        answerA: "var x=5",
        answerB: "let x=5",
        answerC: "const x=5",
        answerD: "Both let and const",
        correctAnswer: "Both let and const",
    },

    {
        question: "Which event is triggered when an element is clicked in the browser?",
        answerA: "mouseover",
        answerB: "keydown",
        answerC: "click",
        answerD: "submit",
        correctAnswer: "click",
    },

    {
        question: "Which operator is used for strict equality in JavaScript?",
        answerA: "==",
        answerB: "===",
        answerC: "=",
        answerD: "!=",
        correctAnswer: "===",
    },

    {
        question: "Which keyword is used to declare a function in JavaScript?",
        answerA: "function",
        answerB: "method",
        answerC: "class",
        answerD: "procedure",
        correctAnswer: "function",
    },

    {
        question: "What does the acronym DOM stand for?",
        answerA: "Document Object Model",
        answerB: "Data Object Model",
        answerC: "Dynamic Object Model",
        answerD: "Dominic Toreto",
        correctAnswer: "Document Object Model",
    },
];

let timeRemaining = questions.length * 15
let index = 0
function showQuestion() {
    for (let i = 0; i < questions.length; i++) {
        console.log(questions[i])
    }
}
//Here we go! Start Quiz
function startGame() {
    startButton.style.display = "none"
    console.log("Here we go!")
    //start button hides (and the questions container appears) after it is clicked to start the game
    quizContainer.classList.remove("hide")
    controls.classList.add("hide")
    clockid = setInterval(countdown, 1000)
    showQuestions()
}
function showQuestions() {
    title.textContent = questions[index].question
    answerchoiceA.textContent = questions[index].answerA
    answerChoiceB.textContent = questions[index].answerB
    answerChoiceC.textContent = questions[index].answerC
    answerChoiceD.textContent = questions[index].answerD
}
//alerts
function checkAnswer(event) {
    let guess = event.target.textContent
    const answer = questions[index].correctAnswer;
    if (guess === answer) {
        //Display "CORRECT!"
        alert("CORRECT!");
    } else {
        // Display "Wrong!"
        alert("Wrong! -10 seconds!");
        timeRemaining = timeRemaining - 10;
    }
    index++;
    if (index < questions.length) {
        showQuestions();
    }
    else {
        stopTimer();
        quizContainer.classList.add("hide")
        initialContainer.classList.remove("hide")
    }
}
//Timer ends at 0 seconds
function stopTimer() {
    clearInterval(clockid);
}
function countdown() {
    time.textContent = timeRemaining--
    if (time === 0) {
        stopTimer();
    }
}
//Save and display scores
function saveHighScore(score) {
    const user = {
        initial: initialInput.value,
        score: time.textContent
    }
    userScores.push(user)
    localStorage.setItem("userScores", JSON.stringify(userScores));
    initialContainer.classList.add("hide");
    saveHighScoreContainer.classList.remove("hide");
    startOverBtn.classList.remove("hide")
        resetScores.classList.remove("hide")
    displayHighScore()
}
function displayHighScore() {
    scoreList.textContent = ""
    for (let i = 0; i < userScores.length; i++) {
        var li = document.createElement("li")
        li.textContent = userScores[i].initial + " - " + userScores[i].score
        scoreList.appendChild(li);
    }
}
startOverBtn.addEventListener("click", function () {
    location.reload();
});
resetScores.addEventListener("click", function () {
    userScores = [];
    localStorage.removeItem("userScores");
    displayHighScore(); // Update the high score display
});
startButton.addEventListener('click', startGame)
answerchoiceA.addEventListener("click", answerchoiceA)
answerChoiceB.addEventListener("click", answerChoiceB)
answerChoiceC.addEventListener("click", answerChoiceC)
answerChoiceD.addEventListener("click", answerChoiceD)
answerButtonsElement.addEventListener("click", checkAnswer)
initialsBtn.addEventListener("click", saveHighScore)
startOverBtn.addEventListener("click", startOverBtn)
resetScores.addEventListener("click", resetScores)