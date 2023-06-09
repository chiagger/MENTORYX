import { getAuth, signInWithEmailAndPassword, getUser } from "firebase/auth";
import { getDatabase, set, get, update, remove, ref, child, orderByChild, equalTo, query, once } from 'firebase/database';
import { app } from '../firebaseConfig.js';
const auth = getAuth(app);
const db = getDatabase();

import LogPresenter from "../LogPresenter/LogPresenter.js";
const log = new LogPresenter();

import StudenteStrategy from './StudenteStrategy.js';
import AscoltatoreStrategy from "./AscoltatoreStrategy.js";
import UserService from './UserService.js';
var service = new UserService();



//redirect from Login to Signup page
const signupLink = document.getElementById("signupLink");
signupLink.addEventListener("click", handleSignup);
function handleSignup() {
  window.location.href = 'registration.html';
}

//Prevent reload page on submit
const form = document.querySelector("form");
form.addEventListener('submit', function (e) {
  e.preventDefault();
  userLogin();
});


//LOG IN
function userLogin() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      const category = await getUserCategory(user.uid);
      console.log(category);
      localStorage.setItem('currentUserCategory', category)
      redirectHome(user);

    })
    .catch((error) => {
      alert("Error: " + error.message);
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

function isAdmin(user) {
  if (user.email === "busca.chiara.cb@gmail.com") { //aggiungere qua eventuali altri admin... come encryptarlo???
    return true;
  } else {
    return false;
  }
}

//redirect to the right home page according to category
async function redirectHome(user) {
  const uid = user.uid;
  log.loginLog(user);
  if (isAdmin(user) === true) {
    window.location.href = "homeAdmin.html"; //cambia homeAdmin.html
  } else {
    const category = await getUserCategory(uid);

    if (category === "Studente") {
      service.setStrategy(new StudenteStrategy());
    } else if (category === "Ascoltatore") {
      service.setStrategy(new AscoltatoreStrategy());
    }
    service.homeRedirectAfterLogin();
  }

}



function getUserCategory(uid) {
  const myUserData = ref(db);
  return get(child(myUserData, "Users/" + uid))
    .then(async (snapshot) => {
      const snapshotValue = snapshot.val();
      const childKeys = Object.keys(snapshotValue);
      var category = childKeys[0];
      const utenteObj = await getUtenteObject(uid);
      console.log(utenteObj);
      if (utenteObj.email === "busca.chiara.cb@gmail.com") {
        category = "Amministratore";
      }
      return category;
    })
    .catch((error) => {
      alert(error);
      throw error; // Propagate the error further
    });
}

function getUtenteObject(uid) {
  const myUserData = ref(db);
  return get(child(myUserData, "Users/" + uid))
    .then((snapshot) => {
      const snapshotValue = snapshot.val();
      const firstChildValue = Object.values(snapshotValue)[0];
      const utente = JSON.parse(firstChildValue);
      return utente;
    })
    .catch((error) => {
      alert(error);
      throw error; // Propagate the error further
    });
}




