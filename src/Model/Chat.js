import { getDatabase, ref, push, set } from 'firebase/database';

// Get the Firebase Realtime Database instance
const db = getDatabase();

export default class Chat {
    constructor(sender, receiver) {
        this.sender = sender;
        this.receiver = receiver;
        this.chatId = null;
        this.messages = [];
    }

    createChatInDatabase() {
        // Generate a new unique key for the chat
        const chatRef = push(ref(db, 'Chat'));
        this.chatId = chatRef.key;
    }

    addMessageToDatabase(message) {
        if (!this.chatId) {
            throw new Error('Chat is not created in the database yet.');
        }

        const chatRef = ref(db, `Chat/${this.chatId}`);
        set(chatRef, {
            sender: this.sender,
            receiver: this.receiver,
            messages: [...this.messages, message],
        });
    }

    addMessage(message) {
        const newMessage = {
            sender: message.sender,
            receiver: message.receiver,
            message: message.message,
            timestamp: new Date(),
        };
        this.messages.push(newMessage);
        this.addMessageToDatabase(newMessage);
    }

    getMessages() {
        return this.messages;
    }
}
