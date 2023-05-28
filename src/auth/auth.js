import './auth.css';

// Create the login box container element
const loginBox = document.createElement('div');
loginBox.classList.add('login-box');

// Create the heading element
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

// Create the form element
const form = document.createElement('form');

// Create the first user box element for the username input
const usernameBox = document.createElement('div');
usernameBox.classList.add('user-box');
const usernameInput = document.createElement('input');
usernameInput.type = 'text';
usernameInput.name = '';
usernameInput.required = true;
const usernameLabel = document.createElement('label');
usernameLabel.textContent = 'USERNAME OR EMAIL';
usernameBox.appendChild(usernameInput);
usernameBox.appendChild(usernameLabel);

// Create the second user box element for the password input
const passwordBox = document.createElement('div');
passwordBox.classList.add('user-box');
const passwordInput = document.createElement('input');
passwordInput.type = 'password';
passwordInput.name = '';
passwordInput.required = true;
const passwordLabel = document.createElement('label');
passwordLabel.textContent = 'PASSWORD';
passwordBox.appendChild(passwordInput);
passwordBox.appendChild(passwordLabel);

// Create the submit button element
const submitButton = document.createElement('a');
submitButton.setAttribute('id', 'login');
submitButton.setAttribute('type', 'submit');
for (let i = 0; i < 4; i++) {
  const span = document.createElement('span');
  submitButton.appendChild(span);
}
submitButton.textContent = 'LOG IN';

const signupLink = document.createElement('a');
signupLink.setAttribute('href', '#');
signupLink.setAttribute('id', 'signup');
signupLink.innerHTML = "Don't have an account? Sign up."

// Append all the elements to the appropriate parent elements
form.appendChild(usernameBox);
form.appendChild(passwordBox);
form.appendChild(submitButton);
loginBox.appendChild(heading);
loginBox.appendChild(form);
loginBox.appendChild(signupLink);

// Append the login box container to the document body or any desired parent element
document.body.appendChild(loginBox);


//redirect to login page
signupLink.addEventListener("click", handleSignup);

function handleSignup() {
  window.location.href = 'registration.html';
}