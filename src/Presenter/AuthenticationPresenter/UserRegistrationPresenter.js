//connect to firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, getUser } from "firebase/auth";

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
const auth = getAuth(app);

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
  
    if (password.length < 8) {
      alert('La password deve essere di almeno otto caratteri.');
      return;
    }
  
    if (!/[A-Z]/.test(password)) {
      alert('La password deve contenere almeno una lettera maiuscola.');
      return;
    }
  
    if (!/[!@#$%^&*]/.test(password)) {
      alert('La password deve contenere almeno un carattere speciale (!, @, #, $, %, ^, &, *).');
      return;
    }
  
    if (!/\d/.test(password)) {
      alert('La password deve contenere almeno un a cifra.');
      return;
    }
    
    if (password === confirmPassword) {
        signUp();
    } else {
      alert('Le password non corrispondono. Riprova.');
    }
  });

// SIGNING UP
function signUp() {
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        //now create an object in realtime db with the additional values
        var uid = auth.currentUser.uid;
        registerUser(uid);
        })
        .catch((error) => {
            alert(error);
        })
}



function registerUser(uid) {
    const db= getDatabase();
        var name =document.getElementById('firstName').value;
        var surname =document.getElementById('lastName').value;
        var password = document.getElementById('password').value;
        var email = document.getElementById('email').value;
        var category = document.querySelector('.category').lastChild;
        var categoryText = category.options[category.selectedIndex].text;

    set(ref(db, "Users/" + uid), {
        Name: name,
        Surname: surname,
        Email: email,
        Password: password,
        Category: categoryText,
    })
    .then(() => {
        alert("User registered to db");
    })
    .catch((error) => {
        alert(error);
    })
}