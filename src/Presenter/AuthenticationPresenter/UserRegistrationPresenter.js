//connect to Database
/*import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ewwkqzzfvrbtdxxokiwq.supabase.co'
const supabaseKey = process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3d2txenpmdnJidGR4eG9raXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU0MDUxODIsImV4cCI6MjAwMDk4MTE4Mn0.asTnokwBRRWWPCtOOgA-r5AOwQCHKdcH7NbR6Kv5dPs;
const supabase = createClient(supabaseUrl, supabaseKey);
*/

//redirect from Login to Signup page
const loginLink = document.getElementById("loginLink");
console.log(loginLink);
loginLink.addEventListener("click", handleLogin);
function handleLogin() {
    console.log("ok");
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
  

//supabase signup 
/*
const signUp = async () => {
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
    var name =document.getElementById('firstName').value;;
    var surname =document.getElementById('lastName').value;;
    var username =document.getElementById('username').value;;
    


    try {
        const { error } = await supabase.auth.signUp(
            {
                email: email,
                password: password,
            },
            {
                data: {
                    first_name : name,
                    last_name : surname,
                    username: username,
                }
            }
        );

        if (error) throw error;
    } catch (e) {
        console.log(e.message);
    }
};*/

  