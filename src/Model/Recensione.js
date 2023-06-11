import Studente from './Studente'
import User from './User';

export default class Recensione {
    constructor(daStudente, titolo, descrizione, rating) {
        this._daStudente = daStudente;
        this.titolo = titolo;
        this.descrizione = descrizione;
        this._rating = null;
        this.setRating(rating);
    }

    set daStudente(value) {
        this._daStudente = value;
    }

    get daStudente() {
        return this._daStudente;
    }

    get titolo() {
        return this._titolo;
    }

    set titolo(value) {
        this._titolo = value;
    }


    get descrizione() {
        return this._descrizione;
    }

    set descrizione(value) {
        this._descrizione = value;
    }

    get rating() {
        return this._rating;
    }

    set rating(value) {
        this._rating = value;
    }

    // Helper method to validate and set the rating
    setRating(rating) {
        if (Number.isInteger(rating) && rating >= 1 && rating <= 5) {
            this._rating = rating;
        } else {
            throw new Error('Rating must be an integer value between 1 and 5.');
        }
    }

}
