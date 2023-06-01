export default class User {
  constructor(firstName, lastName, email, metodiPagamento = []) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.metodiPagamento = metodiPagamento;
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

  getMetodiPagamento() {
    return this.metodiPagamento;
  }

  setMetodiPagamento(metodoPagamento) {
    this.metodiPagamento.push(metodoPagamento);
  }


}

