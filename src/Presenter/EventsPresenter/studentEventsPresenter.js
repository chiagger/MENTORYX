//connect to firebase
import { getAuth, signOut, getUser } from "firebase/auth";
import { getDatabase, set, get, update, remove, ref, child, onValue } from 'firebase/database';
import { app } from '../firebaseConfig.js';
const auth = getAuth(app);
const db = getDatabase(app);

import '../../View/homeStudente/homeStudente.css';

import LogPresenter from "../LogPresenter/LogPresenter.js";
const log = new LogPresenter();


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

        const dettagliBtn = document.createElement("button");
        dettagliBtn.id = "dettagliBtn";
        dettagliBtn.innerHTML = "Dettagli";

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
        div.appendChild(dettagliBtn);

        innerContainer.appendChild(div);
    });
    document.body.appendChild(innerContainer);

    //Open assegna popup
    const dettagliBtns = document.querySelectorAll('#dettagliBtn');
    const dettagliBtnArray = Array.from(dettagliBtns);
    console.log(dettagliBtnArray);
    for (let k = 0; k < dettagliBtnArray.length; k++) {
        dettagliBtnArray.at(k).addEventListener('click', () => {
            openAscoltatoreProfile(ascoltatoriCompatibili.at(k));
        })
    };

}

function openAscoltatoreProfile(ascoltatore) {
    localStorage.setItem('selectedAscoltatore', JSON.stringify(ascoltatore));
    window.location.href = "profiloAscoltatore.html";
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




const chatLink = document.getElementById('chatLink');
chatLink.addEventListener("click", () => {
    window.location.href = "chatListStudente.html";
});