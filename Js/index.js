//variaveis

const $startGameButton = document.querySelector(".start-quiz");
const $questionsContainer = document.querySelector(".questions-container");
const $answersContainer = document.querySelector(".answers-container");
const $questionText = document.querySelector(".question");
const $nextQuestionButton = document.querySelector(".next-question");
const $infoQuestion = document.querySelector(".infoQuestion");
const $numeroQuestoes = document.querySelector("#numeroQuestoes");
const $acertos = document.querySelector("#acertos");
const $tituloInicio = document.querySelector("#tituloInicio");
const $resultados = document.querySelector(".resultados");
//const $ = document.querySelector("");

let currentQuestionIndex = 0;
let totalCorrect = 0;
let totalQuestoessRespondidas = 0;
localStorage.getItem("questoesRespondidas") !== null
  ? JSON.parse(localStorage.getItem("questoesRespondidas"))
  : [];
let questions = [];

//eventos

$startGameButton.addEventListener("click", startGame);
$nextQuestionButton.addEventListener("click", displayNextQuestion);
$resultados.addEventListener("click",)
window.addEventListener("DOMContentLoaded", fetchJSON);

//funcoes

function 

async function fetchJSON() {
  try {
    let data = await fetch("./data/questions.json");

    let dados = await data.json();
    questions = dados.slice(0, 10);
  } catch (error) {
    console.log(error);
  }
}

function startGame() {
  $startGameButton.classList.add("hide");
  $questionsContainer.classList.remove("hide");
  $infoQuestion.style.display = "flex";
  $tituloInicio.classList.add("hide");
  $resultados.classList.add("hide");
  displayNextQuestion();
}

function displayNextQuestion() {
  resetState();

  if (questions.length === currentQuestionIndex) {
    return finishGame();
  }

  $numeroQuestoes.textContent = `${currentQuestionIndex + 1}/${
    questions.length
  }`;
  $questionText.textContent = questions[currentQuestionIndex].question;
  questions[currentQuestionIndex].options.forEach((answer) => {
    const newAnswer = document.createElement("button");
    newAnswer.classList.add("button", "answer");
    newAnswer.textContent = answer;
    if (questions[currentQuestionIndex].answer === answer) {
      newAnswer.dataset.correct = questions[currentQuestionIndex].answer;
    }
    $answersContainer.appendChild(newAnswer);

    newAnswer.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  while ($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild);
  }

  document.body.removeAttribute("class");
  $nextQuestionButton.classList.add("hide");
}

function selectAnswer(event) {
  const answerClicked = event.target;

  if (answerClicked.dataset.correct) {
    totalCorrect++;
    $acertos.textContent = `Acertos : ${totalCorrect}`;
  }

  document.querySelectorAll(".answer").forEach((button) => {
    if (button.dataset.correct) {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }

    button.disabled = true;
  });
  $nextQuestionButton.classList.remove("hide");
  currentQuestionIndex++;
}

function finishGame(container, acertos, totalQuestions) {

    container.innerHTML = "";

    const 

  $questionsContainer.innerHTML = `
        <p class="final-message">
            Você acertou ${totalCorrect} de ${totalQuestions} questões!
            <span>Resultado: ${message}</span>
        </p>
        <button onclick=window,location.reload() class="button">
            Refazer teste
        </button>
    `;
}
