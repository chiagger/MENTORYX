export default class MetodoPagamento {
    constructor(cardHolder, cardNumber, cardExpiryDate, cardCVV) {
        this.cardHolder = cardHolder;
        this.cardNumber = cardNumber;
        this.cardExpiryDate = cardExpiryDate;
        this.cardCVV = cardCVV;
    }

    getCardHolder() {
        return this.cardHolder;
    }

    setCardHolder(cardHolder) {
        this.cardHolder = cardHolder;
    }

    getCardNumber() {
        return this.cardNumber;
    }

    setCardNumber(cardNumber) {
        this.cardNumber = cardNumber;
    }

    getCardExpiryDate() {
        return this.cardExpiryDate;
    }

    setCardExpiryDate(cardExpiryDate) {
        this.cardExpiryDate = cardExpiryDate;
    }

    getCardCVV() {
        return this.cardCVV;
    }

    setCardCVV(cardCVV) {
        this.cardCVV = cardCVV;
    }
}
