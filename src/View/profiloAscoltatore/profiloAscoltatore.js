import "./profiloAscoltatore.css";

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
    alert("You are not signed in");

    setTimeout(function () {
        window.location.href = "index.html";
    }, 500);
}

function notSignedInCorrectly() {
    alert("You are not correctly signed in");

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

document.body.appendChild(emptyContainer);
