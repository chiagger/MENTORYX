import "./homeAscoltatore.css";

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

// Create image container element
const imageContainer = document.createElement('div');
imageContainer.id = 'image-container';

// Create main image element
const mainImage = document.createElement('img');
mainImage.id = 'main-image';
mainImage.src = 'https://i.postimg.cc/Ss8jwLSX/pexels-photo-5905483.webp';
mainImage.alt = 'Immagine Principale';

// Append main image to image container
imageContainer.appendChild(mainImage);

// Create description element
const description = document.createElement('div');
description.id = 'description';

// Create heading element
const heading = document.createElement('h1');
heading.innerHTML = 'Benvenuto su <img id="logobig" src="https://i.imgur.com/UTazMbC.png">';

// Create paragraph element
const paragraph = document.createElement('p');
paragraph.textContent = 'Sei diplomato? Laureato? Sai metterti alla prova? Sei sulla buona strada per diventare ascoltatore di MENTORYX, scopri il potere di aiutare gli studenti a superare le sfide e raggiungere i loro obiettivi!';

// Append heading and paragraph to description
description.appendChild(heading);
description.appendChild(paragraph);

// Append image container and description to content
content.appendChild(imageContainer);
content.appendChild(description);

// Append header and content to the document body
document.body.appendChild(header);
document.body.appendChild(content);
