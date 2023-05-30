
import "./registration.css"
import '../normalize.css';

//dynamically generated DOM
const loginBox = document.createElement('div');
loginBox.classList.add('login-box');

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

const form = document.createElement('form');
loginBox.appendChild(form);

const firstNameDiv = document.createElement('div');
firstNameDiv.classList.add('user-box');
form.appendChild(firstNameDiv);

const firstNameInput = document.createElement('input');
firstNameInput.setAttribute('type', 'text');
firstNameInput.setAttribute('id', 'firstName');
firstNameInput.setAttribute('required', '');
firstNameDiv.appendChild(firstNameInput);

const firstNameLabel = document.createElement('label');
firstNameLabel.textContent = 'FIRST NAME';
firstNameDiv.appendChild(firstNameLabel);

const lastNameDiv = document.createElement('div');
lastNameDiv.classList.add('user-box');
form.appendChild(lastNameDiv);

const lastNameInput = document.createElement('input');
lastNameInput.setAttribute('type', 'text');
lastNameInput.setAttribute('id', 'lastName');
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
submitButton.setAttribute('id', 'signupSubmit');
form.appendChild(submitButton);

const loginLink = document.createElement('a');
loginLink.setAttribute('href', '#');
loginLink.setAttribute('id', 'loginLink');
loginLink.innerHTML = "Already registered? Log in."

const anchorTag = document.createElement('a');
anchorTag.setAttribute('href', '#');
form.appendChild(anchorTag);

for (let i = 0; i < 4; i++) {
  const span = document.createElement('span');
  anchorTag.appendChild(span);
}
form.appendChild(loginLink);
document.body.appendChild(loginBox);

