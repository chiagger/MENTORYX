import User from './User.js';
import Pagamento from './Pagamento.js';


export default class Ascoltatore extends User {
    constructor(firstName, lastName, email, metodiPagamento = [],
        titoliStudioList = [], materieCompetenzaList = [], recensioniList = [],
        pagamentiList = []) {
        super(firstName, lastName, email, metodiPagamento);
        this._titoliStudioList = titoliStudioList;
        this._materieCompetenzaList = materieCompetenzaList;
        this._recensioniList = recensioniList;
        this._saldo = 0; //in centesimi, poi in output lo converto
        this._pagamentiList = pagamentiList;
    }

    get pagamentiList() {
        return this.pagamentiList;
    }

    set pagamentiList(pagamento) {
        if (pagamento instanceof Pagamento) {
            this.pagamentiList.push(pagamento);
            this.setSaldo(pagamento.importo);
        } else {
            throw new Error("pagamento must be an instance of Pagamento");
        }
    }

    get titoliStudioList() {
        return this._titoliStudioList;
    }

    set titoliStudioList(titoloStudio) {
        if (metodoPagamento instanceof TitoloStudio) {
            this._titoliStudioList.push(titoloStudio);
        } else {
            throw new Error("Oggetto TitoloStudio non valido");
        }
    }

    get materieCompetenzaList() {
        return this._materieCompetenzaList;
    }

    set materieCompetenzaList(materia) {
        if (materia instanceof Materia) {
            this._materieCompetenzaList.push(materia);
        } else {
            throw new Error("Oggetto Materia non valido");
        }
    }

    get recensioniList() {
        return this._recensioniList;
    }

    set recensioniList(recensione) {
        if (recensione instanceof Recensione) {
            this._recensioniList.push(recensione);
        } else {
            throw new Error("Oggetto Recensione non valido");
        }
    }

    get saldo() {
        return this._saldo;
    }

    set saldo(value) {
        if (Number.isInteger(value)) {
            this._saldo = this._saldo + value;
        } else {
            throw new Error('importo must be an integer value.');
        }
    }

    getSaldoInEuro() {
        return this.saldo / 100;
    }
}
