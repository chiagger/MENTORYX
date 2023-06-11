//connect to firebase
import { getAuth } from "firebase/auth";
import { getDatabase, get, update, ref, child } from 'firebase/database';
import { app } from '../firebaseConfig.js';
const auth = getAuth(app);
const db = getDatabase();

import Abbonamento from '../../Model/Abbonamento.js';
import StudenteStrategy from './StudenteStrategy.js';
import AscoltatoreStrategy from "./AscoltatoreStrategy.js";
import UserService from './UserService.js';
var service = new UserService();


async function saveAbbonamentoToDatabase() {
    const selectedOption = document.querySelector('input[name="subscription"]:checked').id;


    let abbonamento;
    var uid = auth.currentUser.uid;
    if (selectedOption === "mensile") {
        abbonamento = Abbonamento.Mensile;
    } else if (selectedOption === "annuale") {
        abbonamento = Abbonamento.Annuale;
    }

    const utente = await getUtenteObject(uid);
    const category = await getUserCategory(uid);

    if (category === "Studente") {
        utente._abbonamento = abbonamento;
        service.setStrategy(new StudenteStrategy());
    } else {
        service.setStrategy(new AscoltatoreStrategy());
    }
    service.inserisciAbbonamento(uid, utente);
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
const signupSubmit = document.getElementById('signupSubmit');
signupSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    saveAbbonamentoToDatabase();
});

const skipLink = document.getElementById("skipLink");
skipLink.addEventListener("click", () => {
    window.location.href = "auth.html";
})