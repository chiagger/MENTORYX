export default class Pagamento {
    constructor(aAscoltatore, data, importo = 800) {
        this._aAscoltatore = null;
        this._data = null;
        this._importo = null;

        this.setaAscoltatore(aAscoltatore);
        this.setData(data);
        this.setImporto(importo);
    }

    // Getter method for the data property
    get data() {
        return this._data;
    }

    // Setter method for the data property
    set data(value) {
        this.setData(value);
    }

    // Helper method to validate and set the data
    setData(value) {
        if (value instanceof Date) {
            this._data = value;
        } else {
            throw new Error('data must be an instance of Date.');
        }
    }

    get aAscoltatore() {
        return this.aAscoltatore;
    }

    setaAscoltatore(aAscoltatore) {
        if (aAscoltatore instanceof Ascoltatore) {
            this.aAscoltatore = aAscoltatore;
        } else {
            throw new Error('aAscoltarore must be an instance of Ascoltatore.');
        }
    }

    // Getter method for the importo property
    get importo() {
        return this._importo;
    }

    // Setter method for the importo property
    set importo(value) {
        this.setImporto(value);
    }

    // Helper method to validate and set the importo
    setImporto(value) {
        if (Number.isInteger(value)) {
            this._importo = value;
        } else {
            throw new Error('importo must be an integer value.');
        }
    }

    importoToEuro() {
        return this.importo / 100;
    }
}
