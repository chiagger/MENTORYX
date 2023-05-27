
import "./registration.css"
import "normalize.css"

const container = document.createElement('div');
container.className = 'container';

const loginBox = document.createElement('div');
loginBox.className = 'login-box';

const heading = document.createElement('h2');
heading.textContent = 'Sign up';
loginBox.appendChild(heading);

const form = document.createElement('form');

function createUserBox(inputType, labelText) {
  const userBox = document.createElement('div');
  userBox.className = 'user-box';

  const input = document.createElement('input');
  input.type = inputType;
  input.name = '';
  input.required = true;
  userBox.appendChild(input);

  const label = document.createElement('label');
  label.textContent = labelText;
  userBox.appendChild(label);

  return userBox;
}

form.appendChild(createUserBox('text', 'FIRST NAME'));
form.appendChild(createUserBox('text', 'LAST NAME'));
form.appendChild(createUserBox('email', 'E-MAIL'));
form.appendChild(createUserBox('password', 'PASSWORD'));
form.appendChild(createUserBox('password', 'REPEAT PASSWORD'));

const signUpLink = document.createElement('a');
signUpLink.href = '#';

for (let i = 0; i < 4; i++) {
  const span = document.createElement('span');
  signUpLink.appendChild(span);
}

signUpLink.appendChild(document.createTextNode('SIGN UP'));

form.appendChild(signUpLink);
loginBox.appendChild(form);

container.appendChild(loginBox);
document.body.appendChild(container);

