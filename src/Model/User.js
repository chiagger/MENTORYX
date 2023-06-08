export default class User {
  constructor(firstName, lastName, email, metodiPagamento = [], chatList = []) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.metodiPagamento = metodiPagamento;
    this.chatList = chatList;
  }

  // Getter methods
  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }

  getEmail() {
    return this.email;
  }

  getMetodiPagamento() {
    return this.metodiPagamento;
  }

  getChatList() {
    return this.chatList;
  }

  // Setter methods
  setFirstName(firstName) {
    this.firstName = firstName;
  }

  setLastName(lastName) {
    this.lastName = lastName;
  }

  setEmail(email) {
    this.email = email;
  }

  setMetodiPagamento(metodoPagamento) {
    if (metodoPagamento instanceof MetodoPagamento) {
      this.metodiPagamento.push(metodoPagamento);
    } else {
      throw new Error("Invalid MetodoPagamento object");
    }
  }



  setChatList(chat) {
    if (chat instanceof Chat) {
      this.chatList.push({
        chat,
        videochiamataList: [],
      });
    } else {
      throw new Error("Invalid Chat object");
    }
  }

  findChatIndex(chat) {
    for (let i = 0; i < this.chatList.length; i++) {
      if (this.chatList[i].chat === chat) {
        return i;
      }
    }
    return -1;
  }

  addVideochiamataToChat(chat, videochiamata) {
    var chatIndex = this.findChatIndex(chat);
    if (videochiamata instanceof Videochiamata) {
      if (chatIndex >= 0 && chatIndex < this.chatList.length) {
        this.chatList[chatIndex].videochiamataList.push(videochiamata);
      } else {
        throw new Error("Invalid chat index");
      }
    } else {
      throw new Error("Invalid Videochiamata object");
    }
  }
}