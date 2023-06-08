//connect to firebase
import { getAuth, createUserWithEmailAndPassword, getUser } from "firebase/auth";
import { getDatabase, set, get, update, remove, ref, child } from 'firebase/database';
import { app } from '../firebaseConfig.js';
const auth = getAuth(app);

import LogPresenter from "../LogPresenter/LogPresenter.js";
const log = new LogPresenter();

import StudenteStrategy from './StudenteStrategy.js';
import AscoltatoreStrategy from "./AscoltatoreStrategy.js";
import UserService from './UserService.js';
var service = new UserService();


//redirect from Login to Signup page
const loginLink = document.getElementById("loginLink");
loginLink.addEventListener("click", handleLogin);
function handleLogin() {
  window.location.href = 'auth.html';
}

//user data input validation
const form = document.querySelector("form");
form.addEventListener('submit', function (e) {
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
      var user = auth.currentUser;
      var uid = user.uid;
      log.signupLog(user);
      //console.log(log.showAccessLog());
      registerUser(uid);
    })
    .catch((error) => {
      alert(error);
    })
}


function registerUser(uid) {
  var name = document.getElementById('firstName').value;
  var surname = document.getElementById('lastName').value;
  var email = document.getElementById('email').value;
  var category = document.querySelector('.category').lastChild;
  var categoryText = category.options[category.selectedIndex].text;

  var utente;
  if (categoryText === "Studente") {
    service.setStrategy(new StudenteStrategy());
  } else {
    service.setStrategy(new AscoltatoreStrategy());
  }
  service.signUpToDatabase(uid, utente, name, surname, email);

}

