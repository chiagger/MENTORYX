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

    
    const title = document.createElement('div');
    title.innerHTML = "MENTORYX";
    left.appendChild(title);

    const ul = document.createElement('ul');
    const li1 = document.createElement('li');
    const li2 = document.createElement('li');
    const li3 = document.createElement('li');
    li1.innerHTML = "Home";
    li2.innerHTML = "Chi Siamo";
    li3.innerHTML = "Contatti";
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
    const logo = document.createElement('div');
    logo.classList.add("logo");
    logo.innerHTML = "MENTORYX";

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
    img.src = "../src/View/landingpage/img/landingpage.jpg";

    right.appendChild(img);

    landingpage.appendChild(left);
    landingpage.appendChild(right);
    return landingpage;
  }

  container.appendChild(header());
  container.appendChild(innerContainer());
  document.body.appendChild(container);


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
