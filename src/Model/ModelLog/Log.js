import Record from './Record.js';

import { getAuth } from "firebase/auth";
import { getDatabase, get, ref, child, set, push } from 'firebase/database';
import { app } from '../../Presenter/firebaseConfig.js';
const db = getDatabase();

class Log {
    constructor() {
        if (Log.instance == null) {
            this.recordList = [];
            this.loadRecordListFromFirebase();
            Log.instance = this;
        }
        return Log.instance;
    }

    addRecord(record) {
        if (record instanceof Record) {
            this.recordList.push(record);
            this.saveRecordToFirebase(record); // Save the record to Firebase Realtime Database
        } else {
            throw new Error('Record invalid');
        }
    }

    readRecordList(tipo) {
        return this.recordList.filter((record) => record.tipo === tipo);
    }

    saveRecordToFirebase(record) {
        const databaseRef = ref(db, 'Log/');
        const newRecordRef = push(databaseRef); // Generate a new unique key
        set(newRecordRef, record)
            .catch((error) => {
                console.error('Error saving record:', error);
            });
    }

    loadRecordListFromFirebase() {
        const databaseRef = ref(db, 'Log/');

        get(databaseRef)
            .then((snapshot) => {
                const retrievedRecordList = snapshot.val();
                if (retrievedRecordList) {
                    this.recordList = Object.values(retrievedRecordList).map(
                        (recordData) => new Record(recordData.timestamp, recordData.tipo, recordData.descrizione)
                    );
                }
            })
            .catch((error) => {
                console.error('Error retrieving record list:', error);
            });
    }
}

const log = new Log();
export default log;
