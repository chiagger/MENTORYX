//connect to firebase
import { getAuth, createUserWithEmailAndPassword, getUser } from "firebase/auth";
import { getDatabase, set, get, update, remove, ref, child } from 'firebase/database';
import { app } from '../firebaseConfig.js';
const auth = getAuth(app);
const db = getDatabase();

import TitoloStudio from '../../Model/TitoloStudio.js';

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

function saveTitoloToDatabase() {
    var nome = document.getElementById("nomeTitolo").value;
    var ambito = document.getElementById("ambitoTitolo").value;
    var presso = document.getElementById("presso").value;
    var dataConseguimento = document.getElementById("dataConseguimento").value;

    let titoloStudio;
    titoloStudio = new TitoloStudio(nome, ambito, presso, dataConseguimento);
    const customTitoloJSON = JSON.stringify(titoloStudio);

    var uid = auth.currentUser.uid;

    update(ref(db, "Users/" + uid), {
        TitoloStudio: customTitoloJSON,
    })
        .then(() => {
            window.location.href = "auth.html";
        })
        .catch((error) => {
            alert(error);
        })
}


//Inserting titolo di studio info to firebase
const creditCardForm = document.getElementById('creditCardForm');
creditCardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    validateDataConseguimento();
});
