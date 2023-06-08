//abstract class

export default class UserStrategy {

    inserisciMetodoPagamento(uid, utente) {
        throw new Error("inserisciMetodoPagamento must be implemented");
    }

    viewRedirectAfterMetodoPagamento() {
        throw new Error("viewRedirectAfterMetodoPagamento must be implemented");

    }

    inserisciTitoloStudio(uid, utente) {
        throw new Error("inserisciTitoloStudio must be implemented");
    }
    signUpToDatabase(uid, utente, name, surname, email) {
        throw new Error("signUpToDatabase must be implemented");
    }
    homeRedirectAfterLogin() {
        throw new Error("homeRedirectAfterLogin must be implemented");
    }
}
