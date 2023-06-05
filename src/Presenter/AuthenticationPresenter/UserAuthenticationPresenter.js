import { getAuth, signInWithEmailAndPassword, getUser } from "firebase/auth";
import { getDatabase, set, get, update, remove, ref, child, orderByChild, equalTo, query, once } from 'firebase/database';
import { app } from '../firebaseConfig.js';
const auth = getAuth(app);
const db = getDatabase();


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
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      //REDIRECT TO STUDENT OR LISTENER HOME PAGE
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
  if (isAdmin(user) === true) {
    window.location.href = "impostazioni.html"; //cambia homeAdmin.html
  } else {
    const category = await getUserCategory(uid);

    if (category === "Studente") {
      window.location.href = 'homeStudente.html';
    } else if (category === "Ascoltatore") {
      window.location.href = 'homeAscoltatore.html';

    }
  }

}



function getUserCategory(uid) {
  const myUserData = ref(db);
  return get(child(myUserData, "Users/" + uid))
    .then((snapshot) => {
      const snapshotValue = snapshot.val();
      const childKeys = Object.keys(snapshotValue);
      const category = childKeys[0];
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

