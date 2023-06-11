import "./chatList.css";
import Chat from '../../Model/Chat';
import { getDatabase, ref, push, set } from 'firebase/database';

// Get the Firebase Realtime Database instance
const db = getDatabase();

const head = document.querySelector("head");
const cssLink = document.createElement('link');
cssLink.rel = 'stylesheet';
cssLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
head.appendChild(cssLink);


window.onload = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        notSignedIn();
    }
}

function notSignedIn() {
    alert("You are not signed in");

    setTimeout(function () {
        window.location.href = "index.html";
    }, 500);
}

const emptyContainer = document.createElement('div');
emptyContainer.id = 'emptyContainer';

const header = document.createElement('header');
header.id = 'header';

const logo = document.createElement('img');
logo.id = 'logo';
logo.src = 'https://i.imgur.com/UTazMbC.png';

const navigation = document.createElement('nav');
navigation.id = 'navigation';

header.appendChild(logo);
header.appendChild(navigation);

document.body.appendChild(header);




const studenteuid = JSON.parse(localStorage.getItem("currentUser")).uid;
const studente = await getUtenteObject(studenteuid);


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