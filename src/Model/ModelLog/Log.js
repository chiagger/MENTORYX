import Record from './Record.js';

//PATTERN SINGLETON

class Log {
    constructor() {
        if (Log.instance == null) {
            this.recordList = [];
            Log.instance = this;
        }
        return Log.instance;
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

const log = new Log();
Object.freeze(log);
export default log;
