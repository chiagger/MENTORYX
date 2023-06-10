//connect to firebase
import { getAuth, signOut, getUser } from "firebase/auth";
import { getDatabase, set, get, update, remove, ref, child, onValue } from 'firebase/database';
import { app } from '../firebaseConfig.js';
const auth = getAuth(app);
const db = getDatabase(app);

import '../../View/homeStudente/homeStudente.css';

import LogPresenter from "../LogPresenter/LogPresenter.js";
const log = new LogPresenter();

// Mostra o nasconde il dropdown del profilo
document.getElementById("profile-icon").addEventListener("click", function () {
    const profileDropdown = document.getElementById("profile-dropdown");
    profileDropdown.style.display = (profileDropdown.style.display === "block") ? "none" : "block";
});

// Aggiunta effetti visivi dinamici e responsivi
window.addEventListener("mousemove", function (e) {
    const balls = document.querySelectorAll(".ball");
    const mouseX = e.pageX;
    const mouseY = e.pageY;

    balls.forEach(function (ball) {
        const ballX = ball.getBoundingClientRect().left + ball.clientWidth / 2;
        const ballY = ball.getBoundingClientRect().top + ball.clientHeight / 2;

        const diffX = mouseX - ballX;
        const diffY = mouseY - ballY;

        const distance = Math.sqrt(diffX * diffX + diffY * diffY);

        const maxDistance = Math.max(window.innerWidth, window.innerHeight) / 2;

        const scale = 1 - distance / maxDistance;

        ball.style.transform = `scale(${scale})`;
    });
});


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



//ricerca ascoltatori
const emptyContainer = document.getElementById("emptyContainer");
const searchInput = document.getElementById("search-input");
const cercaBtn = document.getElementById("cercaBtn");

cercaBtn.addEventListener("click", visualizzaElencoAscoltatori);

async function visualizzaElencoAscoltatori(e) {
    e.preventDefault();
    const materiaCercata = searchInput.value;
    if (!materiaCercata) {
        alert("Inserisci una materia nella barra di ricerca!");
    } else {
        emptyContainer.style.visibility = 'hidden';
        var innerContainer = document.createElement("div");
        innerContainer.id = "innerContainer";

        var ascoltatoriCompatibili = await getUsersByMateria(materiaCercata);

        createAscoltatoriElements(ascoltatoriCompatibili, innerContainer);


    }
}

function createAscoltatoriElements(ascoltatoriCompatibili, innerContainer) {

    ascoltatoriCompatibili.forEach((ascoltatore) => {
        const div = document.createElement('div');
        div.classList.add('element');

        const fullNameDiv = document.createElement('div');
        fullNameDiv.classList.add("fullName");
        fullNameDiv.innerHTML = `${ascoltatore.firstName} ${ascoltatore.lastName}`;

        const materieDiv = document.createElement('div');
        materieDiv.innerHTML = ascoltatore._materieCompetenzaList.join(', ');

        const contattaBtn = document.createElement("button");
        contattaBtn.id = "contattaBtn";
        contattaBtn.innerHTML = "Scrivi";

        const ratingDiv = document.createElement("div");
        ratingDiv.id = "ratingDiv";
        const ratingTitle = document.createElement("div");
        ratingTitle.innerHTML = "Valutazione: ";
        const ratingValue = document.createElement("div");
        ratingValue.id = "ratingValue";
        ratingValue.innerHTML = calculateAverageRating(ascoltatore._recensioniList);
        ratingDiv.appendChild(ratingTitle);
        ratingDiv.appendChild(ratingValue);


        const descrizioneDiv = document.createElement("div");
        descrizioneDiv.id = "descrizioneDiv";
        descrizioneDiv.innerHTML = ascoltatore._bio;

        div.appendChild(fullNameDiv);
        div.appendChild(materieDiv);
        div.appendChild(ratingDiv);
        div.appendChild(descrizioneDiv);
        div.appendChild(contattaBtn);

        innerContainer.appendChild(div);
    });
    document.body.appendChild(innerContainer);

}

function calculateAverageRating(recensioniList) {
    if (recensioniList.length === 0) {
        return "Nuovo ascoltatore!"; // Return 0 if the list is empty
    }

    let totalRating = 0;
    for (let i = 0; i < recensioniList.length; i++) {
        const recensione = recensioniList[i];
        const rating = recensione.rating;
        totalRating += rating;
    }

    const averageRating = totalRating / recensioniList.length;
    return averageRating + "/5";
}

async function getUsersByMateria(inputMateria) {
    const usersRef = ref(db, 'Users/');
    const snapshot = await get(usersRef);

    const users = [];
    snapshot.forEach((childSnapshot) => {
        const user = childSnapshot.val();
        if (user.Ascoltatore) {
            const userObj = JSON.parse(user.Ascoltatore);
            if (userObj._materieCompetenzaList && userObj._materieCompetenzaList.includes(capitalizeFirstChar(inputMateria))) {

                users.push(userObj);
            }

        }
    });
    return users;
}

function capitalizeFirstChar(str) {
    if (str.length === 0) {
        return str; // Return empty string if input is empty
    }

    const firstChar = str.charAt(0).toUpperCase();
    const remainingChars = str.slice(1);

    return firstChar + remainingChars;
}