export default class Videochiamata {
    constructor(chat, duration = 0) {
        this.setChat(chat);
        this.duration = duration;
    }

    endCall(duration) {
        this.duration = duration;
    }

    setChat(value) {
        if (value instanceof Chat) {
            this.chat = chat;
        } else {
            throw new Error("Invalid Chat");
        }
    }

    getChat() {
        return this.chat;
    }

    getDuration() {
        return this.duration;
    }
}
