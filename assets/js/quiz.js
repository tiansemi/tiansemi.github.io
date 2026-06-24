"use strict";

let quizData = [];
let selectedQuizData = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;
let correctionMode = false;

const startScreen = document.getElementById("quiz-start");
const questionsScreen = document.getElementById("quiz-questions");
const resultsScreen = document.getElementById("quiz-results");
const startBtn = document.getElementById("start-quiz-btn");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");
const questionContainer = document.getElementById("question-container");
const currentQuestionEl = document.getElementById("current-question");
const totalQuestionsEl = document.getElementById("total-questions");
const progressFill = document.getElementById("progress-fill");
const quizContentBaseUrl = new URL("../../pages/quiz/", window.location.href);

// Fonction pour mélanger un tableau (algorithme de Fisher-Yates)
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Charger les questions depuis le fichier JSON
async function loadQuestions() {
  try {
    const response = await fetch(new URL("questions1-20.json", quizContentBaseUrl));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    quizData = await response.json();
    return true;
  } catch (error) {
    console.error("Erreur lors du chargement des questions:", error);
    return false;
  }
}

function getCurrentLanguage() {
  const langSelector = document.querySelector("#lang");
  return langSelector ? langSelector.value : "fr";
}

function startQuiz() {
  startScreen.style.display = "none";
  questionsScreen.style.display = "block";
  resultsScreen.style.display = "none";
  currentQuestionIndex = 0;
  userAnswers = [];
  score = 0;
  correctionMode = false;
  totalQuestionsEl.textContent = selectedQuizData.length;
  displayQuestion();
}

function displayQuestion() {
  const question = selectedQuizData[currentQuestionIndex];
  const lang = getCurrentLanguage();
  const questionText = lang === "en" ? question.questionEn : question.questionFr;

  currentQuestionEl.textContent = currentQuestionIndex + 1;
  progressFill.style.width = ((currentQuestionIndex + 1) / selectedQuizData.length) * 100 + "%";

  let html = `<div class="question"><h3 class="question-text">${questionText}</h3>`;
  
  // Ajouter l'image si elle existe
  if (question.image_path) {
    html += `<div class="question-image">
              <img src="${new URL(question.image_path, quizContentBaseUrl).href}" alt="Question ${question.id}" />
            </div>`;
  }

  if (question.type === "true-false") {
    html += `<div class="options-container true-false">`;
    html += `<label class="option-label">
              <input type="radio" name="answer" value="true" ${userAnswers[currentQuestionIndex] === true ? "checked" : ""}>
              <span class="option-text">${lang === "en" ? "True" : "Vrai"}</span>
            </label>`;
    html += `<label class="option-label">
              <input type="radio" name="answer" value="false" ${userAnswers[currentQuestionIndex] === false ? "checked" : ""}>
              <span class="option-text">${lang === "en" ? "False" : "Faux"}</span>
            </label>`;
    html += `</div>`;
  } else if (question.type === "single-choice") {
    const options = lang === "en" ? question.optionsEn : question.optionsFr;
    html += `<div class="options-container">`;
    options.forEach((option, index) => {
      html += `<label class="option-label">
                <input type="radio" name="answer" value="${index}" ${userAnswers[currentQuestionIndex] === index ? "checked" : ""}>
                <span class="option-text">${option}</span>
              </label>`;
    });
    html += `</div>`;
  } else if (question.type === "multiple-choice") {
    const options = lang === "en" ? question.optionsEn : question.optionsFr;
    html += `<div class="options-container">`;
    options.forEach((option, index) => {
      const isChecked = userAnswers[currentQuestionIndex] && userAnswers[currentQuestionIndex].includes(index);
      html += `<label class="option-label">
                <input type="checkbox" name="answer" value="${index}" ${isChecked ? "checked" : ""}>
                <span class="option-text">${option}</span>
              </label>`;
    });
    html += `</div>`;
  }

  html += `</div>`;
  questionContainer.innerHTML = html;

  prevBtn.disabled = currentQuestionIndex === 0;

  if (currentQuestionIndex === selectedQuizData.length - 1) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "inline-block";
  } else {
    nextBtn.style.display = "inline-block";
    submitBtn.style.display = "none";
  }
}

function saveAnswer() {
  const question = selectedQuizData[currentQuestionIndex];
  
  if (question.type === "true-false") {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (selected) {
      userAnswers[currentQuestionIndex] = selected.value === "true";
    }
  } else if (question.type === "single-choice") {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (selected) {
      userAnswers[currentQuestionIndex] = parseInt(selected.value);
    }
  } else if (question.type === "multiple-choice") {
    const selected = document.querySelectorAll('input[name="answer"]:checked');
    userAnswers[currentQuestionIndex] = Array.from(selected).map(input => parseInt(input.value));
  }
}

function nextQuestion() {
  saveAnswer();
  if (currentQuestionIndex < selectedQuizData.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  }
}

function prevQuestion() {
  saveAnswer();
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion();
  }
}

function calculateScore() {
  score = 0;
  selectedQuizData.forEach((question, index) => {
    const userAnswer = userAnswers[index];
    
    if (question.type === "true-false") {
      if (userAnswer === question.answer) score++;
    } else if (question.type === "single-choice") {
      if (userAnswer === question.correctAnswer) score++;
    } else if (question.type === "multiple-choice") {
      if (userAnswer && arraysEqual(userAnswer.sort(), question.correctAnswers.sort())) {
        score++;
      }
    }
  });
}

function arraysEqual(a, b) {
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function submitQuiz() {
  saveAnswer();
  calculateScore();
  showResults();
}

function showResults() {
  startScreen.style.display = "none";
  questionsScreen.style.display = "none";
  resultsScreen.style.display = "block";

  const lang = getCurrentLanguage();
  const percentage = Math.round((score / selectedQuizData.length) * 100);

  document.getElementById("score").textContent = score;
  document.getElementById("max-score").textContent = selectedQuizData.length;
  document.getElementById("score-percentage").textContent = percentage + "%";

  const messageEl = document.getElementById("score-message");
  let message = "";

  if (percentage >= 90) {
    message = lang === 'en' 
      ? "Excellent! You're a true expert!" 
      : "Excellent ! Vous êtes un vrai expert !";
    messageEl.className = "score-message excellent";
  } else if (percentage >= 70) {
    message = lang === 'en' 
      ? "Very good! You have solid knowledge!" 
      : "Très bien ! Vous avez de bonnes connaissances !";
    messageEl.className = "score-message good";
  } else if (percentage >= 50) {
    message = lang === 'en' 
      ? "Not bad! Continue practicing to improve." 
      : "Pas mal ! Continuez à vous entraîner pour vous améliorer.";
    messageEl.className = "score-message average";
  } else {
    message = lang === 'en' 
      ? "Keep learning! Practice makes perfect." 
      : "Continuez à apprendre ! La pratique mène à la perfection.";
    messageEl.className = "score-message needs-improvement";
  }

  messageEl.textContent = message;
  
  // Afficher le bouton Correction
  const correctionBtn = document.getElementById("correction-btn");
  if (correctionBtn) {
    correctionBtn.style.display = "inline-block";
  }
}

function showCorrection() {
  resultsScreen.style.display = "none";
  questionsScreen.style.display = "block";
  currentQuestionIndex = 0;
  correctionMode = true;
  displayQuestionWithCorrection();
}

function displayQuestionWithCorrection() {
  const question = selectedQuizData[currentQuestionIndex];
  const lang = getCurrentLanguage();
  const questionText = lang === "en" ? question.questionEn : question.questionFr;
  const userAnswer = userAnswers[currentQuestionIndex];
  const explanation = lang === "en" ? question.explanationEN : question.explanationFR;
  
  currentQuestionEl.textContent = currentQuestionIndex + 1;
  progressFill.style.width = ((currentQuestionIndex + 1) / selectedQuizData.length) * 100 + "%";

  let html = `<div class="question"><h3 class="question-text">${questionText}</h3>`;
  
  // Ajouter l'image si elle existe
  if (question.image_path) {
    html += `<div class="question-image">
              <img src="${new URL(question.image_path, quizContentBaseUrl).href}" alt="Question ${question.id}" />
            </div>`;
  }

  if (question.type === "true-false") {
    const isCorrect = userAnswer === question.answer;
    html += `<div class="options-container true-false">`;
    html += `<label class="option-label ${userAnswer === true ? (isCorrect ? 'correct-answer' : 'wrong-answer') : (question.answer === true ? 'correct-answer' : '')}">
              <input type="radio" disabled ${userAnswer === true ? 'checked' : ''}>
              <span class="option-text">${lang === "en" ? 'True' : 'Vrai'}</span>
            </label>`;
    html += `<label class="option-label ${userAnswer === false ? (isCorrect ? 'correct-answer' : 'wrong-answer') : (question.answer === false ? 'correct-answer' : '')}">
              <input type="radio" disabled ${userAnswer === false ? 'checked' : ''}>
              <span class="option-text">${lang === "en" ? 'False' : 'Faux'}</span>
            </label>`;
    html += `</div>`;
    html += `<div class="correction-status ${isCorrect ? 'correct' : 'incorrect'}">`;
    html += isCorrect ? 
      (lang === "en" ? '✓ Correct!' : '✓ Correct !') : 
      (lang === "en" ? `✗ Incorrect. The correct answer is: ${question.answer ? 'True' : 'False'}` : `✗ Incorrect. La bonne réponse est : ${question.answer ? 'Vrai' : 'Faux'}`);
    html += `</div>`;
    if (explanation) {
      html += `<div class="explanation">
                <strong>${lang === "en" ? 'Explanation:' : 'Explication :'}</strong> ${explanation}
              </div>`;
    }
  } else if (question.type === "single-choice") {
    const options = lang === "en" ? question.optionsEn : question.optionsFr;
    const isCorrect = userAnswer === question.correctAnswer;
    html += `<div class="options-container">`;
    options.forEach((option, index) => {
      let className = 'option-label';
      if (index === question.correctAnswer) {
        className += ' correct-answer';
      } else if (index === userAnswer && !isCorrect) {
        className += ' wrong-answer';
      }
      html += `<label class="${className}">
                <input type="radio" disabled ${userAnswer === index ? 'checked' : ''}>
                <span class="option-text">${option}</span>
              </label>`;
    });
    html += `</div>`;
    html += `<div class="correction-status ${isCorrect ? 'correct' : 'incorrect'}">`;
    html += isCorrect ? 
      (lang === "en" ? '✓ Correct!' : '✓ Correct !') : 
      (lang === "en" ? `✗ Incorrect. The correct answer is: ${options[question.correctAnswer]}` : `✗ Incorrect. La bonne réponse est : ${options[question.correctAnswer]}`);
    html += `</div>`;
    if (explanation) {
      html += `<div class="explanation">
                <strong>${lang === "en" ? 'Explanation:' : 'Explication :'}</strong> ${explanation}
              </div>`;
    }
  } else if (question.type === "multiple-choice") {
    const options = lang === "en" ? question.optionsEn : question.optionsFr;
    const isCorrect = userAnswer && arraysEqual(userAnswer.sort(), question.correctAnswers.sort());
    html += `<div class="options-container">`;
    options.forEach((option, index) => {
      let className = 'option-label';
      if (question.correctAnswers.includes(index)) {
        className += ' correct-answer';
      } else if (userAnswer && userAnswer.includes(index)) {
        className += ' wrong-answer';
      }
      const isChecked = userAnswer && userAnswer.includes(index);
      html += `<label class="${className}">
                <input type="checkbox" disabled ${isChecked ? 'checked' : ''}>
                <span class="option-text">${option}</span>
              </label>`;
    });
    html += `</div>`;
    html += `<div class="correction-status ${isCorrect ? 'correct' : 'incorrect'}">`;
    if (isCorrect) {
      html += lang === "en" ? '✓ Correct!' : '✓ Correct !';
    } else {
      const correctOptions = question.correctAnswers.map(i => options[i]).join(', ');
      html += lang === "en" ? `✗ Incorrect. The correct answers are: ${correctOptions}` : `✗ Incorrect. Les bonnes réponses sont : ${correctOptions}`;
    }
    html += `</div>`;
    if (explanation) {
      html += `<div class="explanation">
                <strong>${lang === "en" ? 'Explanation:' : 'Explication :'}</strong> ${explanation}
              </div>`;
    }
  }

  html += `</div>`;
  questionContainer.innerHTML = html;

  prevBtn.disabled = currentQuestionIndex === 0;
  nextBtn.disabled = currentQuestionIndex === selectedQuizData.length - 1;
  nextBtn.style.display = "inline-block";
  submitBtn.style.display = "none";
}

function nextQuestionCorrection() {
  if (currentQuestionIndex < selectedQuizData.length - 1) {
    currentQuestionIndex++;
    displayQuestionWithCorrection();
  }
}

function prevQuestionCorrection() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestionWithCorrection();
  }
}

function restartQuiz() {
  currentQuestionIndex = 0;
  userAnswers = [];
  score = 0;
  startQuiz();
}

// Écouter les changements de langue pour rafraîchir l'affichage
document.addEventListener('DOMContentLoaded', () => {
  const langSelector = document.querySelector("#lang");
  if (langSelector) {
    langSelector.addEventListener('change', () => {
      // Rafraîchir l'affichage de la question actuelle si on est dans le quiz
      if (questionsScreen.style.display === "block") {
        if (correctionMode) {
          displayQuestionWithCorrection();
        } else {
          displayQuestion();
        }
      }
      // Rafraîchir les résultats si on est dans l'écran de résultats
      if (resultsScreen.style.display === "block" && !correctionMode) {
        showResults();
      }
    });
  }
});

if (startBtn) startBtn.addEventListener("click", startQuiz);

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    if (correctionMode) {
      nextQuestionCorrection();
    } else {
      nextQuestion();
    }
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (correctionMode) {
      prevQuestionCorrection();
    } else {
      prevQuestion();
    }
  });
}

if (submitBtn) submitBtn.addEventListener("click", submitQuiz);

if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    correctionMode = false;
    restartQuiz();
  });
}

const correctionBtn = document.getElementById("correction-btn");
if (correctionBtn) {
  correctionBtn.addEventListener("click", () => {
    correctionMode = true;
    showCorrection();
  });
}

// Charger les questions au démarrage et démarrer le quiz
document.addEventListener("DOMContentLoaded", async () => {
  const loaded = await loadQuestions();
  if (loaded) {
    selectedQuizData = shuffleArray(quizData).slice(0, 15);
  }
  
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      if (selectedQuizData.length === 0) {
        alert("Erreur: Aucune question n'a été chargée.");
        return;
      }
      startQuiz();
    });
  }
});
