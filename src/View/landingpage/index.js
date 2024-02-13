import './landingpage.css';
import '../normalize.css';

//dynamically created DOM
const container = document.createElement('div');
container.classList.add("container");

function header() {
  const header = document.createElement('div');
  const left = document.createElement('div');
  const center = document.createElement('div');
  const right = document.createElement('div');

  header.classList.add("header");
  left.classList.add("left");
  center.classList.add("center");
  right.classList.add("right");


  const title = document.createElement('img');
  title.src = "https://i.imgur.com/UTazMbC.png";
  title.setAttribute('id', 'headinglogo');
  left.appendChild(title);

  const ul = document.createElement('ul');
  const li1 = document.createElement('li');
  const li2 = document.createElement('li');
  const li3 = document.createElement('li');
  const homeBtn = document.createElement('button');
  homeBtn.setAttribute('id', 'homeBtn');
  homeBtn.innerHTML = 'Home';
  li1.appendChild(homeBtn);
  li2.innerHTML = "Chi Siamo";
  li2.setAttribute('id', 'chisiamoBtn');
  li3.innerHTML = "Contatti";
  li3.setAttribute('id', 'contattiBtn');

  ul.appendChild(li1);
  ul.appendChild(li2);
  ul.appendChild(li3);
  center.appendChild(ul);

  const loginBtn = document.createElement('button');
  loginBtn.setAttribute('id', 'login');
  loginBtn.innerHTML = 'LOG IN';
  right.appendChild(loginBtn);

  header.appendChild(left);
  header.appendChild(center);
  header.appendChild(right);
  container.appendChild(header);

  return header;
}

function innerContainer() {
  const landingpage = document.createElement('div');
  const left = document.createElement('div');
  const right = document.createElement('div');

  landingpage.classList.add("landingpage");
  left.classList.add("left");
  right.classList.add("right");

  const top = document.createElement('div');
  const bottom = document.createElement('div');
  top.classList.add("top");
  bottom.classList.add("bottom");

  const phrase1 = document.createElement('div');
  phrase1.classList.add("phrase");
  phrase1.innerHTML = "Unlock your potential with";
  const logo = document.createElement('img');
  logo.src = "https://i.imgur.com/UTazMbC.png";
  logo.setAttribute('id', 'logo');

  top.appendChild(phrase1);
  top.appendChild(logo);

  const phrase2 = document.createElement('div');
  phrase2.classList.add("phrase");
  phrase2.innerHTML = "Trova qualcuno che ti ascolti davvero";
  const signupBtn = document.createElement('button');
  signupBtn.setAttribute('id', 'signup');
  signupBtn.innerHTML = "SIGN UP";

  bottom.appendChild(phrase2);
  bottom.appendChild(signupBtn);

  left.appendChild(top);
  left.appendChild(bottom);

  const img = document.createElement('img');
  img.src = "landing.jpg";

  right.appendChild(img);

  landingpage.appendChild(left);
  landingpage.appendChild(right);
  return landingpage;
}


function chisiamo() {
  const chisiamopage = document.createElement('div');
  const left = document.createElement('div');
  const right = document.createElement('div');

  chisiamopage.classList.add("chisiamopage");
  left.classList.add("leftchisiamo");
  right.classList.add("rightchisiamo");

  const title = document.createElement('div');
  title.classList.add("title");
  title.innerHTML = "Vi aiutiamo a trovare un ascoltatore " +
    "competente che possa aiutarvi ad eccellere nel vostro percorso scolastico.";


  const phrase1 = document.createElement('div');
  phrase1.classList.add("phrase");
  phrase1.innerHTML = "Siamo un gruppo di tre studentesse di Ingegneria Informatica "
    + "presso l'Università di Bologna. Abbiamo sviluppato questo software "
    + "come parte del nostro progetto per l'esame di Ingegneria del Software. "
    + "Siamo entusiaste di presentarvi MENTORYX, un'applicazione innovativa che facilita "
    + "la comunicazione e la collaborazione tra studenti e ascoltatori.";

  const subtitle1 = document.createElement('div');
  subtitle1.classList.add("subtitle");
  subtitle1.innerHTML = "La nostra missione";

  const phrase2 = document.createElement('div');
  phrase2.classList.add("phrase");
  phrase2.innerHTML = "La nostra missione è quella di fornire "
    + "uno strumento efficace che aiuti gli studenti a trovare "
    + "il supporto di cui hanno bisogno e consenta agli ascoltatori "
    + "di mettere a disposizione le proprie competenze. Crediamo che "
    + "l'apprendimento e lo sviluppo personale siano favoriti da un " +
    "ambiente di supporto e condivisione delle conoscenze.";

  right.appendChild(title);
  right.appendChild(phrase1);
  right.appendChild(subtitle1);
  right.appendChild(phrase2);

  const img = document.createElement('img');
  img.src = "https://images.unsplash.com/photo-1624727828618-ee42ef2ec5cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80";

  left.appendChild(img);

  chisiamopage.appendChild(left);
  chisiamopage.appendChild(right);
  return chisiamopage;
}

function contattaci() {

  const main = document.createElement('main');
  main.classList.add("contattacipage");

  const section1 = document.createElement('section');
  section1.classList.add("section");
  const h2_1 = document.createElement('h2');
  h2_1.textContent = 'Informazioni di contatto';
  const p = document.createElement('p');
  p.textContent = 'Per qualsiasi domanda, dubbio o richiesta, non esitate a contattarci. Saremo lieti di assistervi.';
  const ul = document.createElement('ul');
  const li1 = document.createElement('li');
  li1.textContent = 'Email: info@mentoryx.com';
  const li2 = document.createElement('li');
  li2.textContent = 'Telefono: +39 3293389259';
  const li3 = document.createElement('li');
  li3.textContent = 'Indirizzo: Viale del Risorgimento 2, 40136, Bologna';
  ul.appendChild(li1);
  ul.appendChild(li2);
  ul.appendChild(li3);
  section1.appendChild(h2_1);
  section1.appendChild(p);
  section1.appendChild(ul);

  const section2 = document.createElement("div");
  const imglogo = document.createElement("img");
  imglogo.setAttribute('id', 'imglogo');
  imglogo.src = "https://i.imgur.com/UTazMbC.png";
  section2.appendChild(imglogo);

  main.appendChild(section1);
  main.appendChild(section2);

  return main;
}

container.appendChild(header());
container.appendChild(innerContainer());
container.appendChild(chisiamo());
container.appendChild(contattaci());
document.body.appendChild(container);


const chisiamopage = document.querySelector(".chisiamopage");
const contattacipage = document.querySelector(".contattacipage");



window.onload = function () {
  chisiamopage.style.visibility = "hidden";
  contattacipage.style.visibility = "hidden";

}


//redirect to Signup and Login pages
const signupBtn = document.getElementById("signup");
signupBtn.addEventListener("click", handleSignup);
function handleSignup() {
  window.location.href = 'registration.html';
}

const loginBtn = document.getElementById("login");
loginBtn.addEventListener("click", handleLogin);
function handleLogin() {
  window.location.href = 'auth.html';
}



//home, chi siamo, contatti
const homeBtn = document.getElementById('homeBtn');
const chisiamoBtn = document.getElementById('chisiamoBtn');
const contattiBtn = document.getElementById('contattiBtn');

const landingpage = document.querySelector(".landingpage");


homeBtn.addEventListener("click", () => {
  chisiamopage.style.visibility = "hidden";
  contattacipage.style.visibility = "hidden";
  landingpage.style.visibility = 'visible';
})

chisiamoBtn.addEventListener("click", () => {
  landingpage.style.visibility = 'hidden';
  contattacipage.style.visibility = "hidden";
  chisiamopage.style.visibility = "visible";
})

contattiBtn.addEventListener("click", () => {
  chisiamopage.style.visibility = "hidden";
  landingpage.style.visibility = 'hidden';
  contattacipage.style.visibility = "visible";

})