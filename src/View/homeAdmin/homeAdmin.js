import "./homeAdmin.css";

const head = document.querySelector("head");
const cssLink = document.createElement('link');
cssLink.rel = 'stylesheet';
cssLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
head.appendChild(cssLink);


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

// Append child elements to their respective parents
profileDropdown.appendChild(settingsLink);
profileDropdown.appendChild(logoutLink);

profileIcon.appendChild(profileImage);
profileIcon.appendChild(profileDropdown);

navigation.appendChild(profileIcon);

header.appendChild(logo);
header.appendChild(navigation);

// Create an empty container element
const emptyContainer = document.createElement('div');
emptyContainer.id = 'empty-container';

// Append header and empty container to the document body
document.body.appendChild(header);
document.body.appendChild(emptyContainer);