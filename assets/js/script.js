"use strict";

const elemToggleFunc = function (elem) { 
  elem.classList.toggle("active"); 
};

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {
  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);
});

const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", function () {
    elemToggleFunc(toggleBtnBox);
    for (let i = 0; i < toggleBtns.length; i++) { 
      elemToggleFunc(toggleBtns[i]); 
    }
    elemToggleFunc(skillsBox);
  });
}

const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {
  elemToggleFunc(themeToggleBtn);
  if (themeToggleBtn.classList.contains("active")) {
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");
    localStorage.setItem("theme", "light_theme");
  } else {
    document.body.classList.add("dark_theme");
    document.body.classList.remove("light_theme");
    localStorage.setItem("theme", "dark_theme");
  }
});

if (localStorage.getItem("theme") === "light_theme") {
  themeToggleBtn.classList.add("active");
  document.body.classList.remove("dark_theme");
  document.body.classList.add("light_theme");
} else {
  themeToggleBtn.classList.remove("active");
  document.body.classList.remove("light_theme");
  document.body.classList.add("dark_theme");
}

// Language switcher
const langSelector = document.querySelector("#lang");

// Language translations
const translations = {
  en: {
    "navbar-home": "Home.",
    "navbar-skills": "Skills.",
    "navbar-quiz": "Quiz",
    "navbar-toeic": "TOEIC",
    "navbar-contact": "Contact.",
    "hero-kicker": "Developer portfolio and learning lab",
    "hero-title": "I build practical web experiences",
    "hero-subtitle": "A cleaner TianSemi home for projects, interactive quizzes, and focused TOEIC revision tools.",
    "hero-cta-toeic": "Open TOEIC flashcards",
    "hero-cta": "Get in touch",
    "scroll-down": "Scroll",
    "about-subtitle": "About me",
    "about-title": "Need a Creative Product? I can Help You!",
    "about-text": "Hi! I'm Moulo Oholo, and I'm a developer who has passion for building clean web applications with intuitive functionalities. I enjoy the process of turning ideas into reality using creative solutions. I'm always curious about learning new skills, tools, and concepts. In addition to working on various solo full stack projects, I have worked with creative teams, which involves daily stand-ups and communications, source control, and project management.",
    "skills-subtitle": "My skills",
    "skills-title": "What My Programming Skills Included?",
    "skills-text": "I develop simple, intuitive and responsive user interface that helps users get things done with less effort and time with those technologies.",
    "skills-btn": "Skills",
    "tools-btn": "Tools",
    "portfolio-subtitle": "My Works",
    "portfolio-title": "Selected projects and learning tools",
    "portfolio-text": "Explore polished web interfaces, interactive quiz work, and the new TOEIC flashcards page integrated into the site.",
    "load-more": "Load more work",
    "contact-subtitle": "Contact",
    "contact-title": "Have You Any Project? Please Drop a Message",
    "contact-desc": "Get in touch and let me know how i can help. Fill out the form and i'll be in touch as soon as possible.",
    "address-title": "Address:",
    "phone-title": "Phone:",
    "email-title": "Email:",
    "btn-hire": "Hire me",
    "btn-cv": "Download cv",
    "btn-send": "Send",
    "form-sending": "Sending your message…",
    "form-success": "Thank you — your message has been sent. We will get back to you soon.",
    "form-error": "We could not send your message. Please try again or contact us by email.",
    "form-validation-error": "Please complete your name, a valid email address, and your message.",
    "form-name": "Name",
    "form-email": "Email",
    "form-phone": "Phone",
    "form-message": "Message",
    "placeholder-name": "e.g John Doe",
    "placeholder-email": "e.g johndoe@mail.com",
    "placeholder-phone": "e.g. +2250777366687",
    "phone-format": "Use international format with country code, e.g. +2250777366687.",
    "placeholder-message": "Write message...",
    "years-exp": "Years of Experience",
    "completed-projects": "Completed Projects",
    "happy-clients": "Happy Clients",
    "copyright": "All rights reserved",
    "btn-signin": "Sign in with Google",
    "welcome-user": "Welcome",
    "btn-signout": "Sign Out",
    "quiz-main-title": "Interactive Quiz",
    "quiz-subtitle": "Test your knowledge with this fun quiz!",
    "quiz-welcome": "Welcome to the Quiz!",
    "quiz-instructions": "This quiz contains different types of questions: true/false, multiple choice and single choice. Good luck!",
    "quiz-start-btn": "Start Quiz",
    "quiz-question": "Question",
    "quiz-prev": "Previous",
    "quiz-next": "Next",
    "quiz-submit": "Submit",
    "quiz-results-title": "Quiz Results",
    "quiz-score-label": "Your score:",
    "quiz-correction": "View Correction",
    "quiz-restart": "Restart"
  },
  fr: {
    "navbar-home": "Accueil.",
    "navbar-skills": "Compétences.",
    "navbar-quiz": "Quiz",
    "navbar-toeic": "TOEIC",
    "navbar-contact": "Contact.",
    "hero-kicker": "Portfolio développeur et laboratoire d'apprentissage",
    "hero-title": "Je crée des expériences web utiles",
    "hero-subtitle": "Un accueil TianSemi plus clair pour les projets, les quiz interactifs et la révision TOEIC.",
    "hero-cta-toeic": "Ouvrir les flashcards TOEIC",
    "hero-cta": "Contactez-nous",
    "scroll-down": "Défiler",
    "about-subtitle": "À propos de moi",
    "about-title": "Besoin d'un Produit Créatif ? Je Peux Vous Aider !",
    "about-text": "Bonjour ! Je suis Moulo Oholo, un développeur passionné par la création d'applications web propres aux fonctionnalités intuitives. J'apprécie le processus de transformation des idées en réalité en utilisant des solutions créatives. Je suis toujours curieux d'apprendre de nouvelles compétences, outils et concepts. En plus de travailler sur divers projets full stack en solo, j'ai collaboré avec des équipes créatives, ce qui implique des stand-ups quotidiens, de la communication, du contrôle de version et de la gestion de projet.",
    "skills-subtitle": "Mes compétences",
    "skills-title": "Quelles Sont Mes Compétences en Programmation ?",
    "skills-text": "Je développe des interfaces utilisateur simples, intuitives et réactives qui aident les utilisateurs à accomplir leurs tâches avec moins d'effort et de temps grâce à ces technologies.",
    "skills-btn": "Compétences",
    "tools-btn": "Outils",
    "portfolio-subtitle": "Mes Travaux",
    "portfolio-title": "Projets et outils d'apprentissage",
    "portfolio-text": "Explorez des interfaces web soignées, le quiz interactif et la nouvelle page de flashcards TOEIC intégrée au site.",
    "load-more": "Charger plus",
    "contact-subtitle": "Contact",
    "contact-title": "Vous Avez un Projet ? Envoyez-moi un Message",
    "contact-desc": "Contactez-moi et dites-moi comment je peux vous aider. Remplissez le formulaire et je vous répondrai dès que possible.",
    "address-title": "Adresse :",
    "phone-title": "Téléphone :",
    "email-title": "Email :",
    "btn-hire": "Embauchez-moi",
    "btn-cv": "Télécharger CV",
    "btn-send": "Envoyer",
    "form-sending": "Envoi du message…",
    "form-success": "Merci — votre message a bien été envoyé. Nous vous répondrons bientôt.",
    "form-error": "Votre message n’a pas pu être envoyé. Réessayez ou contactez-nous par e-mail.",
    "form-validation-error": "Veuillez renseigner votre nom, une adresse e-mail valide et votre message.",
    "form-name": "Nom",
    "form-email": "Email",
    "form-phone": "Téléphone",
    "form-message": "Message",
    "placeholder-name": "ex: Jean Dupont",
    "placeholder-email": "ex: jean.dupont@mail.com",
    "placeholder-phone": "ex. +2250777366687",
    "phone-format": "Utilisez le format international avec indicatif pays, ex. +2250777366687.",
    "placeholder-message": "Écrivez votre message...",
    "years-exp": "Années d'Expérience",
    "completed-projects": "Projets Réalisés",
    "happy-clients": "Clients Satisfaits",
    "copyright": "Tous droits réservés",
    "btn-signin": "Se connecter avec Google",
    "welcome-user": "Bienvenue",
    "btn-signout": "Se déconnecter",
    "quiz-main-title": "Quiz Interactif",
    "quiz-subtitle": "Testez vos connaissances avec ce quiz amusant!",
    "quiz-welcome": "Bienvenue au Quiz!",
    "quiz-instructions": "Ce quiz contient différents types de questions : vrai/faux, choix multiples et choix unique. Bonne chance!",
    "quiz-start-btn": "Commencer le Quiz",
    "quiz-question": "Question",
    "quiz-prev": "Précédent",
    "quiz-next": "Suivant",
    "quiz-submit": "Soumettre",
    "quiz-results-title": "Résultats du Quiz",
    "quiz-score-label": "Votre score :",
    "quiz-correction": "Voir la Correction",
    "quiz-restart": "Recommencer"
  }
};

// Update text content based on selected language
// Apply translations based on data-i18n attributes
function applyTranslations(lang) {
  const nodes = document.querySelectorAll('[data-i18n]');
  nodes.forEach((node) => {
    const key = node.getAttribute('data-i18n');
    if (!key) return;
    const text = translations[lang] && translations[lang][key];
    if (text === undefined) return;

    // Skip welcome-user as it's handled by Firebase auth system
    if (key === 'welcome-user') return;

    // If the node is an input or textarea, set placeholder
    if (node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement) {
      node.placeholder = text;
      return;
    }

    // If the node has data-i18n-attr, set that attribute instead of textContent
    const attr = node.getAttribute('data-i18n-attr');
    if (attr) {
      node.setAttribute(attr, text);
      return;
    }

    // Handle buttons with icons - preserve HTML structure
    if (node.querySelector('ion-icon')) {
      const icon = node.querySelector('ion-icon');
      const span = node.querySelector('span') || document.createElement('span');
      span.textContent = text;
      node.innerHTML = '';
      node.appendChild(icon);
      node.appendChild(span);
      return;
    }

    // Default: set textContent
    node.textContent = text;
  });

  // Keep the footer year current without requiring a yearly content update.
  const copyright = document.querySelector('.copyright');
  if (copyright) {
    copyright.textContent = `© ${new Date().getFullYear()} TianSemi Corp.`;
  }
}

// Update language and persist
function updateLanguage(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem('lang', lang);
  if (langSelector) langSelector.value = lang;
  applyTranslations(lang);
}

// (Removed duplicate event listener: see DOMContentLoaded block for correct handler)

// Initialize with current language
// Language detection helper
function detectLanguage() {
  return localStorage.getItem('lang') || document.documentElement.lang || 'en';
}

// Initialize translations and watchers after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Set initial language selection
  const initialLang = detectLanguage();
  if (langSelector) langSelector.value = initialLang;

  // When user changes language via selector
  if (langSelector) {
    langSelector.addEventListener('change', (e) => {
      updateLanguage(e.target.value);
    });
  }

  // Observe changes to <html lang> (in case other scripts update it)
  const htmlElement = document.documentElement;
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
        const newLang = detectLanguage();
        if (langSelector) langSelector.value = newLang;
        applyTranslations(newLang);
      }
    });
  });
  observer.observe(htmlElement, { attributes: true });

  // Apply initial translations
  updateLanguage(initialLang);
  
  // Restore user interface after language change
  setTimeout(() => {
    if (typeof window.restoreUserInterface === 'function') {
      window.restoreUserInterface();
    }
  }, 100);
});

// Override updateLanguage to restore user interface
const originalUpdateLanguage = updateLanguage;
updateLanguage = function(lang) {
  originalUpdateLanguage(lang);
  
  // Restore user interface after translation
  setTimeout(() => {
    if (typeof window.restoreUserInterface === 'function') {
      window.restoreUserInterface();
    }
  }, 50);
};

// Contact form: submit to Formspree without leaving the page.
const contactForm = document.querySelector('[data-contact-form]');

if (contactForm) {
  const contactSubmit = contactForm.querySelector('[data-contact-submit]');
  const contactStatus = contactForm.querySelector('[data-contact-status]');

  const getContactMessages = () => translations[detectLanguage()] || translations.en;

  const setContactStatus = (messageKey, state = '') => {
    contactStatus.textContent = getContactMessages()[messageKey];
    contactStatus.className = `contact-form-status${state ? ` is-${state}` : ''}`;
  };

  contactForm.addEventListener('invalid', () => {
    contactForm.classList.add('was-validated');
    setContactStatus('form-validation-error', 'error');
  }, true);

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.classList.add('was-validated');
      setContactStatus('form-validation-error', 'error');
      contactForm.reportValidity();
      return;
    }

    contactSubmit.disabled = true;
    contactSubmit.textContent = getContactMessages()['form-sending'];
    setContactStatus('form-sending');

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('Formspree request failed');

      contactForm.reset();
      contactForm.classList.remove('was-validated');
      setContactStatus('form-success', 'success');
    } catch (error) {
      setContactStatus('form-error', 'error');
    } finally {
      contactSubmit.disabled = false;
      contactSubmit.textContent = getContactMessages()['btn-send'];
    }
  });
}
