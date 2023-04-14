const currentQuestionNumber = document.querySelector(
  ".current-question-number"
);
const totalQuestions = document.querySelector(".total-questions");
const score = document.querySelector(".score");
const question = document.querySelector(".question");
const optionsEl = document.querySelector(".options");
const nextQuestionEl = document.querySelector(".next-question");

// Stores API data
let triviaQuestions = [];

let state = {
  currentQuestionNumber: 1,
  totalQuestions: undefined,
  score: 0,
  currentQuestion: undefined,
  options: [],
};

function renderQuestion() {
  currentQuestionNumber.innerText = state.currentQuestionNumber;
  totalQuestions.innerText = state.totalQuestions;
  score.innerText = state.score;

  question.innerText = state.currentQuestion;

  const options = state.options;

  options.map((option) => {
    optionsEl.innerHTML += `<button>${option}</button>`;
  });
}

async function fetchData() {
  try {
    const questions = await fetch("https://the-trivia-api.com/api/questions/");

    let data = await questions.json();

    triviaQuestions = data;

    console.log('API Data', triviaQuestions);

    console.log('Mapped Questions', mapQuestions(triviaQuestions))

    generateState(triviaQuestions);

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

function generateState(triviaQuestions) {
  state = {
    ...state,
    totalQuestions: triviaQuestions.length,
    currentQuestion: triviaQuestions[state.currentQuestionNumber - 1].question,
    options: [
      ...triviaQuestions[state.currentQuestionNumber - 1].incorrectAnswers,
      triviaQuestions[state.currentQuestionNumber - 1].correctAnswer,
    ],
  };
}

fetchData();
