import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, getUser } from "firebase/auth";
import {getDatabase, set, get, update, remove, ref, child} from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyDCsiGY0sSr5YON_EIZTzxoyqgY-g2vkN4",
  authDomain: "mentoryx-66f50.firebaseapp.com",
  databaseURL: "https://mentoryx-66f50-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mentoryx-66f50",
  storageBucket: "mentoryx-66f50.appspot.com",
  messagingSenderId: "517335617852",
  appId: "1:517335617852:web:2a38fceec7d095694c4e39",
  measurementId: "G-S9172JNVCH"
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {app};