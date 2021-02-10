export default class Card {

  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  show() {
    return `${this.rank} of ${this.suit}`;
  }

}
