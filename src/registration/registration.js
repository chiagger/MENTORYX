import './registration.css';
import '../normalize.css';

var loginBox = document.createElement('div');
loginBox.className = 'login-box';

var heading = document.createElement('h2');
heading.textContent = 'Sign up';
loginBox.appendChild(heading);

var form = document.createElement('form');

// Function to create a user box element
function createUserBox(inputType, labelContent) {
  var userBox = document.createElement('div');
  userBox.className = 'user-box';

  var input = document.createElement('input');
  input.type = inputType;
  input.name = '';
  input.required = true;
  userBox.appendChild(input);

  var label = document.createElement('label');
  label.textContent = labelContent;
  userBox.appendChild(label);

  return userBox;
}

form.appendChild(createUserBox('text', 'FIRST NAME'));
form.appendChild(createUserBox('password', 'LAST NAME'));
form.appendChild(createUserBox('password', 'E-MAIL'));
form.appendChild(createUserBox('password', 'PASSWORD'));
form.appendChild(createUserBox('password', 'REPEAT PASSWORD'));

var signUpLink = document.createElement('a');
signUpLink.href = '#';

for (var i = 0; i < 4; i++) {
  var span = document.createElement('span');
  signUpLink.appendChild(span);
}

signUpLink.appendChild(document.createTextNode('SIGN UP'));

form.appendChild(signUpLink);
loginBox.appendChild(form);

// Add the login box to the document body or another container element
document.body.appendChild(loginBox);
