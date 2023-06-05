export default class Log {
    constructor() {
        this.recordList = [];
    }

    addRecord(record) {
        if (record instanceof Record) {
            this.recordList.push(record);
        } else {
            throw new Error("Record invalid");
        }
    }

    readRecordList(tipo) {
        return this.recordList.filter(record => record.getTipo() === tipo);
    }
}


/* USAGE
const log = new Log();

const record1 = new Record(1, new Date(), "Evento");
const record2 = new Record(2, new Date(), "Accesso");
const record3 = new Record(3, new Date(), "Evento");

log.addRecord(record1);
log.addRecord(record2);
log.addRecord(record3);

const eventoRecords = log.readRecordList("Evento");
console.log(eventoRecords);

*/