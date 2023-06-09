import "./homeAdmin.css";
import log from '../../Model/ModelLog/Log';
import Materia from '../../Model/Materia';
import { getAuth } from "firebase/auth";

import { getDatabase, child, get, update, ref, onValue } from 'firebase/database';

import { app } from '../../Presenter/firebaseConfig';
const db = getDatabase();
const auth = getAuth(app);



const head = document.querySelector("head");
const cssLink = document.createElement('link');
cssLink.rel = 'stylesheet';
cssLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
head.appendChild(cssLink);



// Create header element
const header = document.createElement('header');
header.id = 'header';

// Create logo image element
const logo = document.createElement('img');
logo.id = 'logo';
logo.src = 'https://i.imgur.com/UTazMbC.png';

// Create navigation element
const navigation = document.createElement('nav');
navigation.id = 'navigation';

// Create profile icon container
const profileIcon = document.createElement('div');
profileIcon.setAttribute('id', 'profile-icon');

// Create profile image element
const profileImage = document.createElement('img');
profileImage.id = 'profile-image';
profileImage.src = 'https://img.icons8.com/?size=512&id=8xJVtjb4kB9s&format=png';

// Create profile dropdown container
const profileDropdown = document.createElement('div');
profileDropdown.id = 'profile-dropdown';

// Create settings link element
const settingsLink = document.createElement('a');
settingsLink.id = 'settingsLink';
settingsLink.href = '#';
settingsLink.innerHTML = '<i class="fas fa-cog"></i> Impostazioni';

// Create logout link element
const logoutLink = document.createElement('a');
logoutLink.id = 'logoutLink';
logoutLink.href = '#';
logoutLink.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';

// Append child elements to their respective parents
profileDropdown.appendChild(settingsLink);
profileDropdown.appendChild(logoutLink);

profileIcon.appendChild(profileImage);
profileIcon.appendChild(profileDropdown);

navigation.appendChild(profileIcon);

header.appendChild(logo);
header.appendChild(navigation);

// Create an empty container element
const emptyContainer = document.createElement('div');
emptyContainer.id = 'empty-container';

// Create tabs container
const tabsContainer = document.createElement('div');
tabsContainer.id = 'tabs-container';

// Create Log Eventi tab
const logEventiTab = document.createElement('div');
logEventiTab.classList.add('tab');
logEventiTab.id = 'logEventi';
logEventiTab.textContent = 'Log Eventi';

// Create Log Accessi tab
const logAccessiTab = document.createElement('div');
logAccessiTab.classList.add('tab');
logAccessiTab.id = 'logAccessi';
logAccessiTab.textContent = 'Log Accessi';

// Create Assegna Materie tab
const assegnaMaterieTab = document.createElement('div');
assegnaMaterieTab.classList.add('tab');
assegnaMaterieTab.id = "assegnaMaterie"
assegnaMaterieTab.textContent = 'Assegna Materie';

// Append tabs to the tabs container
tabsContainer.appendChild(logEventiTab);
tabsContainer.appendChild(logAccessiTab);
tabsContainer.appendChild(assegnaMaterieTab);


// Create the pop-up form elements
const popupForm = document.createElement('div');
popupForm.id = 'popupForm';
popupForm.className = 'popup';
popupForm.style.display = 'none';

const dropdown = document.createElement('select');
dropdown.id = 'dropdown';
dropdown.multiple = true;

const submitButton = document.createElement('button');
submitButton.setAttribute('id', 'setMaterie');
submitButton.textContent = 'Submit';

// Append the elements to the pop-up form
popupForm.appendChild(dropdown);
popupForm.appendChild(submitButton);

// Append header, tabs container, and empty container to the document body
document.body.appendChild(header);
document.body.appendChild(tabsContainer);
document.body.appendChild(emptyContainer);
document.body.appendChild(popupForm);


//view logs
const logEventiBtn = document.getElementById("logEventi")
logEventiBtn.addEventListener("click", () => { displayLog("Evento") });

const logAccessiBtn = document.getElementById("logAccessi")
logAccessiBtn.addEventListener("click", () => { displayLog("Accesso") });

function displayLog(tipo) {
    removeContainerChildren(emptyContainer);
    var logList = log.readRecordList(tipo);

    for (var i = 0; i < logList.length; i++) {
        var logDOM = document.createElement("div");
        logDOM.classList.add("log");
        logDOM.innerHTML = logList.at(i).descrizione;
        emptyContainer.appendChild(logDOM);
    }
}

function removeContainerChildren(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}