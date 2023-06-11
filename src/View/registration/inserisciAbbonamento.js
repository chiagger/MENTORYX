import "./inserisciAbbonamento.css"
import '../normalize.css';

// Dynamically generated DOM
const subscriptionForm = document.createElement('form');
subscriptionForm.classList.add('login-box');

const title = document.createElement('h2');
title.classList.add("heading");
title.textContent = "Seleziona l'abbonamento desiderato";
subscriptionForm.appendChild(title);

const monthlyOption = createSubscriptionOption('MENSILE', '20€ al mese a partire da oggi');
subscriptionForm.appendChild(monthlyOption);

const annualOption = createSubscriptionOption('ANNUALE', '220€ all\'anno a partire da oggi');
subscriptionForm.appendChild(annualOption);

// Create the submit button
const submitButton = document.createElement('button');
submitButton.setAttribute('type', 'submit');
submitButton.setAttribute('id', 'signupSubmit');
submitButton.innerHTML = 'Paga';
subscriptionForm.appendChild(submitButton);

const skipLink = document.createElement('a');
skipLink.id = "skipLink";
skipLink.setAttribute('href', '#');
skipLink.innerHTML = 'Salta per ora';
subscriptionForm.appendChild(skipLink);

document.body.appendChild(subscriptionForm);

function createSubscriptionOption(title, description) {
    const optionDiv = document.createElement('div');
    optionDiv.classList.add('user-box');

    const optionInput = document.createElement('input');
    optionInput.setAttribute('type', 'radio');
    optionInput.setAttribute('name', 'subscription');
    optionInput.setAttribute('id', title.toLowerCase());
    optionInput.setAttribute('required', '');
    optionDiv.appendChild(optionInput);

    const optionLabel = document.createElement('label');
    optionLabel.setAttribute('for', title.toLowerCase());
    optionLabel.textContent = title;
    optionDiv.appendChild(optionLabel);

    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = description;
    optionDiv.appendChild(descriptionParagraph);

    return optionDiv;
}
