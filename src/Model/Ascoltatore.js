import User from './User.js';


export default class Studente extends User {
    constructor(firstName, lastName, email, metodiPagamento = [], titoliStudioList = [], materieCompetenzaList = []) {
        super(firstName, lastName, email, metodiPagamento);
        this._titoliStudioList = titoliStudioList;
        this._materieCompetenzaList = materieCompetenzaList;
    }

    get titoliStudioList() {
        return this._titoliStudioList;
    }

    set titoliStudioList(titoloStudio) {
        this._titoliStudioList.push(titoloStudio);
    }

    get materieCompetenzaList() {
        return this._materieCompetenzaList;
    }

    set materieCompetenzaList(materia) {
        this._materieCompetenzaList.push(materia);
    }
}
