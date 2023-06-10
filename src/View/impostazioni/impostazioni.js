import './impostazioni.css';



window.onload = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        notSignedIn();
    }
}

function notSignedIn() {
    // Display alert message
    alert("You are not signed in");

    // Wait for 3 seconds (3000 milliseconds)
    setTimeout(function () {
        // Redirect to index.html
        window.location.href = "index.html";
    }, 500);
}

const container = document.createElement('div');
container.classList.add('container');

const heading = document.createElement('h2');
heading.textContent = 'Modifica Password';

const newPasswordInputGroup = createInputGroup('new-password', 'Nuova password:', 'Inserisci la nuova password');
const confirmPasswordInputGroup = createInputGroup('confirm-password', 'Ripeti nuova password:', 'Ripeti la nuova password');

const submitButton = document.createElement('button');
submitButton.setAttribute('id', 'submit-button');
submitButton.className = 'button';
submitButton.textContent = 'Salva';

const errorMessage = document.createElement('div');
errorMessage.id = 'error-message';

container.appendChild(heading);
container.appendChild(newPasswordInputGroup);
container.appendChild(confirmPasswordInputGroup);
container.appendChild(submitButton);
container.appendChild(errorMessage);

// Function to create an input group
function createInputGroup(id, label, placeholder) {
    const inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';

    const inputLabel = document.createElement('label');
    inputLabel.setAttribute('for', id);
    inputLabel.textContent = label;

    const input = document.createElement('input');
    input.id = id;
    input.type = 'password';
    input.placeholder = placeholder;

    inputGroup.appendChild(inputLabel);
    inputGroup.appendChild(input);

    if (id === 'new-password') {
        const passwordIndicator = createPasswordIndicator();
        inputGroup.appendChild(passwordIndicator);
    }

    return inputGroup;
}

// Function to create the password strength indicator
function createPasswordIndicator() {
    const passwordIndicator = document.createElement('span');
    passwordIndicator.id = 'password-indicator';

    const lengthIndicator = document.createElement('span');
    lengthIndicator.id = 'indicator-length';

    const uppercaseIndicator = document.createElement('span');
    uppercaseIndicator.id = 'indicator-uppercase';

    const specialIndicator = document.createElement('span');
    specialIndicator.id = 'indicator-special';

    passwordIndicator.appendChild(lengthIndicator);
    passwordIndicator.appendChild(uppercaseIndicator);
    passwordIndicator.appendChild(specialIndicator);

    return passwordIndicator;
}

document.body.appendChild(container);
