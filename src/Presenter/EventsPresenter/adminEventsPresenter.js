import { getAuth, signOut } from "firebase/auth";
import { getDatabase, get, update, ref, child, onValue } from 'firebase/database';
import { app } from '../firebaseConfig.js';
const auth = getAuth(app);
import Materia from '../../Model/Materia';
import Ascoltatore from "../../Model/Ascoltatore.js";
import LogPresenter from "../LogPresenter/LogPresenter.js";
const log = new LogPresenter();



const db = getDatabase();
const emptyContainer = document.getElementById("empty-container");

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
        var titoliStudioList = ascoltatore._titoliStudioList;
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
    //Open assegna popup
    const assegnaBtns = document.querySelectorAll('#assegnaBtn');
    const assegnaBtnsArray = Array.from(assegnaBtns);
    for (let k = 0; k < assegnaBtnsArray.length; k++) {
        assegnaBtnsArray.at(k).addEventListener('click', () => {
            openPopup();
            const submitAssegnaBtn = document.getElementById("setMaterie");
            submitAssegnaBtn.addEventListener("click", () => {
                submitForm(ascoltatoriList.at(k));
            })
        })
    };
}

function getEnumValues(enumObj) {
    const values = [];

    for (const prop in enumObj) {
        if (Object.prototype.hasOwnProperty.call(enumObj, prop)) {
            const value = enumObj[prop];
            values.push(value);
        }
    }

    return values;
}


function openPopup() {
    // Clear previous options
    const dropdown = document.getElementById('dropdown');
    dropdown.innerHTML = '';

    const enumValues = getEnumValues(Materia);
    // Add options to the dropdown
    for (let i = 0; i < enumValues.length; i++) {
        const option = document.createElement('option');
        option.text = enumValues[i];
        dropdown.add(option);
    }

    // Show the popup form
    document.getElementById('popupForm').style.display = 'block';
}

function submitForm(ascoltatoreuid) {
    const ascoltatore = JSON.parse(ascoltatoreuid.Ascoltatore);
    var uid = ascoltatoreuid.uid;
    // Get selected options
    const dropdown = document.getElementById('dropdown');
    const selectedOptions = [...dropdown.selectedOptions].map(option => option.value);
    // Display selected options

    for (let i = 0; i < selectedOptions.length; i++) {
        ascoltatore._materieCompetenzaList.push(getEnumValue(Materia, selectedOptions.at(i)));
    }
    updateDB(ascoltatore, uid);
    log.assignedMaterieCompetenza(ascoltatore);

    // Hide the popup form
    document.getElementById('popupForm').style.display = 'none';
}

function updateDB(ascoltatore, uid) {
    //è l'uid dell'amministratore.. non dell'ascoltatore
    const utenteJSON = JSON.stringify(ascoltatore);

    update(ref(db, "Users/" + uid), {
        Ascoltatore: utenteJSON,
    })
        .then(() => {
            displayAscoltatori();
        })
        .catch((error) => {
            alert(error);
        })
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




function getEnumValue(enumObj, key) {
    const reverseMapping = {};

    for (const prop in enumObj) {
        if (Object.prototype.hasOwnProperty.call(enumObj, prop)) {
            const value = enumObj[prop];
            reverseMapping[value] = prop;
        }
    }

    return enumObj[reverseMapping[key]];
}

function removeContainerChildren(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}