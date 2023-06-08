import "./homeAdmin.css";
import log from '../../Model/ModelLog/Log';
import Materia from '../../Model/Materia';
import Ascoltatore from '../../Model/Ascoltatore'

import { getAuth, signInWithEmailAndPassword, getUser } from "firebase/auth";
import { getDatabase, child, get, update, remove, ref, onValue } from 'firebase/database';
import { app } from '../../Presenter/firebaseConfig';
import { bindAll } from "lodash";
const db = getDatabase();


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

// Append header, tabs container, and empty container to the document body
document.body.appendChild(header);
document.body.appendChild(tabsContainer);
document.body.appendChild(emptyContainer);


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


//materieAscoltatore view
const assegnaMaterieBtn = document.getElementById("assegnaMaterie")
assegnaMaterieBtn.addEventListener("click", () => { displayAscoltatori() });



async function getListenersWithNoMaterie() {
    const userList = await getListeners();
    const ascoltatoreList = [];

    for (let i = 0; i < userList.length; i++) {
        var competenza = JSON.parse(userList.at(i).Ascoltatore)._materieCompetenzaList;
        if (!competenza.length) {
            ascoltatoreList.push(userList.at(i));
        }
    }
    return ascoltatoreList;
}

var ascoltatoriList = await getListenersWithNoMaterie();
var ascoltatore = JSON.parse(ascoltatoriList.at(0).Ascoltatore);
//ascoltatore._materieCompetenzaList = Materia.Matematica;
//ascoltatore._materieCompetenzaList = Materia.LinguaItaliana;
//ascoltatore.setmaterieCompetenzaList("italiano");

async function displayAscoltatori() {
    removeContainerChildren(emptyContainer);
    var innerContainer = document.createElement("div");
    removeContainerChildren(innerContainer);
    //removeContainerChildren(innerContainer);
    innerContainer.id = "innerContainer";
    emptyContainer.appendChild(innerContainer);
    var ascoltatoriList = await getListenersWithNoMaterie();

    for (let i = 0; i < ascoltatoriList.length; i++) {
        var ascoltatore = JSON.parse(ascoltatoriList.at(i).Ascoltatore);
        var element = document.createElement("div");
        element.classList.add("element");
        element.classList.add("ascoltatore");
        var fullName = document.createElement("div");
        fullName.classList.add("name");
        fullName.innerHTML = ascoltatore.firstName + " " + ascoltatore.lastName;
        element.appendChild(fullName);

        var titoliContainer = document.createElement("div");
        titoliContainer.classList.add("titoliContainer");
        var titoliLabel = document.createElement("div");
        titoliLabel.innerHTML = "Titoli di Studio:"
        var titoliStudioList = ascoltatore.titoliStudioList;
        titoliContainer.appendChild(titoliLabel);
        if (!titoliStudioList.length) {
            var titoloElement = document.createElement("div");
            titoloElement.classList.add("titoloElement");
            titoloElement.innerHTML = titoliStudioList._tipoTitolo
                + " in " + titoliStudioList._ambitoTitolo + " conseguito il "
                + titoliStudioList._dataConseguimentoTitolo;
            titoliContainer.appendChild(titoloElement);
        } else {
            for (let j = 0; j < titoliStudioList.length; j++) {
                var titoloElement = document.createElement("div");
                titoloElement.classList.add("titoloElement");
                titoloElement.innerHTML = titoliStudioList.at(j)._tipoTitolo
                    + " in " + titoliStudioList.at(j)._ambitoTitolo + " conseguito il "
                    + titoliStudioList.at(j)._dataConseguimentoTitolo;
                titoliContainer.appendChild(titoloElement);
            }
        }

        var assegnaButton = document.createElement("button");
        assegnaButton.setAttribute('id', 'assegnaBtn');
        assegnaButton.innerHTML = "Assegna materie";


        element.appendChild(titoliContainer);
        element.appendChild(assegnaButton);

        innerContainer.appendChild(element);

    }
}

async function getUsersFromDatabase() {
    const usersRef = ref(db, 'Users');

    return new Promise((resolve, reject) => {
        onValue(usersRef, (snapshot) => {
            const users = [];
            const snapshotValue = snapshot.val();

            if (snapshotValue) {
                Object.entries(snapshotValue).forEach(([uid, userData]) => {
                    const user = { uid, ...userData }; // Include the UID in the user object
                    users.push(user);
                });
            }
            resolve(users);
        }, (error) => {
            reject(error);
        });
    });
}


async function getListeners() {
    const userList = await getUsersFromDatabase();
    const ascoltatoreList = [];

    for (let i = 0; i < userList.length; i++) {
        var uid = userList.at(i).uid;
        var category = await getUserCategory(uid);
        if (category === "Ascoltatore") {

            ascoltatoreList.push(userList.at(i));
        }
    }
    return ascoltatoreList;
}

function getUserCategory(uid) {
    const myUserData = ref(db);
    return get(child(myUserData, "Users/" + uid))
        .then((snapshot) => {
            const snapshotValue = snapshot.val();
            const childKeys = Object.keys(snapshotValue);
            const category = childKeys[0];
            return category;
        })
        .catch((error) => {
            alert(error);
            throw error; // Propagate the error further
        });
}

