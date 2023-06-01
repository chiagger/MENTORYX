import "./homeStudente.css";

const head = document.querySelector("head");
const cssLink = document.createElement('link');
cssLink.rel = 'stylesheet';
cssLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
head.appendChild(cssLink);


// Create header element
const header = document.createElement('header');
header.id = 'header';

// Create logo element
const logo = document.createElement('img');
logo.id = 'logo';
logo.src = 'https://i.imgur.com/UTazMbC.png';

// Create navigation element
const navigation = document.createElement('nav');
navigation.id = 'navigation';

// Create profile icon element
const profileIcon = document.createElement('div');
profileIcon.id = 'profile-icon';

// Create profile image element
const profileImage = document.createElement('img');
profileImage.id = 'profile-image';
profileImage.src = 'https://img.icons8.com/?size=512&id=8xJVtjb4kB9s&format=png';

// Create profile dropdown element
const profileDropdown = document.createElement('div');
profileDropdown.id = 'profile-dropdown';

// Create anchor elements with icons
const chatLink = document.createElement('a');
chatLink.setAttribute('id', 'chatLink');
chatLink.href = '#';
chatLink.innerHTML = '<i class="fas fa-comments"></i> Chat';

const settingsLink = document.createElement('a');
settingsLink.setAttribute('id', 'settingsLink');
settingsLink.href = '#';
settingsLink.innerHTML = '<i class="fas fa-cog"></i> Impostazioni';

const logoutLink = document.createElement('a');
logoutLink.setAttribute('id', 'logoutLink');
logoutLink.href = '#';
logoutLink.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';

// Append anchor elements to the profile dropdown
profileDropdown.appendChild(chatLink);
profileDropdown.appendChild(settingsLink);
profileDropdown.appendChild(logoutLink);

// Append profile image and profile dropdown to the profile icon
profileIcon.appendChild(profileImage);
profileIcon.appendChild(profileDropdown);

// Append logo, navigation, and profile icon to the header
header.appendChild(logo);
header.appendChild(navigation);
header.appendChild(profileIcon);

// Create content element
const content = document.createElement('div');
content.id = 'content';

// Create image container element
const imageContainer = document.createElement('div');
imageContainer.id = 'image-container';

// Create main image element
const mainImage = document.createElement('img');
mainImage.id = 'main-image';
mainImage.src = 'https://images.pexels.com/photos/6325977/pexels-photo-6325977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
mainImage.alt = 'Immagine Principale';

// Append main image to the image container
imageContainer.appendChild(mainImage);

// Create description element
const description = document.createElement('div');
description.id = 'description';

// Create h1 element
const heading = document.createElement('h1');
heading.textContent = 'Benvenuto su ';

const logobig = document.createElement('img');
logobig.setAttribute('id', 'logobig');
logobig.src = "https://i.imgur.com/UTazMbC.png";
heading.appendChild(logobig);

// Create paragraph element
const paragraph = document.createElement('p');
paragraph.textContent = "Trasforma il tuo percorso di studio facilitando il tuo apprendimento! "
    + "Connettiti con ascoltatori competenti cercandoli nella barra di ricerca qua sotto: ";

// Create form element
const form = document.createElement('form');
form.id = 'search-form';

// Create input element
const input = document.createElement('input');
input.type = 'text';
input.id = 'search-input';
input.placeholder = 'Cerca per materia...';

// Create submit button
const button = document.createElement('button');
button.type = 'submit';
button.innerHTML = '<i class="fas fa-search"></i>';

// Append input and button to the form
form.appendChild(input);
form.appendChild(button);

// Append heading, paragraph, and form to the description
description.appendChild(heading);
description.appendChild(paragraph);
description.appendChild(form);

// Append image container and description to the content
content.appendChild(imageContainer);
content.appendChild(description);

// Append header and content to the document body
document.body.appendChild(header);
document.body.appendChild(content);