//importando arquivos

import { Quiz } from "./POO/quiz.js";
import { fetchJSON } from "./functions/fetchJSON.js";

//variaveis DOM

const $startGameButton = document.querySelector(".start-quiz");
const $nextQuestionButton = document.querySelector(".next-question");
const $resultados = document.querySelector(".resultados");
const $container = document.querySelector(".container");
//const $ = document.querySelector("");

//variaveis

let currentQuestionIndex =
  localStorage.getItem("currentQuestion") !== null
    ? Number(localStorage.getItem("currentQuestion"))
    : 0;
let totalQuestoesRespondidas =
  localStorage.getItem("questoesRespondidas") !== null
    ? JSON.parse(localStorage.getItem("questoesRespondidas"))
    : [];

let myQuiz = new Quiz(currentQuestionIndex, totalQuestoesRespondidas);

//eventos

$startGameButton.addEventListener("click", () => {
  myQuiz.startGame();
});

$nextQuestionButton.addEventListener("click", () => {
  myQuiz.displayNextQuestion();
});

$resultados.addEventListener("click", () => {
  myQuiz.finishGame(
    $container,
    localStorage.getItem("acertos") !== null
      ? Number(localStorage.getItem("acertos"))
      : 0,
    myQuiz.totalQuestoesRespondidas.length
  );
});

window.addEventListener("DOMContentLoaded", async () => {
  myQuiz.questions = await fetchJSON();
});

window.addEventListener("beforeunload", () => {
  if (myQuiz.currentQuestionIndex === 10) {
    localStorage.setItem("lastUpdate", new Date().toISOString());
    localStorage.setItem("currentQuestion", `${0}`);
  } else {
    localStorage.setItem("currentQuestion", `${myQuiz.currentQuestionIndex}`);
  }

  localStorage.setItem(
    "questoesRespondidas",
    JSON.stringify(myQuiz.totalQuestoesRespondidas)
  );
});
