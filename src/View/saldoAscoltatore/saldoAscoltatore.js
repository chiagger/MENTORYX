import "./saldoAscoltatore.css";

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
        if (category !== "Ascoltatore") {
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
profileDropdown.appendChild(walletLink);
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
