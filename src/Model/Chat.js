import { getDatabase, ref, push, set } from 'firebase/database';

// Get the Firebase Realtime Database instance
const db = getDatabase();

export default class Chat {
    constructor(receiver, sender) {
        this.sender = sender;
        this.receiver = receiver;
        this.chatId = null;
        this.messages = [];

        this.createChatInDatabase();


    }

    createChatInDatabase() {
        // Generate a new unique key for the chat
        const chatRef = push(ref(db, 'Chat'));
        this.chatId = chatRef.key;

        // Create the initial chat data object
        const chatData = {
            sender: this.sender,
            receiver: this.receiver,
            messages: this.messages,
        };

        // Set the chat data in the database
        set(chatRef, chatData);
    }

    addMessageToDatabase(message) {
        if (!this.chatId) {
            throw new Error('Chat is not created in the database yet.');
        }

        const chatRef = ref(db, `Chat/${this.chatId}/messages`);
        push(chatRef, message);
    }

    addMessage(message, sender, receiver) {
        const newMessage = {
            sender: sender,
            receiver: receiver,
            message: message,
            timestamp: new Date().toISOString(),
        };

        this.messages.push(newMessage);
        this.addMessageToDatabase(newMessage);
    }

    getMessages() {
        return this.messages;
    }
}
