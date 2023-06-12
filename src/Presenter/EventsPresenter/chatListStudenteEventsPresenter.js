import { getAuth, signOut, getInstance } from "firebase/auth";
import { getDatabase, set, get, update, remove, ref, child, push } from 'firebase/database';
import { app } from '../../Presenter/firebaseConfig';

const auth = getAuth(app);
const db = getDatabase();

import Chat from "../../Model/Chat";




export function activateChat(chatObj, studente, ascoltatore) {
    document.getElementById("send-button").addEventListener("click", sendMessage);
    document.getElementById("message-input").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage(chatObj, studente, ascoltatore);
        }
    });

}


async function sendMessage(chatObj, studente, ascoltatore) {
    await removeChatFromDatabase();
    var messageInput = document.getElementById("message-input");
    var message = messageInput.value.trim();

    if (message !== "") {
        appendMessage("student", message);
        var chat = await getChatFromDatabase(chatObj.receiver, chatObj.sender);
        await insertMessageInChat(chat, message, studente, ascoltatore);
        messageInput.value = "";
        messageInput.focus();
        scrollToBottom();
    }
}

async function insertMessageInChat(chat, message, sender, receiver) {
    try {
        const messageId = push(ref(db, `Chat/${chat.chatId}/messages`)).key;

        const messageData = {
            message: message,
            sender: sender,
            receiver: receiver,
            timestamp: new Date().toISOString(),
        };

        // Get a reference to the specific message in the database
        const messageRef = ref(db, `Chat/${chat.chatId}/messages/${messageId}`);

        // Set the message data in the database
        await set(messageRef, messageData);

        // Update the local chat object with the new message
        chat.messages[messageId] = messageData;

    } catch (error) {
        console.error('Error inserting message:', error);
    }
}

async function getChatFromDatabase(receiver, sender) {
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
                if (chat.receiver.email === receiver.email && chat.sender.email === sender.email) {
                    // Create a new instance of the Chat class
                    const chatInstance = new Chat(chat.receiver, chat.sender);
                    chatInstance.chatId = chatId;
                    chatInstance.messages = chat.messages;

                    return chatInstance;
                }
            }
        }

        return null;
    } catch (error) {
        console.error('Error retrieving chat from the database:', error);
        return null;
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


function scrollToBottom() {
    var chatLog = document.getElementById("chat-log");
    chatLog.scrollTop = chatLog.scrollHeight;
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

