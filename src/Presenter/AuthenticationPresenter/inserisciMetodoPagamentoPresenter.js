//connect to firebase
import { getAuth, createUserWithEmailAndPassword, getUser } from "firebase/auth";
import { getDatabase, set, get, update, remove, ref, child } from 'firebase/database';
import { app } from '../firebaseConfig.js';
const auth = getAuth(app);
const db = getDatabase();

import MetodoPagamento from '../../Model/MetodoPagamento.js';


//FAKING credit card insertion
function generateCreditCardNumber() {
    const BIN = '123456'; // Replace with your desired BIN (Bank Identification Number)
    const LENGTH = 16; // Length of the credit card number excluding the BIN

    let randomNumber = '';

    // Generate random digits for the credit card number
    for (let i = 0; i < LENGTH; i++) {
        const digit = Math.floor(Math.random() * 10);
        randomNumber += digit;
    }

    const creditCardNumber = BIN + randomNumber;

    return creditCardNumber;
}

function generateCreditCardExpiryDate() {
    const currentYear = new Date().getFullYear();
    const minimumYear = currentYear + 1; // Set the minimum year to next year
    const maximumYear = currentYear + 10; // Set the maximum year to 10 years from now

    const randomYear = Math.floor(Math.random() * (maximumYear - minimumYear + 1)) + minimumYear;
    const randomMonth = Math.floor(Math.random() * 12) + 1; // Generate a random month from 1 to 12

    // Format the month with leading zero if necessary
    const formattedMonth = randomMonth < 10 ? `0${randomMonth}` : randomMonth.toString();

    // Concatenate the year and month to form the expiry date string
    const expiryDate = `${formattedMonth}/${randomYear}`;

    return expiryDate;
}

function generateCreditCardCVV() {
    const minCVV = 100; // Minimum CVV value (inclusive)
    const maxCVV = 999; // Maximum CVV value (inclusive)

    const randomCVV = Math.floor(Math.random() * (maxCVV - minCVV + 1)) + minCVV;

    return randomCVV.toString();
}

window.onload = function (e) {
    var number = generateCreditCardNumber();
    const numberDOM = document.getElementById("cardNumber");
    numberDOM.value = number;
    var expiryDate = generateCreditCardExpiryDate();
    const expiryDOM = document.getElementById("expiryDate");
    expiryDOM.value = expiryDate;
    var CVV = generateCreditCardCVV();
    const CVVDOM = document.getElementById("cvv");
    CVVDOM.value = CVV;
}

//Inserting payment method info to firebase
const creditCardForm = document.getElementById('creditCardForm');
creditCardForm.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var cardholder = document.getElementById("cardHolder").value;
    var number = document.getElementById("cardNumber").value;
    var expiryDate = document.getElementById("expiryDate").value;
    var CVV = document.getElementById("cvv").value;
    var uid = auth.currentUser.uid;


    let metodoPagamento;
    metodoPagamento = new MetodoPagamento(cardholder, number, expiryDate, CVV);
    const metodoPagamentoJSON = JSON.stringify(metodoPagamento);


    update(ref(db, "Users/" + uid), {
        MetodoPagamento: metodoPagamentoJSON,
    })
        .then(() => {
            redirectUserRegistration(uid);
        })
        .catch((error) => {
            alert(error);
        })

});

//redirect to login if student, to insert titolo di studio if ascoltatore
function redirectUserRegistration(uid) {
    const myUserData = ref(db);
    get(child(myUserData, "Users/" + uid))
        .then((snapshot) => {
            if (snapshot.exists()) {
                if (snapshot.val().Category == "Studente") {
                    window.location.href = 'auth.html';
                } else if (snapshot.val().Category == "Ascoltatore") {
                    window.location.href = 'viewInserisciTitoloAscoltatore.html';
                } else {
                    alert("User data not found");
                }
            }
        })
        .catch((error) => { alert(error) })
}