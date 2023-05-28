
import "./registration.css"
import "normalize.css"
// Create the login box container
const loginBox = document.createElement('div');
loginBox.classList.add('login-box');

// Create the heading element

const heading = document.createElement('h2');
heading.classList.add("heading");

const text = document.createElement('h2');
text.textContent = 'Sign up to';
heading.appendChild(text);

const headingLogo = document.createElement('h2');
headingLogo.classList.add("logo");
headingLogo.textContent = 'MENTORYX';
heading.appendChild(headingLogo);
loginBox.appendChild(heading);


// Create the form element
const form = document.createElement('form');
loginBox.appendChild(form);

// Create the first name input field
const firstNameDiv = document.createElement('div');
firstNameDiv.classList.add('user-box');
form.appendChild(firstNameDiv);

const firstNameInput = document.createElement('input');
firstNameInput.setAttribute('type', 'text');
firstNameInput.setAttribute('id', 'first name');
firstNameInput.setAttribute('required', '');
firstNameDiv.appendChild(firstNameInput);

const firstNameLabel = document.createElement('label');
firstNameLabel.textContent = 'FIRST NAME';
firstNameDiv.appendChild(firstNameLabel);

// Create the last name input field
const lastNameDiv = document.createElement('div');
lastNameDiv.classList.add('user-box');
form.appendChild(lastNameDiv);

const lastNameInput = document.createElement('input');
lastNameInput.setAttribute('type', 'text');
lastNameInput.setAttribute('id', 'last name');
lastNameInput.setAttribute('required', '');
lastNameDiv.appendChild(lastNameInput);

const lastNameLabel = document.createElement('label');
lastNameLabel.textContent = 'LAST NAME';
lastNameDiv.appendChild(lastNameLabel);

const usernameDiv = document.createElement('div');
usernameDiv.classList.add('user-box');
form.appendChild(usernameDiv);

const usernameInput = document.createElement('input');
usernameInput.setAttribute('type', 'text');
usernameInput.setAttribute('id', 'username');
usernameInput.setAttribute('required', '');
usernameDiv.appendChild(usernameInput);

const usernameLabel = document.createElement('label');
usernameLabel.textContent = 'USERNAME';
usernameDiv.appendChild(usernameLabel);

// Create the email input field
const emailDiv = document.createElement('div');
emailDiv.classList.add('user-box');
form.appendChild(emailDiv);

const emailInput = document.createElement('input');
emailInput.setAttribute('type', 'email');
emailInput.setAttribute('id', 'email');
emailInput.setAttribute('required', '');
emailDiv.appendChild(emailInput);

const emailLabel = document.createElement('label');
emailLabel.textContent = 'E-MAIL';
emailDiv.appendChild(emailLabel);

// Create the password input field
const passwordDiv = document.createElement('div');
passwordDiv.classList.add('user-box');
form.appendChild(passwordDiv);

const passwordInput = document.createElement('input');
passwordInput.setAttribute('type', 'password');
passwordInput.setAttribute('id', 'password');
passwordInput.setAttribute('required', '');
passwordDiv.appendChild(passwordInput);

const passwordLabel = document.createElement('label');
passwordLabel.textContent = 'PASSWORD';
passwordDiv.appendChild(passwordLabel);

// Create the confirm password input field
const confirmPasswordDiv = document.createElement('div');
confirmPasswordDiv.classList.add('user-box');
form.appendChild(confirmPasswordDiv);

const confirmPasswordInput = document.createElement('input');
confirmPasswordInput.setAttribute('type', 'password');
confirmPasswordInput.setAttribute('id', 'confirmPassword');
confirmPasswordInput.setAttribute('required', '');
confirmPasswordDiv.appendChild(confirmPasswordInput);

const confirmPasswordLabel = document.createElement('label');
confirmPasswordLabel.textContent = 'CONFIRM PASSWORD';
confirmPasswordDiv.appendChild(confirmPasswordLabel);

// Create the submit button
const submitButton = document.createElement('input');
submitButton.setAttribute('type', 'submit');
submitButton.setAttribute('value', 'SIGN UP');
submitButton.setAttribute('id', 'signup');
form.appendChild(submitButton);

const loginLink = document.createElement('a');
loginLink.setAttribute('href', '#');
loginLink.setAttribute('id', 'login');
loginLink.innerHTML = "Already registered? Log in."

// Create the anchor tag
const anchorTag = document.createElement('a');
anchorTag.setAttribute('href', '#');
form.appendChild(anchorTag);

// Create the spans within the anchor tag
for (let i = 0; i < 4; i++) {
  const span = document.createElement('span');
  anchorTag.appendChild(span);
}
form.appendChild(loginLink);

// Append the login box to the document body or any desired container
document.body.appendChild(loginBox);


//user input validation
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); // Previeni l'invio del modulo per ora

  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirmPassword').value;

  // Verifica la lunghezza della password
  if (password.length < 8) {
    alert('La password deve essere di almeno otto caratteri.');
    return;
  }

  // Verifica la presenza di una lettera maiuscola
  if (!/[A-Z]/.test(password)) {
    alert('La password deve contenere almeno una lettera maiuscola.');
    return;
  }

  // Verifica la presenza di almeno un carattere speciale
  if (!/[!@#$%^&*]/.test(password)) {
    alert('La password deve contenere almeno un carattere speciale (!, @, #, $, %, ^, &, *).');
    return;
  }

  // Verifica la presenza di almeno una cifra
  if (!/\d/.test(password)) {
    alert('La password deve contenere almeno un a cifra.');
    return;
  }

  // Verifica che le password corrispondano
  if (password === confirmPassword) {
    // Le password corrispondono
    alert('Registrazione avvenuta con successo!');
    // Puoi aggiungere qui il codice per inviare i dati del modulo al server
  } else {
    // Le password non corrispondono
    alert('Le password non corrispondono. Riprova.');
  }
});

//redirect to login page
loginLink.addEventListener("click", handleLogin);

function handleLogin() {
  window.location.href = 'auth.html';
}