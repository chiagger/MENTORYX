
import { getAuth } from "firebase/auth";
import { getDatabase, get, update, ref, child, onValue } from 'firebase/database';
import { app } from '../firebaseConfig';
const auth = getAuth(app);
const db = getDatabase();


import Recensione from "../../Model/Recensione";
const form = document.getElementById("review");

function submitReview(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const rating = document.getElementById('rating').value;
    const intRating = parseInt(rating.split(' ')[0]);
    const description = document.getElementById('description').value;

    const ascoltatore = localStorage.getItem("ascoltatoreContattato");
    const studente = localStorage.getItem("studenteContattante");

    let recensione = new Recensione(studente, ascoltatore, title, description, intRating);
    const jsonAscoltatore = JSON.parse(ascoltatore);
    jsonAscoltatore._recensioniList.push(recensione);
    const updatedAscoltatore = JSON.stringify(jsonAscoltatore);

    addReviewToDb(ascoltatore, updatedAscoltatore);



    // You can perform further processing here, like sending the data to a server for storage

    // Clear form fields after submission
    form.reset();
}

// Attach the submitReview function to the form's submit event
form.addEventListener('submit', submitReview);


async function getUsersFromDatabase() {
    const usersRef = ref(db, 'Users');

    return new Promise((resolve, reject) => {
        onValue(usersRef, (snapshot) => {
            const users = [];
            const snapshotValue = snapshot.val();

            if (snapshotValue) {
                Object.entries(snapshotValue).forEach(([uid, userData]) => {
                    const user = { uid, ...userData }; // Include the UID in the user object
                    users.push(user);
                });
            }
            resolve(users);
        }, (error) => {
            reject(error);
        });
    });
}


async function addReviewToDb(userJson, updatedAscoltatore) {
    try {
        const usersRef = ref(db, 'Users/');
        const snapshot = await get(usersRef);

        const email = JSON.parse(userJson).email;

        const userList = await getUsersFromDatabase();
        for (let k = 0; k < userList.length; k++) {
            const otherEmail = JSON.parse(userList.at(k).Ascoltatore).email;
            if (otherEmail !== undefined && email === otherEmail) {
                const uid = userList.at(k).uid;
                update(ref(db, "Users/" + uid), {
                    Ascoltatore: updatedAscoltatore,
                })
                    .then(() => {
                        window.location.href = "homeStudente.html";
                    })
                    .catch((error) => {
                        alert(error);
                    })
            }



        }

        // Return the users array or perform other actions if needed
        //return users;
    } catch (error) {
        console.error('Error uploading review', error.message);
        return null;
    }
}
