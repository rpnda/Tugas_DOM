// DOM Elements
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');
const loginContainer = document.getElementById('login-container');
const validCredentials = {
    username: 'admin',
    password: 'otaku123'
};
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});
function initializeApp() {
    setupEventListeners();
}
function setupEventListeners() {
    loginForm.addEventListener('submit', handleLogin);
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
    showError(`Login successful! Welcome, ${username}! (No content to display)`);
    clearForm();
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
function handleKeyboardShortcuts(event) {
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
document.head.appendChild(style);