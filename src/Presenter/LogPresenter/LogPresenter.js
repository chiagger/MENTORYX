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

    logoutLog(user) {
        const desc = user.email + " logged out";

        var record = new Record(new Date(), "Accesso", desc);
        log.addRecord(record);
    }

    changedPasswordLog(user) {
        const desc = user.email + " changed password";

        var record = new Record(new Date(), "Evento", desc);
        log.addRecord(record);
    }

    assignedMaterieCompetenza(listener) {
        const desc = listener.email + " was assigned compatible Subjects by admin";

        var record = new Record(new Date(), "Evento", desc);
        log.addRecord(record);
    }

    startedChat(student, listener) {
        const desc = listener.email + " was contacted by " + student.email;

        var record = new Record(new Date(), "Evento", desc);
        log.addRecord(record);
    }

    startedCall(student, listener) {
        const desc = listener.email + " and " + student.email + " are in a call.";

        var record = new Record(new Date(), "Evento", desc);
        log.addRecord(record);
    }

    endedCall(student, listener) {
        const desc = listener.email + " and " + student.email + " are no longer in a call.";
        var record = new Record(new Date(), "Evento", desc);
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

