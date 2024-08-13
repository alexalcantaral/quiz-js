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
const $container = document.querySelector(".container");
const $audioErro = document.querySelector("#audioErro");
const $audioAcerto = document.querySelector("#audioAcerto");
//const $ = document.querySelector("");

let currentQuestionIndex =
  localStorage.getItem("currentQuestion") !== null
    ? Number(localStorage.getItem("currentQuestion"))
    : 0;
let totalCorrect = 0;
let totalQuestoesRespondidas =
  localStorage.getItem("questoesRespondidas") !== null
    ? JSON.parse(localStorage.getItem("questoesRespondidas"))
    : [];
let questions = [];

//eventos

$startGameButton.addEventListener("click", startGame);
$nextQuestionButton.addEventListener("click", displayNextQuestion);
$resultados.addEventListener("click", () => {
  finishGame(
    $container,
    localStorage.getItem("acertos") !== null
      ? Number(localStorage.getItem("acertos"))
      : 0,
    totalQuestoesRespondidas.length
  );
});
window.addEventListener("DOMContentLoaded", fetchJSON);
window.addEventListener("beforeunload", () => {
  if (currentQuestionIndex === 10) {
    localStorage.setItem("lastUpdate", new Date().toISOString());
    localStorage.setItem("currentQuestion", `${0}`);
  } else {
    localStorage.setItem("currentQuestion", `${currentQuestionIndex}`);
  }

  localStorage.setItem(
    "questoesRespondidas",
    JSON.stringify(totalQuestoesRespondidas)
  );
});

//funcoes

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
    $infoQuestion.style.display = "none";
    return finishGame($questionsContainer, totalCorrect, questions.length);
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
    $audioAcerto.play();
    totalCorrect++;
    localStorage.setItem("acertos", `${totalCorrect}`);
    $acertos.textContent = `Acertos : ${totalCorrect}`;
  } else {
    $audioErro.play();
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
  totalQuestoesRespondidas.push(questions[currentQuestionIndex]);
  currentQuestionIndex++;
}

function finishGame(container, acertos, totalQuestions) {
  container.innerHTML = "";

  const divResultado = document.createElement("div");
  divResultado.className = "divResultado";

  const titulo = document.createElement("h1");
  titulo.textContent = "Resultado";

  const tituloAcertos = document.createElement("p");
  tituloAcertos.className = "final-message";
  tituloAcertos.textContent = `Acertos`;

  const qtdAcertos = document.createElement("strong");
  qtdAcertos.textContent = `${acertos}`;

  const tituloQtdQuestoes = document.createElement("p");
  tituloQtdQuestoes.className = "final-message";
  tituloQtdQuestoes.textContent = `Questões totais`;

  const qtdQuestoes = document.createElement("strong");
  qtdQuestoes.textContent = `${totalQuestions}`;

  const divBtnResultado = document.createElement("div");
  divBtnResultado.className = "divBtnResultado";

  const btnSair = document.createElement("button");
  btnSair.className = "button";
  btnSair.textContent = "Sair do quiz";
  btnSair.addEventListener("click", () => {
    window.location.reload();
  });

  const btnCompartilhar = document.createElement("button");
  btnCompartilhar.className = "button";
  btnCompartilhar.textContent = "Compartilhar";
  btnCompartilhar.addEventListener("click", () => {
    window.open(
      `https://twitter.com/intent/tweet?text=Meu%20resultado%20no%20quiz%20:%20${
        acertos > 0 ? acertos : ""
      }%20${
        acertos === 0 ? "nenhum%20acerto" : acertos === 1 ? "acerto" : "acertos"
      }%20de%20${totalQuestions}%20questões.%20Vejam%20quanto%20vocês%20conseguem%20&url=https://project-quiz-three.vercel.app/`,
      "_blank"
    );
  });

  const iconeTwitter = document.createElement("i");
  iconeTwitter.className = "bx bxl-twitter";

  divResultado.appendChild(titulo);
  divResultado.appendChild(tituloAcertos);
  divResultado.appendChild(qtdAcertos);
  divResultado.appendChild(tituloQtdQuestoes);
  divResultado.appendChild(qtdQuestoes);
  btnCompartilhar.appendChild(iconeTwitter);
  divBtnResultado.appendChild(btnCompartilhar);
  divBtnResultado.appendChild(btnSair);
  divResultado.appendChild(divBtnResultado);

  container.appendChild(divResultado);
}
