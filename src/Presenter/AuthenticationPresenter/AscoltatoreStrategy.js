import UserStrategy from "./UserStrategy";

import { getAuth, signInWithEmailAndPassword, getUser } from "firebase/auth";
import { getDatabase, set, get, update, remove, ref, child, orderByChild, equalTo, query, once } from 'firebase/database';
import { app } from '../firebaseConfig.js';
import Ascoltatore from '../../Model/Ascoltatore';
const db = getDatabase();


export default class AscoltatoreStrategy extends UserStrategy {
    viewRedirectAfterMetodoPagamento() {
        window.location.href = 'viewInserisciTitoloAscoltatore.html';
    }

    inserisciMetodoPagamento(uid, utente) {
        const utenteJSON = JSON.stringify(utente);

        update(ref(db, "Users/" + uid), {
            Ascoltatore: utenteJSON,
        })
            .then(() => {
                this.viewRedirectAfterMetodoPagamento();
            })
            .catch((error) => {
                alert(error);
            })
    }

    inserisciTitoloStudio(uid, utente) {
        const utenteJSON = JSON.stringify(utente);
        update(ref(db, "Users/" + uid), {
            Ascoltatore: utenteJSON,
        })
            .then(() => {
                window.location.href = "auth.html";
            })
            .catch((error) => {
                alert(error);
            })
    }

    signUpToDatabase(uid, utente, name, surname, email) {
        utente = new Ascoltatore(name, surname, email);
        const utenteJSON = JSON.stringify(utente);
        set(ref(db, "Users/" + uid), {
            Ascoltatore: utenteJSON,
        })
            .then(() => {
                window.location.href = "viewInserisciMetodoPagamento.html";
            })
            .catch((error) => {
                alert(error);
            })
    }
    homeRedirectAfterLogin() {
        window.location.href = 'homeAscoltatore.html';
    }
}


