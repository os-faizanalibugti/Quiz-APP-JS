const currentQuestionNumber = document.querySelector(
  ".current-question-number"
);
const totalQuestions = document.querySelector(".total-questions");
const score = document.querySelector(".score");
const question = document.querySelector(".question");
const optionsEl = document.querySelector(".options");
const nextQuestionEl = document.querySelector(".next-question");

// Stores API data
let state = {
  currentQuestionNumber: 1,
  totalQuestions: undefined,
  score: 0,
  currentQuestion: undefined,
  options: [],
  triviaQuestions: [],
};

nextQuestionEl.addEventListener("click", () => {
  state.currentQuestionNumber++;

  generateState();

  renderQuestion();

  console.log(state);
});

optionsEl.addEventListener("click", (event) => {
  const userResponse = event.target.innerText;

  state.triviaQuestions = state.triviaQuestions.map((question, index) => {
    if (index === (state.currentQuestionNumber - 1)) {
      return {
        ...question,
        response: userResponse,
      };
    } else {
      return {
        ...question
      }
    }
  });

  console.log(state);
});

function renderQuestion() {
  currentQuestionNumber.innerText = state.currentQuestionNumber;
  totalQuestions.innerText = state.totalQuestions;
  score.innerText = state.score;

  question.innerText = state.currentQuestion;

  const options = state.options;

  optionsEl.innerHTML = "";

  options.map((option, index) => {
    optionsEl.innerHTML += `<button>${option}</button>`;
  });
}

async function fetchData() {
  try {
    const questions = await fetch("https://the-trivia-api.com/api/questions/");

    let data = await questions.json();

    state.triviaQuestions = data;

    console.log("API Data", state.triviaQuestions);

    console.log("Mapped Questions", mapQuestions(state.triviaQuestions));

    generateState();

    renderQuestion();
  } catch (error) {
    console.log(error);
  }
}

// {
//     "category": "Film & TV",
//     "id": "62573f569da29df7b05f7396",
//     "correctAnswer": "Back to the Future",
//     "incorrectAnswers": [
//         "The Truman Show",
//         "Raiders of the Lost Ark",
//         "Forrest Gump"
//     ],
//     "question": "Name the movie that matches the following plot summary: 'A high school student is sent thirty years into the past in a time-traveling car.'",
//     "tags": [
//         "film",
//         "film_and_tv"
//     ],
//     "type": "Multiple Choice",
//     "difficulty": "easy",
//     "regions": [],
//     "isNiche": false
// }

/**
 * Not being used by the app. For demonstration purpose only
 */
function mapQuestions(questions) {
  return questions.map((question) => {
    return {
      question: question.question,
      options: [...question.incorrectAnswers, question.correctAnswer],
    };
  });
}

function generateState() {
  state = {
    ...state,
    totalQuestions: state.triviaQuestions.length,
    currentQuestion:
      state.triviaQuestions[state.currentQuestionNumber - 1].question,
    options: [
      ...state.triviaQuestions[state.currentQuestionNumber - 1]
        .incorrectAnswers,
      state.triviaQuestions[state.currentQuestionNumber - 1].correctAnswer,
    ],
  };
}

fetchData();
