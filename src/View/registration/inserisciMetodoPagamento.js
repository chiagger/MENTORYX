import "./inserisciMetodoPagamento.css";
import '../normalize.css';

// Dynamically generated DOM
const loginBox = document.createElement('div');
loginBox.classList.add('login-box');

const heading = document.createElement('h2');
heading.classList.add("heading");

const text = document.createElement('h2');
text.classList.add("text");
text.textContent = 'Insert Credit Card Details';


const headingLogo = document.createElement('img');
headingLogo.src = "https://i.imgur.com/UTazMbC.png";
headingLogo.setAttribute('id', 'headinglogo');
heading.appendChild(headingLogo);
heading.appendChild(text);
loginBox.appendChild(heading);

const form = document.createElement('form');
form.setAttribute('id', 'creditCardForm');
loginBox.appendChild(form);


const cardholderDiv = document.createElement('div');
cardholderDiv.classList.add('user-box');
form.appendChild(cardholderDiv);

const cardholderInput = document.createElement('input');
cardholderInput.setAttribute('type', 'text');
cardholderInput.setAttribute('id', 'cardHolder');
cardholderInput.setAttribute('required', '');
cardholderDiv.appendChild(cardholderInput);

const cardholderLabel = document.createElement('label');
cardholderLabel.textContent = 'Card Holder Name';
cardholderDiv.appendChild(cardholderLabel);

const cardNumberDiv = document.createElement('div');
cardNumberDiv.classList.add('user-box');
form.appendChild(cardNumberDiv);

const cardNumberInput = document.createElement('input');
cardNumberInput.setAttribute('type', 'text');
cardNumberInput.setAttribute('id', 'cardNumber');
cardNumberInput.setAttribute('required', '');
cardNumberDiv.appendChild(cardNumberInput);

const cardNumberLabel = document.createElement('label');
cardNumberLabel.textContent = 'Card Number';
cardNumberDiv.appendChild(cardNumberLabel);

const expiryDateDiv = document.createElement('div');
expiryDateDiv.classList.add('user-box');
form.appendChild(expiryDateDiv);

const expiryDateInput = document.createElement('input');
expiryDateInput.setAttribute('type', 'text');
expiryDateInput.setAttribute('id', 'expiryDate');
expiryDateInput.setAttribute('required', '');
expiryDateDiv.appendChild(expiryDateInput);

const expiryDateLabel = document.createElement('label');
expiryDateLabel.textContent = 'Expiry Date';
expiryDateDiv.appendChild(expiryDateLabel);

const cvvDiv = document.createElement('div');
cvvDiv.classList.add('user-box');
form.appendChild(cvvDiv);

const cvvInput = document.createElement('input');
cvvInput.setAttribute('type', 'text');
cvvInput.setAttribute('id', 'cvv');
cvvInput.setAttribute('required', '');
cvvDiv.appendChild(cvvInput);

const cvvLabel = document.createElement('label');
cvvLabel.textContent = 'CVV';
cvvDiv.appendChild(cvvLabel);

// Create the submit button
const submitButton = document.createElement('input');
submitButton.setAttribute('type', 'submit');
submitButton.setAttribute('value', 'SUBMIT');
submitButton.setAttribute('id', 'creditCardSubmit');
form.appendChild(submitButton);

document.body.appendChild(loginBox);

