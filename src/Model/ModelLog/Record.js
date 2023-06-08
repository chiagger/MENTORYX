export default class Record {
    constructor(timestamp, tipo, descrizione) {
        this.timestamp = timestamp;
        if (tipo === "Evento" || tipo === "Accesso") {
            this.tipo = tipo;
        } else {
            throw new Error("Invalid tipo value. It must be 'Evento' or 'Accesso'.");
        }
        this.descrizione = descrizione;
    }

    getTimestamp() {
        return this.timestamp;
    }

    getTipo() {
        return this.tipo;
    }
}
