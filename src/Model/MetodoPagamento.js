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

    getCardNumber() {
        return this.cardNumber;
    }

    getCardExpiryDate() {
        return this.cardExpiryDate;
    }

    getCardCVV() {
        return this.cardCVV;
    }
}
