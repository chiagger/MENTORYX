import "./recensione.css";
import "../../Presenter/EventsPresenter/commonEvents";

const head = document.querySelector("head");
const cssLink = document.createElement('link');
cssLink.rel = 'stylesheet';
cssLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
head.appendChild(cssLink);









window.onload = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        notSignedIn();
    } else {
        const category = localStorage.getItem("currentUserCategory");
        if (category !== "Studente") {
            notSignedInCorrectly();
        }
    }
}

function notSignedIn() {
    // Display alert message
    alert("You are not signed in");

    // Wait for 3 seconds (3000 milliseconds)
    setTimeout(function () {
        // Redirect to index.html
        window.location.href = "index.html";
    }, 500);
}

function notSignedInCorrectly() {
    // Display alert message
    alert("You are not correctly signed in");

    // Wait for 3 seconds (3000 milliseconds)
    setTimeout(function () {
        // Redirect to index.html
        window.location.href = "index.html";
    }, 500);
}


// Create header element
const header = document.createElement('header');
header.id = 'header';

// Create logo image element
const logo = document.createElement('img');
logo.id = 'logo';
logo.src = 'https://i.imgur.com/UTazMbC.png';

// Create navigation element
const navigation = document.createElement('nav');
navigation.id = 'navigation';

// Create profile icon container
const profileIcon = document.createElement('div');
profileIcon.setAttribute('id', 'profile-icon');

// Create profile image element
const profileImage = document.createElement('img');
profileImage.id = 'profile-image';
profileImage.src = 'https://img.icons8.com/?size=512&id=8xJVtjb4kB9s&format=png';

// Create profile dropdown container
const profileDropdown = document.createElement('div');
profileDropdown.id = 'profile-dropdown';

// Create chat link element
const chatLink = document.createElement('a');
chatLink.id = 'chatLink';
chatLink.href = '#';
chatLink.innerHTML = '<i class="fas fa-comments"></i> Chat';

// Create settings link element
const settingsLink = document.createElement('a');
settingsLink.id = 'settingsLink';
settingsLink.href = '#';
settingsLink.innerHTML = '<i class="fas fa-cog"></i> Impostazioni';

// Create logout link element
const logoutLink = document.createElement('a');
logoutLink.id = 'logoutLink';
logoutLink.href = '#';
logoutLink.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';

//portafoglio
const walletLink = document.createElement('a');
walletLink.id = 'walletLink';
walletLink.href = '#';
walletLink.innerHTML = '<i class="fas fa-envelope"></i> Saldo';

// Append child elements to their respective parents
profileDropdown.appendChild(chatLink);
profileDropdown.appendChild(settingsLink);
profileDropdown.appendChild(logoutLink);

profileIcon.appendChild(profileImage);
profileIcon.appendChild(profileDropdown);

navigation.appendChild(profileIcon);

header.appendChild(logo);
header.appendChild(navigation);

// Create content element
const content = document.createElement('div');
content.id = 'content';




// Append  to content


// Append header and content to the document body
document.body.appendChild(header);
document.body.appendChild(content);


import { getAuth, signOut, getInstance } from "firebase/auth";
import { getDatabase, set, get, update, remove, ref, child } from 'firebase/database';
import { app } from '../../Presenter/firebaseConfig';
const auth = getAuth(app);

import LogPresenter from '../../Presenter/LogPresenter/LogPresenter.js';
const log = new LogPresenter();

window.onload = function () {
    // Mostra o nasconde il dropdown del profilo
    console.log(document.getElementById("profile-icon"));
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



    //logout functionality
    const logoutLink = document.getElementById('logoutLink');
    logoutLink.addEventListener("click", () => {
        signOut(auth).then(() => {
            const currentUser = localStorage.getItem('currentUser');
            log.logoutLog(JSON.parse(currentUser));
            localStorage.clear();
            window.location.href = "index.html";
        }).catch((error) => {
            alert(error);
        })
    });




    const settingsLink = document.getElementById('settingsLink');
    settingsLink.addEventListener("click", () => {
        const currentUser = localStorage.getItem('currentUser');
        log.changedPasswordLog(JSON.parse(currentUser));
        window.location.href = "impostazioni.html";
    });
}



// Function to create and append an HTML element
function createAndAppend(parent, elementType, attributes) {
    const element = document.createElement(elementType);
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    parent.appendChild(element);
    return element;
}

// Create the review form container
const reviewForm = createAndAppend(content, 'div', { id: 'review-form' });

// Create the form element
const form = createAndAppend(reviewForm, 'form', { id: 'review' });

// Create the form heading
createAndAppend(form, 'h2', {}).textContent = 'Scrivi una Recensione';

// Create the title input field
const titleDiv = createAndAppend(form, 'div', {});
createAndAppend(titleDiv, 'label', { for: 'title' }).textContent = 'Titolo:';
createAndAppend(titleDiv, 'input', { type: 'text', id: 'title', required: true });

// Create the rating dropdown
const ratingDiv = createAndAppend(form, 'div', {});
createAndAppend(ratingDiv, 'label', { for: 'rating' }).textContent = 'Valutazione:';
const ratingSelect = createAndAppend(ratingDiv, 'select', { id: 'rating', required: true });
createAndAppend(ratingSelect, 'option', { value: '', disabled: true, selected: true }).textContent = 'Seleziona';
createAndAppend(ratingSelect, 'option', { value: '5' }).textContent = '5 stelle';
createAndAppend(ratingSelect, 'option', { value: '4' }).textContent = '4 stelle';
createAndAppend(ratingSelect, 'option', { value: '3' }).textContent = '3 stelle';
createAndAppend(ratingSelect, 'option', { value: '2' }).textContent = '2 stelle';
createAndAppend(ratingSelect, 'option', { value: '1' }).textContent = '1 stelle';

// Create the description textarea
const descriptionDiv = createAndAppend(form, 'div', {});
createAndAppend(descriptionDiv, 'label', { for: 'description' }).textContent = 'Descrizione:';
createAndAppend(descriptionDiv, 'textarea', { id: 'description', rows: '4', required: true });

// Create the submit button
createAndAppend(form, 'div', {}).innerHTML = '<button type="submit">Submit Review</button>';

// Function to handle form submission
function submitReview(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const rating = document.getElementById('rating').value;
    const description = document.getElementById('description').value;

    // Perform validation if needed (e.g., check if fields are not empty)

    // You can perform further processing here, like sending the data to a server for storage

    // For this example, we'll just display the review data in the console
    console.log('Review submitted:');
    console.log('Title:', title);
    console.log('Rating:', rating);
    console.log('Description:', description);

    // Clear form fields after submission
    form.reset();
}

// Attach the submitReview function to the form's submit event
form.addEventListener('submit', submitReview);
