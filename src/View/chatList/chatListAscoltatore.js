import { getAuth, signOut, getInstance } from "firebase/auth";
import { getDatabase, set, get, update, remove, ref, child, once } from 'firebase/database';
import { app } from '../../Presenter/firebaseConfig';

import './chatList.css';
import Chat from "../../Model/Chat";
const auth = getAuth(app);
// Get the Firebase Realtime Database instance
const db = getDatabase();


const head = document.querySelector("head");
const cssLink = document.createElement('link');
cssLink.rel = 'stylesheet';
cssLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
head.appendChild(cssLink);


window.onload = async () => {
    await removeChatFromDatabase();

    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        notSignedIn();
    }

}

function notSignedIn() {
    alert("You are not signed in");

    setTimeout(function () {
        window.location.href = "index.html";
    }, 500);
}

const emptyContainer = document.createElement('div');
emptyContainer.id = 'emptyContainer';

const singleChat = document.createElement("div");
singleChat.id = "singleChat";

const header = document.createElement('header');
header.id = 'header';

const logo = document.createElement('img');
logo.id = 'logo';
logo.src = 'https://i.imgur.com/UTazMbC.png';

const navigation = document.createElement('nav');
navigation.id = 'navigation';

header.appendChild(logo);
header.appendChild(navigation);

// Append the chat container to the body of the document
document.body.appendChild(header);
document.body.append(emptyContainer);

import { activateChat, appendMessage } from '../../Presenter/EventsPresenter/chatListAscoltatoreEventsPresenter';



async function openChat(chatObj, studente, ascoltatore) {

    while (singleChat.firstChild) {
        singleChat.removeChild(singleChat.firstChild);
    }

    const chatContainer = document.createElement("div");
    chatContainer.classList.add("chat-container");

    const titolo = document.createElement("div");
    titolo.innerHTML = "Chat con: " + studente.firstName + " " + studente.lastName;

    chatContainer.appendChild(titolo);


    // Create the chat log div and append it to the chat container
    const chatLog = document.createElement("div");
    chatLog.classList.add("chat-log");
    chatLog.id = "chat-log";
    chatContainer.appendChild(chatLog);

    // Create the chat input div and append it to the chat container
    const chatInput = document.createElement("div");
    chatInput.classList.add("chat-input");
    chatContainer.appendChild(chatInput);

    // Create the message input element and append it to the chat input
    const messageInput = document.createElement("input");
    messageInput.type = "text";
    messageInput.id = "message-input";
    messageInput.placeholder = "Scrivi un messaggio";
    chatInput.appendChild(messageInput);

    // Create the send button element and append it to the chat input
    const sendButton = document.createElement("button");
    sendButton.id = "send-button";
    sendButton.textContent = "Invia";
    chatInput.appendChild(sendButton);
    singleChat.appendChild(chatContainer);
    emptyContainer.appendChild(singleChat);


    const messagesArray = await allMessagesArrayFrom(chatObj);

    activateChat(chatObj, studente, ascoltatore);

    displayMessages(messagesArray, ascoltatore);


}


async function allMessagesArrayFrom(chat) {
    const messagesArr = []

    const messagesObj = Object.values(chat.messages);
    for (let i = 0; i < messagesObj.length; i++) {
        messagesArr.push(messagesObj.at(i));
    }

    return messagesArr;
}





function displayMessages(messagesArray, ascoltatore) {

    var whoami;
    for (let i = 0; i < messagesArray.length; i++) {
        if (messagesArray.at(i).sender.email !== ascoltatore.email) {
            whoami = "receiver";
        } else {
            whoami = "sender";
        }

        if (whoami === "sender") {
            appendMessage("professor", messagesArray.at(i).message)
        } else {
            appendMessage("student", messagesArray.at(i).message)
        }


    }

}



//correct way to get studente and ascoltatore
const ascoltatoreuid = JSON.parse(localStorage.getItem("currentUser")).uid;
const ascoltatore = await getUtenteObject(ascoltatoreuid);
//come lo prendo lo studente?
//const studente = JSON.parse(localStorage.getItem('ascoltatoreContattato'));

getChatswithUser(ascoltatore);


async function getChatswithUser(ascoltatore) {
    await removeChatFromDatabase();

    const chatsRef = ref(db, 'Chat/');
    const userChats = [];

    // Retrieve all chats from the database
    get(chatsRef).then((snapshot) => {
        if (snapshot.exists()) {
            const chats = snapshot.val();
            // Iterate over each chat
            Object.keys(chats).forEach(async (chatId) => {
                const chat = chats[chatId];


                // Check if the user is a participant in the chat
                if (chat.sender.email === ascoltatore.email || chat.receiver.email === ascoltatore.email) {
                    // Add the chat to the user's chats array
                    userChats.push(chat);
                }
            });

            // Once all chats are processed, display the list of chatschatData
            displayChats(userChats);
        } else {
            // Handle case when no chats exist
        }
    }).catch((error) => {
        // Handle any errors
        console.error('Error getting chats:', error);
    });

}

function displayChats(chats) {
    const listContainer = document.createElement("div");
    listContainer.id = "listContainer"

    const yourChats = document.createElement("div");
    yourChats.innerHTML = "Le tue chat: ";
    yourChats.id = "yourChats";

    listContainer.appendChild(yourChats);

    chats.forEach(async (chat) => {
        const studente = (chat.sender.email !== ascoltatore.email) ? chat.sender : chat.receiver;
        const chatElement = document.createElement("div");
        chatElement.classList.add("chatElement");

        const nameDiv = document.createElement("div");
        nameDiv.classList.add("nameDiv");
        nameDiv.innerHTML = studente.firstName + " " + studente.lastName;

        const lastMessage = document.createElement("div");
        lastMessage.classList.add("lastMessage");
        const messagesObj = Object.values(chat.messages);
        lastMessage.innerHTML = "Last message: " + messagesObj[messagesObj.length - 1].message;


        chatElement.appendChild(nameDiv);
        chatElement.appendChild(lastMessage);
        listContainer.appendChild(chatElement);

        //qua si apre la chat singola
        chatElement.addEventListener("click", () => {
            openChat(chat, studente, ascoltatore);
        })

    })

    emptyContainer.appendChild(listContainer);

}


async function removeChatFromDatabase() {
    // Get a reference to the 'Chat' node in the database
    const chatsRef = ref(db, 'Chat/');

    try {
        // Retrieve the snapshot of all chats from the database
        const snapshot = await get(chatsRef);

        if (snapshot.exists()) {
            const chats = snapshot.val();

            // Iterate over each chat in the database
            for (const chatId in chats) {
                const chat = chats[chatId];

                // Check if the chat's receiver and sender match the target receiver and sender
                if (!chat.messages) {
                    // Remove the chat from the database
                    const chatToRemoveRef = child(chatsRef, chatId);
                    await set(chatToRemoveRef, null);
                    return;
                }
            }
        }

    } catch (error) {
        console.error('Error removing chat from the database:', error);
    }
}



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
