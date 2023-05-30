//connect to supabase
/*import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import {getDatabase, set, get, update, remove, ref, child} from 'firebase/database';

//redirect from Login to Signup page
const loginLink = document.getElementById("loginLink");
loginLink.addEventListener("click", handleLogin);
function handleLogin() {
  window.location.href = 'auth.html';
}

//user data input validation
const form = document.querySelector("form");
form.addEventListener('submit', function(e) {
    e.preventDefault();
  
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
  
    // Verifica la lunghezza della password
    if (password.length < 8) {
      alert('La password deve essere di almeno otto caratteri.');
      return;
    }
  
    // Verifica la presenza di una lettera maiuscola
    if (!/[A-Z]/.test(password)) {
      alert('La password deve contenere almeno una lettera maiuscola.');
      return;
    }
  
    // Verifica la presenza di almeno un carattere speciale
    if (!/[!@#$%^&*]/.test(password)) {
      alert('La password deve contenere almeno un carattere speciale (!, @, #, $, %, ^, &, *).');
      return;
    }
  
    // Verifica la presenza di almeno una cifra
    if (!/\d/.test(password)) {
      alert('La password deve contenere almeno un a cifra.');
      return;
    }
  
    // Verifica che le password corrispondano
    if (password === confirmPassword) {
        signUp();
      // Puoi aggiungere qui il codice per inviare i dati del modulo al server
    } else {
      alert('Le password non corrispondono. Riprova.');
    }
  });
  

//firebase signup 
function signUp() {
    const db= getDatabase();

    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
    var name =document.getElementById('firstName').value;;
    var surname =document.getElementById('lastName').value;;
    var username =document.getElementById('username').value;;
    
    set(ref(db, "Users/"), {
        Name: name,
        Surname: surname,
        Username: username,
        Email: email,
        Password: password,
    })
    .then(() => {
        alert("User registered to db");
    })
    .catch((error) => {
        alert(error);
    })
}

  