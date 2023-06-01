import User from './User.js';


export default class Studente extends User {
    constructor(firstName, lastName, email, metodiPagamento = []) {
        super(firstName, lastName, email, metodiPagamento);
        this._titoliStudioList = [];
    }

    get titoliStudioList() {
        return this._titoliStudioList;
    }

    set titoliStudioList(titoloStudio) {
        this._titoliStudioList.push(titoloStudio);
    }
}
