import "./inserisciTitoloAscoltatore.css";
import '../normalize.css';

// Dynamically generated DOM
const loginBox = document.createElement('div');
loginBox.classList.add('login-box');

const heading = document.createElement('h2');
heading.classList.add("heading");

const text = document.createElement('h2');
text.classList.add("text");
text.textContent = 'Inserisci il tuo Titolo di Studio';

const headingLogo = document.createElement('img');
headingLogo.src = "https://i.imgur.com/UTazMbC.png";
headingLogo.setAttribute('id', 'headinglogo');
heading.appendChild(headingLogo);
heading.appendChild(text);
loginBox.appendChild(heading);

const form = document.createElement('form');
form.setAttribute('id', 'creditCardForm');
loginBox.appendChild(form);

const nomeTitoloDiv = document.createElement('div');
nomeTitoloDiv.classList.add('user-box');

const nomeTitoloInput = document.createElement('input');
nomeTitoloInput.setAttribute('type', 'text');
nomeTitoloInput.setAttribute('id', 'nomeTitolo');
nomeTitoloInput.setAttribute('required', '');
nomeTitoloDiv.appendChild(nomeTitoloInput);

const nomeTitoloLabel = document.createElement('label');
nomeTitoloLabel.textContent = 'TIPO DI TITOLO (DIPLOMA, LAUREA...)';
nomeTitoloDiv.appendChild(nomeTitoloLabel);
form.appendChild(nomeTitoloDiv);

const ambitoTitoloDiv = document.createElement('div');
ambitoTitoloDiv.classList.add('user-box');

const ambitoTitoloInput = document.createElement('input');
ambitoTitoloInput.setAttribute('type', 'text');
ambitoTitoloInput.setAttribute('id', 'ambitoTitolo');
ambitoTitoloInput.setAttribute('required', '');
ambitoTitoloDiv.appendChild(ambitoTitoloInput);

const ambitoTitoloLabel = document.createElement('label');
ambitoTitoloLabel.textContent = 'AMBITO (TIPO DI LICEO, FACOLTÀ...)';
ambitoTitoloDiv.appendChild(ambitoTitoloLabel);
form.appendChild(ambitoTitoloDiv);

const pressoDiv = document.createElement('div');
pressoDiv.classList.add('user-box');

const pressoInput = document.createElement('input');
pressoInput.setAttribute('type', 'text');
pressoInput.setAttribute('id', 'presso');
pressoInput.setAttribute('required', '');
pressoDiv.appendChild(pressoInput);

const pressoLabel = document.createElement('label');
pressoLabel.textContent = 'PRESSO (SCUOLA, UNIVERSITÀ...)';
pressoDiv.appendChild(pressoLabel);
form.appendChild(pressoDiv);

const dataConseguimentoDiv = document.createElement('div');
dataConseguimentoDiv.classList.add('user-box');
form.appendChild(dataConseguimentoDiv);

const dataConseguimentoInput = document.createElement('input');
dataConseguimentoInput.setAttribute('type', 'text');
dataConseguimentoInput.setAttribute('id', 'dataConseguimento');
dataConseguimentoInput.setAttribute('required', '');
dataConseguimentoDiv.appendChild(dataConseguimentoInput);

const dataConseguimentoLabel = document.createElement('label');
dataConseguimentoLabel.textContent = 'DATA DI CONSEGUIMENTO';
dataConseguimentoDiv.appendChild(dataConseguimentoLabel);

const assistenzaDiv = document.createElement('div');
assistenzaDiv.innerHTML = "Se vuoi aggiungere un altro titolo di studio, contatta l'assistenza dalle impostazioni.";
assistenzaDiv.classList.add("assistenza");
loginBox.appendChild(assistenzaDiv);

// Create the submit button
const submitButton = document.createElement('input');
submitButton.setAttribute('type', 'submit');
submitButton.setAttribute('value', 'INVIA');
submitButton.setAttribute('id', 'creditCardSubmit');
form.appendChild(submitButton);

document.body.appendChild(loginBox);

