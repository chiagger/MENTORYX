//connect to firebase
import { getAuth } from "firebase/auth";
import { getDatabase, get, update, ref, child } from 'firebase/database';
import { app } from '../firebaseConfig.js';
const auth = getAuth(app);
const db = getDatabase();

import TitoloStudio from '../../Model/TitoloStudio.js';
import StudenteStrategy from './StudenteStrategy.js';
import AscoltatoreStrategy from "./AscoltatoreStrategy.js";
import UserService from './UserService.js';
var service = new UserService();

//valida data di conseguimento
function validateDataConseguimento() {
    const dataConseguimentoInput = document.getElementById('dataConseguimento');
    const dateParts = dataConseguimentoInput.value.split('/');
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based in JavaScript Date object
    const year = parseInt(dateParts[2], 10);
    const dataConseguimento = new Date(year, month, day);
    const today = new Date();

    if (dataConseguimento >= today) {
        alert("La data di conseguimento deve essere precedente alla data odierna.");
    } else {
        saveTitoloToDatabase();
    }
}

async function saveTitoloToDatabase() {
    var nome = document.getElementById("nomeTitolo").value;
    var ambito = document.getElementById("ambitoTitolo").value;
    var presso = document.getElementById("presso").value;
    var dataConseguimento = document.getElementById("dataConseguimento").value;
    var uid = auth.currentUser.uid;


    let titoloStudio;
    titoloStudio = new TitoloStudio(nome, ambito, presso, dataConseguimento);

    const utente = await getUtenteObject(uid);
    const category = await getUserCategory(uid);
    utente._titoliStudioList.push(titoloStudio); //SYNTAX FOR SETTERS!

    if (category === "Studente") {
        service.setStrategy(new StudenteStrategy());
    } else {
        service.setStrategy(new AscoltatoreStrategy());
    }
    service.inserisciTitoloStudio(uid, utente);
}




function getUtenteObject(uid) {
    const myUserData = ref(db);
    return get(child(myUserData, "Users/" + uid))
        .then((snapshot) => {
            const snapshotValue = snapshot.val();
            const firstChildValue = Object.values(snapshotValue)[0];
            const utente = JSON.parse(firstChildValue);
            return utente;
        })
        .catch((error) => {
            alert(error);
            throw error; // Propagate the error further
        });
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

//Inserting titolo di studio info to firebase
const creditCardForm = document.getElementById('creditCardForm');
creditCardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    validateDataConseguimento();
});
