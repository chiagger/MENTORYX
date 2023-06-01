export default class TitoloStudio {
    constructor(tipoTitolo, ambitoTitolo, pressoTitolo, dataConseguimentoTitolo) {
        this._tipoTitolo = tipoTitolo;
        this._ambitoTitolo = ambitoTitolo;
        this._pressoTitolo = pressoTitolo;
        this._dataConseguimentoTitolo = dataConseguimentoTitolo;
    }

    get tipoTitolo() {
        return this._tipoTitolo;
    }

    set tipoTitolo(newTipoTitolo) {
        this._tipoTitolo = newTipoTitolo;
    }

    get ambitoTitolo() {
        return this._ambitoTitolo;
    }

    set ambitoTitolo(newAmbitoTitolo) {
        this._ambitoTitolo = newAmbitoTitolo;
    }

    get pressoTitolo() {
        return this._pressoTitolo;
    }

    set pressoTitolo(newPressoTitolo) {
        this._pressoTitolo = newPressoTitolo;
    }

    get dataConseguimentoTitolo() {
        return this._dataConseguimentoTitolo;
    }

    set dataConseguimentoTitolo(newDataConseguimentoTitolo) {
        this._dataConseguimentoTitolo = newDataConseguimentoTitolo;
    }

    displayInfo() {
        console.log(`Tipo di Titolo: ${this.tipoTitolo}`);
        console.log(`Ambito del Titolo: ${this.ambitoTitolo}`);
        console.log(`Presso: ${this.pressoTitolo}`);
        console.log(`Data di Conseguimento: ${this.dataConseguimentoTitolo}`);
    }
}
