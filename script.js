const container = document.getElementById("container");
const rgbValue = document.getElementById("rgb-value");
const questionNumber = document.getElementById("question-number");
const nextButton = document.getElementById("next-button");

const startScreen = document.querySelector(".start-screen");
const startButton = document.getElementById("start-button");

const scoreContainer = document.querySelector(".score-container");
const userScore = document.getElementById("user-score");
const restartButton = document.getElementById("restart");

const timerDisplay = document.getElementById("time");

let correctColor;
let score = 0;
let currentQuestion = 1;
let timer;
let timeLeft = 10;

const totalQuestions = 10;

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}

function startTimer() {
  clearInterval(timer);

  timeLeft = 10;
  timerDisplay.innerText = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      disableOptions();
    }
  }, 1000);
}

function disableOptions() {
  let options = document.querySelectorAll(".option-div");

  options.forEach((button) => {
    button.disabled = true;

    if (button.style.backgroundColor === correctColor) {
      button.classList.add("correct");
    }
  });
}

function createQuestion() {
  container.innerHTML = "";

  startTimer();

  let colors = [];

  for (let i = 0; i < 4; i++) {
    colors.push(randomColor());
  }

  correctColor = colors[Math.floor(Math.random() * 4)];

  rgbValue.innerText = correctColor.toUpperCase();

  colors = shuffleArray(colors);

  colors.forEach((color) => {
    let button = document.createElement("button");

    button.classList.add("option-div");

    button.style.backgroundColor = color;

    button.addEventListener("click", () => checkAnswer(button, color));

    container.appendChild(button);
  });

  questionNumber.innerText = currentQuestion;
}

function checkAnswer(button, color) {
  clearInterval(timer);

  let options = document.querySelectorAll(".option-div");

  options.forEach((btn) => (btn.disabled = true));

  if (color === correctColor) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("incorrect");

    options.forEach((btn) => {
      if (btn.style.backgroundColor === correctColor) {
        btn.classList.add("correct");
      }
    });
  }
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

nextButton.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion > totalQuestions) {
    endGame();
  } else {
    createQuestion();
  }
});

function endGame() {
  scoreContainer.classList.remove("hide");

  userScore.innerHTML = `
    Your Score: <b>${score}</b> / ${totalQuestions}
  `;
}

startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");

  score = 0;
  currentQuestion = 1;

  createQuestion();
});

restartButton.addEventListener("click", () => {
  scoreContainer.classList.add("hide");

  score = 0;
  currentQuestion = 1;

  createQuestion();
});