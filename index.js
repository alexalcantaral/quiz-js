const $startGameButton = document.querySelector(".start-quiz");
const $questionsContainer = document.querySelector(".questions-container");
const $answersContainer = document.querySelector(".answers-container");
const $questionText = document.querySelector(".question");
const $nextQuestionButton = document.querySelector(".next-question");

$startGameButton.addEventListener("click", startGame);
$nextQuestionButton.addEventListener("click", displayNextQuestion);

let currentQuestionIndex = 0;
let totalCorrect = 0;

function startGame(){
    $startGameButton.classList.add("hide");
    $questionsContainer.classList.remove("hide");
    displayNextQuestion();
}

function displayNextQuestion(){
    resetState();

    if(questions.length === currentQuestionIndex){
        return finishGame();
    }

    $questionText.textContent = questions[currentQuestionIndex].question;
    questions[currentQuestionIndex].answers.forEach(answer =>{
        const newAnswer = document.createElement("button");
        newAnswer.classList.add("button", "answer");
        newAnswer.textContent = answer.text;
        if(answer.correct){
            newAnswer.dataset.correct = answer.correct;
        }
        $answersContainer.appendChild(newAnswer);

        newAnswer.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    while($answersContainer.firstChild){
        $answersContainer.removeChild($answersContainer.firstChild);
    }

    document.body.removeAttribute("class");
    $nextQuestionButton.classList.add("hide");
}

function selectAnswer(event){
    const answerClicked = event.target;

    if(answerClicked.dataset.correct){
        document.body.classList.add("correct");
        totalCorrect++;
    }
    else{
        document.body.classList.add("incorrect");
    }

    document.querySelectorAll(".answer").forEach(button => {
        if(button.dataset.correct){
            button.classList.add("correct");
        }
        else{
            button.classList.add("incorrect");
        }

        button.disabled = true;
    })
    $nextQuestionButton.classList.remove("hide");
    currentQuestionIndex++;
}

function finishGame(){
    const totalQuestions = questions.length;
    const performance = Math.floor(totalCorrect *100 / totalQuestions);

    let messege = "";

    switch(true){
        case(performance >= 90):
            message = "Excelente :)"; break;
        case(performance >= 70):
            message = "Muito bom :)"; break;
        case(performance >= 50):
            message = "Bom"; break;
        default:
            message = "Pode melhorar :("
    }

    $questionsContainer.innerHTML =
    `
        <p class="final-message">
            Você acertou ${totalCorrect} de ${totalQuestions} questões!
            <span>Resultado: ${message}</span>
        </p>
        <button onclick=window,location.reload() class="button">
            Refazer teste
        </button>
    `
}

const questions = [
    {
        question: "Dentro de qual elemento HTML colocamos o JavaScript?",
        answers:[
            {text: "<javascript>", correct: false},
            {text: "<js>", correct: false},
            {text: "<script>", correct: true},
            {text: "<scripiting>", correct: false},
        ]
    },
    {
        question: "Onde é o lugar correto para adicionar o JavaScript?",
        answers:[
            {text: "Tanto no <head> quanto no <body> está correto", correct: true},
            {text: "No <body>", correct: false},
            {text: "No <head>", correct: false},
            {text: "Em outro lugar", correct: false},
        ]
    },
    {
        question: "O que é JavaScript?",
        answers:[
            {text: "Uma linguagem de marcação", correct: false},
            {text: "Uma linguagem de programação", correct: true},
            {text: "Um banco de dados", correct: false},
            {text: "Um sistema operacional", correct: false},
        ]
    },
    {
        question: "O que significa NaN em JavaScript?",
        answers:[
            {text: "Not a Number", correct: true},
            {text: "Not a Null", correct: false},
            {text: "No Action Needed", correct: false},
            {text: "None of the Above", correct: false},
        ]
    },
    {
        question: "Qual é a saída do código console.log(2 + '2');?",
        answers:[
            {text: "4", correct: false},
            {text: "22", correct: true},
            {text: "NaN", correct: false},
            {text: "Erro", correct: false},
        ]
    },
    {
        question: "Como você pode verificar o tipo de uma variável em JavaScript?",
        answers:[
            {text: "typeof", correct: true},
            {text: "varType", correct: false},
            {text: "getType", correct: false},
            {text: "checkType", correct: false},
        ]
    },
    {
        question: "Qual das seguintes opções não é uma estrutura de controle em JavaScript?",
        answers:[
            {text: "for", correct: false},
            {text: "while", correct: false},
            {text: "loop", correct: true},
            {text: "Nenhuma das alternativas", correct: false},
        ]
    }
]