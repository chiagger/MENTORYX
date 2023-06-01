//connect to firebase
import { getAuth, createUserWithEmailAndPassword, getUser } from "firebase/auth";
import { getDatabase, set, get, update, remove, ref, child } from 'firebase/database';
import { app } from '../firebaseConfig.js';
const auth = getAuth(app);
const db = getDatabase();

//Inserting titolo di studio info to firebase
const creditCardForm = document.getElementById('creditCardForm');
creditCardForm.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var nome = document.getElementById("nomeTitolo").value;
    var dataConseguimento = document.getElementById("dataConseguimento").value;
    //this is just the file name...for now
    var file = document.getElementById("fileUpload").files[0].name;
    var uid = auth.currentUser.uid;

    update(ref(db, "Users/" + uid), {
        TipoTitolo: nome,
        DataConseguimentoTitolo: dataConseguimento,
        FileTitolo: file,
    })
        .then(() => {
            window.location.href = "auth.html";
        })
        .catch((error) => {
            alert(error);
        })

});
