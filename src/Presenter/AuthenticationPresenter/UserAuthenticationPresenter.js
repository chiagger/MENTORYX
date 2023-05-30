import { getAuth, signInWithEmailAndPassword, getUser } from "firebase/auth";
import { getDatabase, set, get, update, remove, ref, child } from 'firebase/database';
import { app } from '../firebaseConfig.js';
const auth = getAuth(app);


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


function userLogin() {

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      alert("Error: " + error.message);
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}