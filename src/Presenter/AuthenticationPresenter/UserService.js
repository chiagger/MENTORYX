import StudenteStrategy from "./StudenteStrategy";
import AscoltatoreStrategy from "./AscoltatoreStrategy";

export default class UserService {
    constructor() {
    }

    setStrategy(strategy) {
        if (strategy instanceof StudenteStrategy
            || strategy instanceof AscoltatoreStrategy) {
            this.strategy = strategy;
        } else {
            throw new Error("Could not set user strategy");
        }
    }

    //ok
    inserisciMetodoPagamento(uid, utente) {
        this.strategy.inserisciMetodoPagamento(uid, utente);
    }

    inserisciAbbonamento(uid, utente) {
        this.strategy.inserisciAbbonamento(uid, utente);
    }

    //ok
    inserisciTitoloStudio(uid, utente) {
        this.strategy.inserisciTitoloStudio(uid, utente);
    }

    signUpToDatabase(uid, utente, name, surname, email) {
        this.strategy.signUpToDatabase(uid, utente, name, surname, email);
    }

    //ok
    homeRedirectAfterLogin() {
        this.strategy.homeRedirectAfterLogin();
    }
}
