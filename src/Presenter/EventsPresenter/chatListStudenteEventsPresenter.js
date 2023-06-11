import { getAuth, signOut, getInstance } from "firebase/auth";
import { getDatabase, set, get, update, remove, ref, child } from 'firebase/database';
import { app } from '../../Presenter/firebaseConfig';

const auth = getAuth(app);
const db = getDatabase();

const studenteuid = JSON.parse(localStorage.getItem("currentUser")).uid;
const studente = await getUtenteObject(studenteuid);
const ascoltatore = localStorage.getItem('ascoltatoreContattato');



function getUtenteObject(uid) {
    const myUserData = ref(db);
    return get(child(myUserData, "Users/" + uid))
        .then((snapshot) => {
            const snapshotValue = snapshot.val();
            const firstChildValue = Object.values(snapshotValue)[0];
            const utente = JSON.parse(firstChildValue);
            return utente;
        })
        .catch((error) => {
            alert(error);
            throw error; // Propagate the error further
        });
}



export function activateChat(chatObj, studente, ascoltatore) {
    console.log(chatObj);

    document.getElementById("send-button").addEventListener("click", sendMessage);
    document.getElementById("message-input").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

}


function sendMessage() {
    var messageInput = document.getElementById("message-input");
    var message = messageInput.value.trim();

    if (message !== "") {
        appendMessage("student", message);
        simulateProfessorReply();
        messageInput.value = "";
        messageInput.focus();
        scrollToBottom();
    }
}

export function appendMessage(sender, message) {
    var chatLog = document.getElementById("chat-log");
    var bubbleContainer = document.createElement("div");
    bubbleContainer.classList.add("bubble-container");

    var bubble = document.createElement("div");
    bubble.classList.add("bubble", sender);
    bubble.textContent = message;

    bubbleContainer.appendChild(bubble);
    chatLog.prepend(bubbleContainer); // Prepend the new message

    // Limit the width of the bubble
    var maxWidth = chatLog.offsetWidth * 0.8; // 80% of the chat log width
    bubble.style.maxWidth = maxWidth + "px";

    scrollToBottom();
}

function simulateProfessorReply() {
    var replies = [
        "Ciao! Come posso aiutarti?",
        "Mi dispiace, non ho le informazioni necessarie.",
        "Hai provato a consultare il materiale di riferimento?",
        "Sono disponibile per una riunione domani alle 14:00.",
        "Per favore, inviami il tuo codice per poterti aiutare meglio."
    ];
    var randomReply = replies[Math.floor(Math.random() * replies.length)];
    appendMessage("professor", randomReply);
}

function scrollToBottom() {
    var chatLog = document.getElementById("chat-log");
    chatLog.scrollTop = chatLog.scrollHeight;
}

