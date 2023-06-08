import log from '../../Model/ModelLog/Log.js';
import Record from '../../Model/ModelLog/Record.js';

export default class LogPresenter {
    signupLog(user) {
        const desc = user.email + " signed up";
        var record = new Record(new Date(), "Accesso", desc);
        log.addRecord(record);
    }

    loginLog(user) {
        const desc = user.email + " logged in";

        var record = new Record(new Date(), "Accesso", desc);
        log.addRecord(record);
    }

    showAccessLog() {
        return log.readRecordList("Accesso");
    }

    showEventLog() {
        log.readRecordList("Evento")
    }

    // Other methods for retrieving specific types of logs
}

