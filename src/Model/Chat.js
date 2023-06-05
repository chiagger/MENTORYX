export default class Chat {
    constructor() {
        this.messages = [];
    }

    addMessage(sender, receiver, message) {
        const newMessage = {
            sender,
            receiver,
            message,
            timestamp: new Date(),
        };
        this.messages.push(newMessage);
    }

    getMessages() {
        return this.messages;
    }
}
