import "./homeStudente.css";


// Create header element
const header = document.createElement('header');
header.id = 'header';

// Create logo element
const logo = document.createElement('img');
logo.id = 'logo';
logo.src = 'https://i.postimg.cc/0jh350ZD/Immagine-Whats-App-2023-05-31-ore-19-37-36.jpg';

// Create navigation element
const navigation = document.createElement('nav');
navigation.id = 'navigation';

// Create unordered list element
const ul = document.createElement('ul');

// Create list items and anchor elements
const homeLink = document.createElement('li');
homeLink.innerHTML = '<a href="#">Home</a>';

const chiSiamoLink = document.createElement('li');
chiSiamoLink.innerHTML = '<a href="#">Chi Siamo</a>';

const contattiLink = document.createElement('li');
contattiLink.innerHTML = '<a href="#">Contatti</a>';

// Append list items to the unordered list
ul.appendChild(homeLink);
ul.appendChild(chiSiamoLink);
ul.appendChild(contattiLink);

// Append the unordered list to the navigation element
navigation.appendChild(ul);

// Create profile icon element
const profileIcon = document.createElement('div');
profileIcon.id = 'profile-icon';

// Create profile image element
const profileImage = document.createElement('img');
profileImage.id = 'profile-image';
profileImage.src = 'https://i.postimg.cc/mgYqRM91/7407996-icona-utente-icona-persona-client-simbolo-login-testa-segno-icona-design-vettoriale.jpg';
profileImage.alt = 'Immagine Profilo';

// Create profile dropdown element
const profileDropdown = document.createElement('div');
profileDropdown.id = 'profile-dropdown';

// Create anchor elements with icons
const chatLink = document.createElement('a');
chatLink.href = '#';
chatLink.innerHTML = '<i class="fas fa-comments"></i> Chat';

const profileLink = document.createElement('a');
profileLink.href = '#';
profileLink.innerHTML = '<i class="fas fa-user"></i> Profilo';

const settingsLink = document.createElement('a');
settingsLink.href = '#';
settingsLink.innerHTML = '<i class="fas fa-cog"></i> Impostazioni';

const logoutLink = document.createElement('a');
logoutLink.href = '#';
logoutLink.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';

// Append anchor elements to the profile dropdown
profileDropdown.appendChild(chatLink);
profileDropdown.appendChild(profileLink);
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
mainImage.src = 'https://i.postimg.cc/XYknv087/istockphoto-539246041-612x612.jpg';
mainImage.alt = 'Immagine Principale';

// Append main image to the image container
imageContainer.appendChild(mainImage);

// Create description element
const description = document.createElement('div');
description.id = 'description';

// Create h1 element
const heading = document.createElement('h1');
heading.textContent = 'Benvenuto nel nostro sito';

// Create paragraph element
const paragraph = document.createElement('p');
paragraph.textContent = "La nostra accademia offre lezioni di alta qualità per studenti di tutte le età. Siamo orgogliosi dei nostri istruttori altamente qualificati e delle nostre strutture all'avanguardia. Prenota una lezione oggi stesso e inizia il tuo percorso di apprendimento con noi.";

// Create form element
const form = document.createElement('form');
form.id = 'search-form';

// Create input element
const input = document.createElement('input');
input.type = 'text';
input.id = 'search-input';
input.placeholder = 'Cerca...';

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