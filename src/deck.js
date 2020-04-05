import { Card } from './card.js';

class Deck {

  constructor(ranks, suits) {
    this.suits = suits;
    this.ranks = ranks;

    this.cards = this.createDeck();
    this.shuffle();
  }

  createDeck() {
    let newCards = [];
    this.suits.forEach(suit => {
      this.ranks.forEach(rank => {
        newCards.push(new Card(rank, suit));
      })
    })
    return newCards;
  }

  shuffle() {
    let newCards = [];
    while (this.cards.length > 0) {
      let randomIndex = Math.floor(Math.random() * this.cards.length);
      let randomCard = this.cards.splice(randomIndex, 1)[0];
      newCards.push(randomCard);
    }
    this.cards = newCards;
  }

  dealCard() {
    return this.cards.pop();
  }
}

export { Deck };