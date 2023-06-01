import { getAuth, updatePassword } from "firebase/auth";
import { getDatabase, set, get, update, remove, ref, child } from 'firebase/database';
import { app } from '../firebaseConfig.js';
const auth = getAuth(app);
const db = getDatabase(app);

import { User, getEmail } from '../../Model/User.js';
import { Studente } from '../../Model/Studente.js';
import { Ascoltatore } from '../../Model/Ascoltatore.js';

window.addEventListener('load', function () {
    var submitButton = document.getElementById('submit-button');
    var newPasswordInput = document.getElementById('new-password');
    var indicatorLength = document.getElementById('indicator-length');
    var indicatorUppercase = document.getElementById('indicator-uppercase');
    var indicatorSpecial = document.getElementById('indicator-special');
    var errorMessage = document.getElementById('error-message');


    newPasswordInput.addEventListener('input', function () {
        var password = newPasswordInput.value;
        var hasLength = password.length >= 8;
        var hasUppercase = /[A-Z]/.test(password);
        var hasSpecial = /[!@#$%^&*]/.test(password);

        indicatorLength.className = hasLength ? 'valid' : 'invalid';
        indicatorUppercase.className = hasUppercase ? 'valid' : 'invalid';
        indicatorSpecial.className = hasSpecial ? 'valid' : 'invalid';
    });

    submitButton.addEventListener('click', function () {
        var uid = auth.currentUser.uid;
        const user = auth.currentUser;
        var newPassword = document.getElementById('new-password').value;
        var confirmPassword = document.getElementById('confirm-password').value;


        if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[!@#$%^&*]/.test(newPassword)) {
            errorMessage.textContent = 'La nuova password deve essere di almeno 8 caratteri e contenere almeno una lettera maiuscola e un carattere speciale.';
            return;
        }

        if (newPassword !== confirmPassword) {
            errorMessage.textContent = 'Le nuove password non corrispondono.';
            return;
        }

        errorMessage.textContent = '';
        var category = getUserCategory(uid);


        updatePassword(user, newPassword).then(() => {
            alert("Password updated successfully.");
            if (category === "Studente") {
                window.location.href = "homeStudente.html";
            } else {
                window.location.href = "homeAscoltatore.html";
            }
        }).catch((error) => {
            alert("Non è stato possibile cambiare la password");
        });
    });
});


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