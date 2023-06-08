import User from './User.js';
import Abbonamento from './Abbonamento.js';

export default class Studente extends User {
    constructor(firstName, lastName, email, metodiPagamento = [], abbonamento) {
        super(firstName, lastName, email, metodiPagamento);
        this._abbonamento = undefined;
    }

    get abbonamento() {
        return this.abbonamento;
    }

    set abbonamento(value) {
        if (value instanceof Abbonamento) {
            this.abbonamento = value;
        } else {
            throw new Error("Oggetto Abbonamento non valido");
        }
    }

    isActiveAbbonamento() {
        if (this.abbonamento === undefined
            || this.abbonamento === null) {
            return false;
        } else {
            return true;
        }
    }

}
