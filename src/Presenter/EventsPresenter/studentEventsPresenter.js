//connect to firebase
import { getAuth, signOut, getUser } from "firebase/auth";
import { getDatabase, set, get, update, remove, ref, child, onValue } from 'firebase/database';
import { app } from '../firebaseConfig.js';
const auth = getAuth(app);
const db = getDatabase(app);

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
        var ascoltatoriList = await getListeners();

        for (let i = 0; i < ascoltatoriList.length; i++) {
            var ascoltatore = JSON.parse(ascoltatoriList.at(i).Ascoltatore);
            var ascoltatoriCompatibili = [];
            var materie = ascoltatore._materieCompetenzaList;
            for (let j = 0; j < materie.length; j++) {
                if (materie.at(j) === materiaCercata) {
                    if (!ascoltatoriCompatibili.includes(ascoltatore))
                        ascoltatoriCompatibili.push(ascoltatore); //PERCHé SOLO 1???
                }
            }

            /*
                        var titoliContainer = document.createElement("div");
                        titoliContainer.classList.add("titoliContainer");
                        var titoliLabel = document.createElement("div");
                        titoliLabel.innerHTML = "Titoli di Studio:"
                        var titoliStudioList = ascoltatore._titoliStudioList;
                        titoliContainer.appendChild(titoliLabel);
                        if (!titoliStudioList.length) {
                            var titoloElement = document.createElement("div");
                            titoloElement.classList.add("titoloElement");
                            titoloElement.innerHTML = titoliStudioList._tipoTitolo
                                + " in " + titoliStudioList._ambitoTitolo + " conseguito il "
                                + titoliStudioList._dataConseguimentoTitolo;
                            titoliContainer.appendChild(titoloElement);
                        } else {
                            for (let j = 0; j < titoliStudioList.length; j++) {
                                var titoloElement = document.createElement("div");
                                titoloElement.classList.add("titoloElement");
                                titoloElement.innerHTML = titoliStudioList.at(j)._tipoTitolo
                                    + " in " + titoliStudioList.at(j)._ambitoTitolo + " conseguito il "
                                    + titoliStudioList.at(j)._dataConseguimentoTitolo;
                                titoliContainer.appendChild(titoloElement);
                            }
                        }
            
                        var assegnaButton = document.createElement("button");
                        assegnaButton.setAttribute('id', 'assegnaBtn');
                        assegnaButton.innerHTML = "Assegna materie";
            
            
                        element.appendChild(titoliContainer);
                        element.appendChild(assegnaButton);
            */

        }
        console.log(ascoltatoriCompatibili);
        for (let i = 0; i < ascoltatoriCompatibili.length; i++) {
            var ascoltatore = ascoltatoriCompatibili.at(i);
            var element = document.createElement("div");
            element.classList.add("element");
            element.classList.add("ascoltatore");
            var fullName = document.createElement("div");
            fullName.classList.add("name");
            fullName.innerHTML = ascoltatore.firstName + " " + ascoltatore.lastName;
            element.appendChild(fullName);
            innerContainer.appendChild(element);

        }
        document.body.appendChild(innerContainer);
        //Open assegna popup
        /*
        const assegnaBtns = document.querySelectorAll('#assegnaBtn');
        const assegnaBtnsArray = Array.from(assegnaBtns);
        for (let k = 0; k < assegnaBtnsArray.length; k++) {
            assegnaBtnsArray.at(k).addEventListener('click', () => {
                openPopup();
                const submitAssegnaBtn = document.getElementById("setMaterie");
                submitAssegnaBtn.addEventListener("click", () => {
                    submitForm(ascoltatoriList.at(k));
                })
            })
        };*/

    }
}




async function getListeners() {
    const userList = await getUsersFromDatabase();
    const ascoltatoreList = [];

    for (let i = 0; i < userList.length; i++) {
        var uid = userList.at(i).uid;
        var category = await getUserCategory(uid);
        if (category === "Ascoltatore") {

            ascoltatoreList.push(userList.at(i));
        }
    }
    return ascoltatoreList;
}

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
