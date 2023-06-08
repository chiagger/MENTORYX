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

    get ambitoTitolo() {
        return this._ambitoTitolo;
    }

    get pressoTitolo() {
        return this._pressoTitolo;
    }

    get dataConseguimentoTitolo() {
        return this._dataConseguimentoTitolo;
    }

    dataConseguimentoToDate() {
        const dateParts = this.dataConseguimentoTitolo.value.split('/');
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based in JavaScript Date object
        const year = parseInt(dateParts[2], 10);
        const dataConseguimento = new Date(year, month, day);
        return dataConseguimento;
    }
}
