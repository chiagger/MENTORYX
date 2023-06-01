//connect to firebase
import { getAuth, createUserWithEmailAndPassword, getUser } from "firebase/auth";
import { getDatabase, set, get, update, remove, ref, child } from 'firebase/database';
import { app } from '../firebaseConfig.js';
const auth = getAuth(app);

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
      //now create an object in realtime db with the additional values
      var uid = auth.currentUser.uid;
      registerUser(uid);
    })
    .catch((error) => {
      alert(error);
    })
}

function registerUser(uid) {
  const db = getDatabase();
  var name = document.getElementById('firstName').value;
  var surname = document.getElementById('lastName').value;
  var email = document.getElementById('email').value;
  var category = document.querySelector('.category').lastChild;
  var categoryText = category.options[category.selectedIndex].text;

  set(ref(db, "Users/" + uid), {
    Name: name,
    Surname: surname,
    Email: email,
    Category: categoryText,
  })
    .then(() => {
      window.location.href = "viewInserisciMetodoPagamento.html";
    })
    .catch((error) => {
      alert(error);
    })
}

