export default class Record {
    constructor(id, timestamp, tipo) {
        this.id = id;
        this.timestamp = timestamp;
        if (tipo === "Evento" || tipo === "Accesso") {
            this.tipo = tipo;
        } else {
            throw new Error("Invalid tipo value. It must be 'Evento' or 'Accesso'.");
        }
    }

    getId() {
        return this.id;
    }

    getTimestamp() {
        return this.timestamp;
    }

    getTipo() {
        return this.tipo;
    }
}
