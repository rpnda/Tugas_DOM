const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');
const loginContainer = document.getElementById('login-container');
const animeContent = document.getElementById('anime-content');
const displayUsername = document.getElementById('display-username');
const logoutButton = document.getElementById('logout-button');
const validCredentials = {
    username: 'bukanadminslot',
    password: 'otaku123'
};
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});
function initializeApp() {
    setupEventListeners();
    setupAnimeInteractions();
    checkStoredSession();
}
function setupEventListeners() {
    loginForm.addEventListener('submit', handleLogin);
    logoutButton.addEventListener('click', handleLogout);
    usernameInput.addEventListener('input', clearError);
    passwordInput.addEventListener('input', clearError);
    document.addEventListener('keydown', handleKeyboardShortcuts);
}
function handleLogin(event) {
    event.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    clearError();
    if (!validateInputs(username, password)) {
        return;
    }
    if (authenticateUser(username, password)) {
        loginSuccess(username);
    } else {
        loginFailure();
    }
}
function validateInputs(username, password) {
    if (!username) {
        showError('Please enter your username');
        usernameInput.focus();
        return false;
    }
    if (!password) {
        showError('Please enter your password');
        passwordInput.focus();
        return false;
    }
    if (username.length < 3) {
        showError('Username must be at least 3 characters long');
        usernameInput.focus();
        return false;
    }
    return true;
}
function authenticateUser(username, password) {
    return username === validCredentials.username && password === validCredentials.password;
}
function loginSuccess(username) {
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('username', username);
    displayUsername.textContent = username;
    animateTransition(loginContainer, animeContent);
    clearForm();
    showWelcomeMessage(username);
}
function loginFailure() {
    showError('Invalid username or password. Please try again!');
    loginForm.classList.add('shake');
    setTimeout(() => {
        loginForm.classList.remove('shake');
    }, 500);
    passwordInput.value = '';
    passwordInput.focus();
}
function handleLogout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    animateTransition(animeContent, loginContainer);
    clearForm();
    clearError();
    setTimeout(() => {
        usernameInput.focus();
    }, 300);
}
function animateTransition(hideElement, showElement) {
    hideElement.style.opacity = '0';
    hideElement.style.transform = 'scale(0.95)';
    setTimeout(() => {
        hideElement.classList.add('hidden');
        showElement.classList.remove('hidden');
        showElement.style.opacity = '0';
        showElement.style.transform = 'scale(0.95)';
        setTimeout(() => {
            showElement.style.opacity = '1';
            showElement.style.transform = 'scale(1)';
        }, 50);
    }, 200);
}
function setupAnimeInteractions() {
    const animeItems = document.querySelectorAll('.anime-item');
    const playButtons = document.querySelectorAll('.play-btn');
    animeItems.forEach(item => {
        item.addEventListener('click', () => {
            const animeTitle = item.querySelector('h3').textContent;
            showAnimeDetails(animeTitle);
        });
    });
    playButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const animeTitle = button.closest('.anime-item').querySelector('h3').textContent;
            playAnime(animeTitle);
        });
    });
}
function showAnimeDetails(title) {
    alert(`You selected: ${title}\n\nThis would normally open the anime details page.`);
}
function playAnime(title) {
    alert(`Starting to play: ${title}\n\nThis would normally start the video player.`);
}
function showWelcomeMessage(username) {
    setTimeout(() => {
        const welcomeMsg = document.createElement('div');
        welcomeMsg.className = 'welcome-toast';
        welcomeMsg.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                z-index: 1000;
                animation: slideIn 0.5s ease;
            ">
                🎉 Welcome back, ${username}!
            </div>
        `;
        document.body.appendChild(welcomeMsg);
        setTimeout(() => {
            welcomeMsg.remove();
        }, 3000);
    }, 500);
}
function checkStoredSession() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const storedUsername = sessionStorage.getItem('username');
    if (isLoggedIn === 'true' && storedUsername) {
        displayUsername.textContent = storedUsername;
        loginContainer.classList.add('hidden');
        animeContent.classList.remove('hidden');
    }
}
function handleKeyboardShortcuts(event) {
    if (event.key === 'Escape' && !animeContent.classList.contains('hidden')) {
        handleLogout();
    }
    if (event.key === 'Enter' && document.activeElement === usernameInput) {
        event.preventDefault();
        passwordInput.focus();
    }
}
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}
function clearError() {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
}
function clearForm() {
    usernameInput.value = '';
    passwordInput.value = '';
}
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .shake {
        animation: shake 0.5s ease-in-out;
    }
    
    .container {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
`;
document.head.appendChild(style);