import Record from './Record.js';

class Log {
    constructor() {
        if (Log.instance == null) {
            this.loadRecordList();
            Log.instance = this;
        }
        return Log.instance;
    }

    addRecord(record) {
        if (record instanceof Record) {
            this.recordList.push(record);
            this.saveRecordList(); // Save record list to localStorage
        } else {
            throw new Error("Record invalid");
        }
    }

    readRecordList(tipo) {
        return this.recordList.filter(record => record.tipo === tipo); // Access 'tipo' directly
    }

    saveRecordList() {
        localStorage.setItem('recordList', JSON.stringify(this.recordList));
    }

    loadRecordList() {
        const storedRecordList = localStorage.getItem('recordList');
        if (storedRecordList) {
            const parsedRecordList = JSON.parse(storedRecordList);
            this.recordList = parsedRecordList.map(recordData => new Record(recordData.timestamp, recordData.tipo, recordData.descrizione));
        } else {
            this.recordList = [];
        }
    }
}

const log = new Log();
Object.freeze(log);
export default log;
