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

  setChatList(chat, videochiamata) {
    if (chat instanceof Chat) {
      this.chatList.push({
        chat,
        videochiamataList: [videochiamata],
      });
    } else {
      throw new Error("Invalid Chat object");
    }
  }

  addVideochiamataToChat(chatIndex, videochiamata) {
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


/*  ESEMPIO DI COME USARLO
const user = new User("John", "Doe", "john@example.com");

// Creating a Chat and Videochiamata objects
const chat = new Chat();
const videochiamata = new Videochiamata();

// Adding the Chat and Videochiamata to the user's chatList
user.setChatList(chat, videochiamata);

// Adding another Videochiamata to the existing chat
const anotherVideochiamata = new Videochiamata();
user.addVideochiamataToChat(0, anotherVideochiamata);

*/