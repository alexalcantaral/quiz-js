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
const $audioErro = document.querySelector("#audioErro");
const $audioAcerto = document.querySelector("#audioAcerto");

export class Quiz {
  constructor(currentQuestionIndex, totalQuestoesRespondidas) {
    this.currentQuestionIndex = currentQuestionIndex;
    this.totalCorrect = 0;
    this.totalQuestoesRespondidas = totalQuestoesRespondidas;
    this.questions = [];
  }

  startGame() {
    $startGameButton.classList.add("hide");
    $questionsContainer.classList.remove("hide");
    $infoQuestion.style.display = "flex";
    $tituloInicio.classList.add("hide");
    $resultados.classList.add("hide");
    this.displayNextQuestion();
  }

  displayNextQuestion() {
    $answersContainer.innerHTML = "";
    $nextQuestionButton.classList.add("hide");

    if (this.questions.length === this.currentQuestionIndex) {
      $infoQuestion.style.display = "none";
      return this.finishGame(
        $questionsContainer,
        this.totalCorrect,
        this.questions.length
      );
    }

    $numeroQuestoes.textContent = `${this.currentQuestionIndex + 1}/${
      this.questions.length
    }`;

    $questionText.textContent =
      this.questions[this.currentQuestionIndex].question;

    this.questions[this.currentQuestionIndex].options.forEach((answer) => {
      const newAnswer = document.createElement("button");
      newAnswer.classList.add("button", "answer");
      newAnswer.textContent = answer;

      if (this.questions[this.currentQuestionIndex].answer === answer) {
        newAnswer.dataset.correct =
          this.questions[this.currentQuestionIndex].answer;
      }

      $answersContainer.appendChild(newAnswer);

      newAnswer.addEventListener("click", (event) => {
        this.selectAnswer(event);
      });
    });
  }

  selectAnswer(event) {
    const answerClicked = event.target;

    if (answerClicked.dataset.correct) {
      $audioAcerto.play();
      this.totalCorrect++;

      localStorage.setItem(
        "acertos",
        localStorage.getItem("acertos") !== null
          ? `${Number(localStorage.getItem("acertos")) + 1}`
          : "1"
      );

      $acertos.textContent = `Acertos : ${this.totalCorrect}`;
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

    this.totalQuestoesRespondidas.push(
      this.questions[this.currentQuestionIndex]
    );

    this.currentQuestionIndex++;
  }

  finishGame(container, acertos, totalQuestions) {
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
          acertos === 0
            ? "nenhum%20acerto"
            : acertos === 1
            ? "acerto"
            : "acertos"
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
}
