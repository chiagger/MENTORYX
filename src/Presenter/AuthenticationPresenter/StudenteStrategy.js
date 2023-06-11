//concrete class implements UserStrategy
import UserStrategy from './UserStrategy.js';
import { getAuth, signInWithEmailAndPassword, getUser } from "firebase/auth";
import { getDatabase, set, get, update, remove, ref, child, orderByChild, equalTo, query, once } from 'firebase/database';
import { app } from '../firebaseConfig.js';
const db = getDatabase();

import Studente from '../../Model/Studente.js';

export default class StudenteStrategy extends UserStrategy {

    viewRedirectAfterMetodoPagamento() {
        window.location.href = 'inserisciAbbonamento.html';
    }

    inserisciMetodoPagamento(uid, utente) {
        const utenteJSON = JSON.stringify(utente);
        update(ref(db, "Users/" + uid), {
            Studente: utenteJSON,
        })
            .then(() => {
                this.viewRedirectAfterMetodoPagamento();
            })
            .catch((error) => {
                alert(error);
            })
    }

    inserisciAbbonamento(uid, utente) {
        const utenteJSON = JSON.stringify(utente);
        update(ref(db, "Users/" + uid), {
            Studente: utenteJSON,
        })
            .then(() => {
                window.location.href = "auth.html";
            })
            .catch((error) => {
                alert(error);
            })
    }

    inserisciTitoloStudio(uid, utente) {
        throw new Error("C'è stato un errore di categoria.");
    }

    signUpToDatabase(uid, utente, name, surname, email) {
        utente = new Studente(name, surname, email);
        const utenteJSON = JSON.stringify(utente);
        set(ref(db, "Users/" + uid), {
            Studente: utenteJSON,
        })
            .then(() => {
                window.location.href = "viewInserisciMetodoPagamento.html";
            })
            .catch((error) => {
                alert(error);
            })
    }

    homeRedirectAfterLogin() {
        window.location.href = 'homeStudente.html';
    }
}
