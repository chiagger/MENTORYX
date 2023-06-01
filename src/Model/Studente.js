import User from './User.js';

export default class Studente extends User {
    constructor(firstName, lastName, email, metodiPagamento = []) {
        super(firstName, lastName, email, metodiPagamento);
    }


}
