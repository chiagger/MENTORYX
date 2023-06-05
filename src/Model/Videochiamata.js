export default class Videochiamata {
    constructor(chat, participants = [], duration = 0) {
        this.setChat(chat);
        this.participants = participants;
        this.duration = duration;
    }

    addParticipant(participant) {
        if (participant instanceof User) {
            this.participants.push(participant);
        } else {
            throw new Error("Invalid User");
        }
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

    getParticipants() {
        return this.participants;
    }

    getDuration() {
        return this.duration;
    }
}
