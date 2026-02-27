"use strict";

// DOM Elements
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.querySelectorAll(".question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const gameQuestions =  [
    {
        question: "나라__ 오시다",
        answers: [
            {text: "에", correct:false},
            {text: "를", correct:false},
            {text: "가", correct:false},
            {text: "에서", correct:true}
        ]
    },
    {
        question: "단어__ 위우다",
        answers: [
            {text: "가", correct:false},
            {text: "를", correct:true},
            {text: "한테", correct:false},
            {text: "는", correct:false}
        ]
    },
    {
        question: "식당__ 하다",
        answers: [
            {text: "은", correct:false},
            {text: "에", correct:false},
            {text: "을", correct:true},
            {text: "이", correct:false}
        ]
    },
    {
        question: "회사__ 들어가다",
        answers: [
            {text: "에", correct:true},
            {text: "에서", correct:false},
            {text: "를", correct:false},
            {text: "가", correct:false}
        ]
    },
    {
        question: "눈__ 뜨다",
        answers: [
            {text: "이", correct:false},
            {text: "을", correct:true},
            {text: "에", correct:false},
            {text: "은", correct:false}
        ]
    },
    {
        question: "화__ 나다",
        answers: [
            {text: "는", correct:false},
            {text: "의", correct:false},
            {text: "를", correct:false},
            {text: "가", correct:true}
        ]
    },
    {
        question: "수업__ 듣다",
        answers: [
            {text: "에서", correct:false},
            {text: "에", correct:false},
            {text: "을", correct:true},
            {text: "이", correct:false}
        ]
    },
    {
        question: "학교__ 다니다",
        answers: [
            {text: "를", correct:false},
            {text: "에", correct:true},
            {text: "에서", correct:false},
            {text: "가", correct:false}
        ]
    },
    {
        question: "낸장고__ 고장나다",
        answers: [
            {text: "가", correct:true},
            {text: "를", correct:false},
            {text: "는", correct:false},
            {text: "에", correct:false}
        ]
    },
    {
        question: "이__ 닦다",
        answers: [
            {text: "에", correct:false},
            {text: "에서", correct:false},
            {text: "가", correct:false},
            {text: "를", correct:true}
        ]
    }];

//GAME STATE VARS

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = gameQuestions.length;
maxScoreSpan.textContent = gameQuestions.length;

// event listeners

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);

function startGame() {
    // reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;
    startScreen.classList.remove("active");
    gameScreen.classList.add("active");
    showQuestion();
}

function showQuestion() {
    //reset state
    answersDisabled = false;
    const currentQuestion = gameQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / gameQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.forEach((div)=>{
        if(div.textContent.trim() !== currentQuestion.question){
            div.textContent = currentQuestion.question;
        }
    });

    answersContainer.innerHTML = "";
    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.classList.add("answer-btn");
        button.textContent = answer.text;

        // Using dataset property of the button element 
        // that allows you to custom data (custom data)
        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    });
}

function selectAnswer (event) {
    if (answersDisabled) return;

    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach((button) =>{
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });

    if (isCorrect){
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(()=>{
        currentQuestionIndex++;
        if(currentQuestionIndex < gameQuestions.length){
            showQuestion();
        }else{
            showResults()
        }
    },1000)
}

function showResults() {
    gameScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score/gameQuestions.length) * 100;

    if (percentage === 100){
        resultMessage.textContent = "완벽한 점수! 짱이다";
    }
    else if (percentage >= 75){
        resultMessage.textContent = "정말 잘하고 있어요! 수고했어요";
    }
    else if (percentage >= 50){
        resultMessage.textContent = "좋은 노력이에요! 더 잘해 보세요";
    }
    else if (percentage >= 25){
        resultMessage.textContent = "괜찮아요! 다시 해 보세요";
    }
    else {
        resultMessage.textContent = "계석 공부하세요, 다음에 더 잘할 수 있어요";
    }
}

function restartGame() {
    resultScreen.classList.remove("active");
    startGame();
}