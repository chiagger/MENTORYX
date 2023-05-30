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
      const uid = userCredential.user.uid;
      //REDIRECT TO STUDENT OR LISTENER HOME PAGE
      redirectHome(uid);
    })
    .catch((error) => {
      alert("Error: " + error.message);
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

//redirect to the right home page according to category
function redirectHome(uid) {
  const myUserData = ref(db);
  get(child(myUserData, "Users/" + uid))
  .then((snapshot) => {
    if (snapshot.exists()) {
      if (snapshot.val().Category == "Studente") {
        window.location.href = 'homeStudente.html';
      }else if (snapshot.val().Category == "Ascoltatore") {
        window.location.href = 'homeAscoltatore.html';
    } else {
      alert("User data not found");
    }
    } 
  })
  .catch((error) => {alert(error)})
}

