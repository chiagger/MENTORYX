import User from './User.js';
import Abbonamento from './Abbonamento.js';

export default class Studente extends User {
    constructor(firstName, lastName, email, metodiPagamento = [], abbonamento) {
        super(firstName, lastName, email, metodiPagamento);
        this._abbonamento = abbonamento;
    }

    get abbonamento() {
        return this._abbonamento;
    }

    set abbonamento(value) {
        if (value instanceof Abbonamento) {
            this._abbonamento = value;
        } else {
            throw new Error("Oggetto Abbonamento non valido");
        }
    }

    isActiveAbbonamento() {
        if (this._abbonamento === undefined
            || this._abbonamento === null) {
            return false;
        } else {
            return true;
        }
    }

}
