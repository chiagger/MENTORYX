import './auth.css';
import '../normalize.css';

//dynamically generated DOM
const loginBox = document.createElement('div');
loginBox.classList.add('login-box');

const heading = document.createElement('h2');
heading.classList.add("heading");

const text = document.createElement('h2');
text.textContent = 'Log in to';
heading.appendChild(text);

const headingLogo = document.createElement('h2');
headingLogo.classList.add("logo");
headingLogo.textContent = 'MENTORYX';
heading.appendChild(headingLogo);
loginBox.appendChild(heading);

const form = document.createElement('form');

const usernameBox = document.createElement('div');
usernameBox.classList.add('user-box');
const usernameInput = document.createElement('input');
usernameInput.setAttribute('id','email');
usernameInput.type = 'text';
usernameInput.name = '';
usernameInput.required = true;
const usernameLabel = document.createElement('label');
usernameLabel.textContent = 'EMAIL';
usernameBox.appendChild(usernameInput);
usernameBox.appendChild(usernameLabel);

const passwordBox = document.createElement('div');
passwordBox.classList.add('user-box');
const passwordInput = document.createElement('input');
passwordInput.setAttribute('id', 'password');
passwordInput.type = 'password';
passwordInput.name = '';
passwordInput.required = true;
const passwordLabel = document.createElement('label');
passwordLabel.textContent = 'PASSWORD';
passwordBox.appendChild(passwordInput);
passwordBox.appendChild(passwordLabel);

const submitButton = document.createElement('button');
submitButton.setAttribute('id', 'loginSubmit');
submitButton.setAttribute('type', 'submit');
for (let i = 0; i < 4; i++) {
  const span = document.createElement('span');
  submitButton.appendChild(span);
}
submitButton.textContent = 'LOG IN';

const signupLink = document.createElement('a');
signupLink.setAttribute('href', '#');
signupLink.setAttribute('id', 'signupLink');
signupLink.innerHTML = "Don't have an account? Sign up."

form.appendChild(usernameBox);
form.appendChild(passwordBox);
form.appendChild(submitButton);
loginBox.appendChild(heading);
loginBox.appendChild(form);
loginBox.appendChild(signupLink);
document.body.appendChild(loginBox);


