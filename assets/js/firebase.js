// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEvW7MV0c9Vku85qGF4Lk0Gf9WywVD5W4",
  authDomain: "tiansemi-github-io-ef0f9.firebaseapp.com",
  projectId: "tiansemi-github-io-ef0f9",
  storageBucket: "tiansemi-github-io-ef0f9.firebasestorage.app",
  messagingSenderId: "254920499973",
  appId: "1:254920499973:web:5ed3a16b9366408e514d6c",
  measurementId: "G-YQQ5S9MR0N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Auth first
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Configure provider for better popup handling
provider.setCustomParameters({
  prompt: 'select_account' // Forces account selection, can help with popup issues
});

// Suppress console warnings for Cross-Origin-Opener-Policy (cosmetic fix)
const originalConsoleWarn = console.warn;
console.warn = function(...args) {
  // Filter out the repetitive CORS popup warnings
  const message = args.join(' ');
  if (message.includes('Cross-Origin-Opener-Policy') && message.includes('window.closed')) {
    // Suppress this specific warning as it's cosmetic and doesn't affect functionality
    return;
  }
  originalConsoleWarn.apply(console, args);
};

// Export functions to global scope for onclick access
window.loginWithGoogle = function() {
  // Add timeout to prevent infinite polling
  const popupTimeout = setTimeout(() => {
    console.warn("Login popup timeout - user may have closed the window");
  }, 60000); // 1 minute timeout

  signInWithPopup(auth, provider)
    .then((result) => {
      // Clear timeout on success
      clearTimeout(popupTimeout);
      
      // User is signed in. You can now access user data.
      const user = result.user;
      console.log("Logged in user:", user.displayName);
      
      // Store user info for persistence across page loads and translations
      localStorage.setItem('currentUser', JSON.stringify({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      }));
      
      // Update UI with user info
      updateUserInterface(user);
    })
    .catch((error) => {
      // Clear timeout on error
      clearTimeout(popupTimeout);
      
      // Handle specific popup-related errors
      switch(error.code) {
        case 'auth/popup-blocked':
          console.warn("Popup was blocked by browser. Please allow popups for this site.");
          alert("Le popup a été bloqué par votre navigateur. Veuillez autoriser les popups pour ce site.");
          break;
        case 'auth/popup-closed-by-user':
          console.log("User closed the popup before completing sign-in.");
          // Don't show error for this - it's user action
          break;
        case 'auth/cancelled-popup-request':
          console.log("Popup request was cancelled (another popup was already open).");
          break;
        case 'auth/operation-not-allowed':
          console.error("Google sign-in is not enabled in Firebase Console.");
          alert("La connexion Google n'est pas activée. Contactez l'administrateur.");
          break;
        case 'auth/unauthorized-domain':
          console.error("Domain not authorized for OAuth operations.");
          alert("Domaine non autorisé pour cette opération.");
          break;
        default:
          // For CORS/Cross-Origin-Opener-Policy errors and others
          if (error.message && error.message.includes('Cross-Origin-Opener-Policy')) {
            console.warn("CORS policy warning detected - authentication may still succeed");
            // Don't show this error to users as it's often not critical
          } else {
            console.error("Login failed:", error);
            alert("Échec de la connexion. Veuillez réessayer.");
          }
      }
    });
}

// Function to update user interface with current language support
function updateUserInterface(user) {
  const currentLang = localStorage.getItem('lang') || 'en';
  const welcomeText = currentLang === 'fr' ? 'Bienvenue' : 'Welcome';
  
  // Update welcome message with user name
  const welcomeSpan = document.querySelector('.welcome-user');
  if (welcomeSpan && user) {
    const firstName = user.displayName ? user.displayName.split(' ')[0] : user.email.split('@')[0];
    welcomeSpan.innerHTML = `${welcomeText}, <strong>${firstName}</strong>`;
  }
  
  // Update user avatar if available
  const userAvatar = document.querySelector('.user-avatar');
  if (userAvatar && user.photoURL) {
    userAvatar.src = user.photoURL;
    userAvatar.style.display = 'block';
  }

  updateLearningAuthPanel(user);
}

// Function to clear user interface
function clearUserInterface() {
  const welcomeSpan = document.querySelector('.welcome-user');
  if (welcomeSpan) {
    welcomeSpan.innerHTML = '';
  }
  
  const userAvatar = document.querySelector('.user-avatar');
  if (userAvatar) {
    userAvatar.style.display = 'none';
  }
  
  // Clear stored user data
  localStorage.removeItem('currentUser');

  updateLearningAuthPanel(null);
}

window.signOut = function() {
  // Close dropdown first
  closeUserDropdown();
  
  auth.signOut().then(() => {
    console.log("User signed out");
    clearUserInterface();
  }).catch((error) => {
    console.error("Sign out failed:", error);
  });
}
auth.onAuthStateChanged(user => {
  const protectedContent = document.getElementById("protected-content");
  const loginUi = document.getElementById("login-ui");

  if (user) {
    // User is signed in, show protected content
    console.log("User is signed in:", user.displayName);
    if (protectedContent) {
      protectedContent.style.display = "flex";
    }
    if (loginUi) {
      loginUi.style.display = "none";
    }
    
    // Store user info and update UI
    localStorage.setItem('currentUser', JSON.stringify({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    }));
    updateUserInterface(user);
  } else {
    // User is signed out, show login button
    console.log("No user is signed in.");
    if (protectedContent) {
      protectedContent.style.display = "none";
    }
    if (loginUi) {
      loginUi.style.display = "block";
    }
    clearUserInterface();
  }
});

// Function to restore user interface on page load/language change
window.restoreUserInterface = function() {
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser && auth.currentUser) {
    const user = JSON.parse(storedUser);
    updateUserInterface(user);
  }
};

function getFirstName(user) {
  if (!user) {
    return '';
  }

  if (user.displayName) {
    return user.displayName.trim().split(/\s+/)[0];
  }

  if (user.email) {
    return user.email.split('@')[0];
  }

  return 'membre';
}

function updateLearningAuthPanel(user) {
  const panel = document.querySelector('[data-learning-auth]');

  if (!panel) {
    return;
  }

  const guestState = panel.querySelector('[data-learning-auth-guest]');
  const memberState = panel.querySelector('[data-learning-auth-member]');
  const nameTarget = panel.querySelector('[data-learning-auth-name]');

  if (user) {
    const firstName = getFirstName(user);

    if (nameTarget) {
      nameTarget.textContent = firstName;
    }

    if (guestState) {
      guestState.hidden = true;
    }

    if (memberState) {
      memberState.hidden = false;
    }

    panel.dataset.authState = 'connected';
    return;
  }

  if (guestState) {
    guestState.hidden = false;
  }

  if (memberState) {
    memberState.hidden = true;
  }

  if (nameTarget) {
    nameTarget.textContent = '';
  }

  panel.dataset.authState = 'guest';
}

// Dropdown functionality
window.toggleUserDropdown = function() {
  const trigger = document.querySelector('.user-trigger');
  const dropdown = document.getElementById('user-dropdown-menu');
  
  if (dropdown && trigger) {
    const isOpen = dropdown.classList.contains('show');
    
    if (isOpen) {
      closeUserDropdown();
    } else {
      openUserDropdown();
    }
  }
};

function openUserDropdown() {
  const trigger = document.querySelector('.user-trigger');
  const dropdown = document.getElementById('user-dropdown-menu');
  
  if (dropdown && trigger) {
    dropdown.classList.add('show');
    trigger.classList.add('active');
    
    // Close dropdown when clicking outside
    setTimeout(() => {
      document.addEventListener('click', handleOutsideClick);
    }, 0);
  }
}

function closeUserDropdown() {
  const trigger = document.querySelector('.user-trigger');
  const dropdown = document.getElementById('user-dropdown-menu');
  
  if (dropdown && trigger) {
    dropdown.classList.remove('show');
    trigger.classList.remove('active');
    document.removeEventListener('click', handleOutsideClick);
  }
}

function handleOutsideClick(event) {
  const userDropdown = document.querySelector('.user-dropdown');
  
  if (userDropdown && !userDropdown.contains(event.target)) {
    closeUserDropdown();
  }
}

// Close dropdown on escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeUserDropdown();
  }
});
