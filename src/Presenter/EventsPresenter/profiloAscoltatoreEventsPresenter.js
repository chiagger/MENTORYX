import { getAuth, signOut } from "firebase/auth";
import { getDatabase, get, update, ref, child, onValue } from 'firebase/database';
import { app } from '../firebaseConfig.js';
const auth = getAuth(app);
const db = getDatabase(app);
import Recensione from '../../Model/Recensione';
const ascoltatore = JSON.parse(localStorage.getItem('selectedAscoltatore'));


const studenteuid = JSON.parse(localStorage.getItem("currentUser")).uid;
const studente = await getUtenteObject(studenteuid);

console.log(studente);
const recensione1 = new Recensione(studente, "La svolta!", "Mira è davvero brava", 5);
const recensione2 = new Recensione(studente, "Meh..", "Potrebbe essere meglio", 2);

ascoltatore._recensioniList.push(recensione1);
ascoltatore._recensioniList.push(recensione2);

createAscoltatoreProfile(ascoltatore);

function createAscoltatoreProfile(ascoltatore) {
    const profileContainer = document.createElement('div');
    profileContainer.classList.add('ascoltatore-profile');

    // Create and append the full name
    const fullName = document.createElement('h2');
    fullName.textContent = ascoltatore.firstName + " " + ascoltatore.lastName;
    profileContainer.appendChild(fullName);

    // Create and append the list of materieCompetenza
    const competenzeList = document.createElement('ul');
    for (const materia of ascoltatore._materieCompetenzaList) {
        const competenzaItem = document.createElement('li');
        competenzaItem.textContent = materia;
        competenzeList.appendChild(competenzaItem);
    }
    profileContainer.appendChild(competenzeList);


    const ratingDiv = document.createElement("div");
    ratingDiv.id = "ratingDiv";
    const ratingTitle = document.createElement("div");
    ratingTitle.innerHTML = "Valutazione: ";
    const ratingValue = document.createElement("div");
    ratingValue.id = "ratingValue";
    ratingValue.innerHTML = calculateAverageRating(ascoltatore._recensioniList);
    ratingDiv.appendChild(ratingTitle);
    ratingDiv.appendChild(ratingValue);


    // Create and append the bio
    const bio = document.createElement('p');
    bio.textContent = ascoltatore._bio;
    profileContainer.appendChild(ratingDiv);

    profileContainer.appendChild(bio);

    // Create and append the list of recensioni
    const recensioniList = document.createElement('div');
    recensioniList.classList.add("recensioniList");


    for (const recensione of ascoltatore._recensioniList) {
        createRecensioneDiv(recensione, recensioniList);
    }
    profileContainer.appendChild(recensioniList);

    const contattaBtn = document.createElement("button");
    contattaBtn.id = "contattaBtn";
    contattaBtn.innerHTML = "Contatta";

    contattaBtn.addEventListener("click", () => {
        localStorage.setItem('ascoltatoreContattato', JSON.stringify(ascoltatore));
        window.location.href = "chatListStudente.html";

    })

    profileContainer.appendChild(contattaBtn);

    // Append the profile container to the emptyContainer div
    const emptyContainer = document.querySelector('#emptyContainer');
    emptyContainer.appendChild(profileContainer);
}

function createRecensioneDiv(recensione, recensioniList) {
    const recDiv = document.createElement("div");
    recDiv.classList.add("recDiv");

    const title = document.createElement("div");
    title.innerHTML = recensione._daStudente.firstName + " dice: ";

    const rating = document.createElement("div");
    rating.innerHTML = recensione._rating + "/5";

    const desc = document.createElement("div");
    desc.innerHTML = recensione.descrizione;

    recDiv.appendChild(title);
    recDiv.appendChild(rating);
    recDiv.appendChild(desc);
    recensioniList.appendChild(recDiv);

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