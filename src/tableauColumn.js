class TableauColumn {
  constructor(dx, dy, distanceBetweenCards, ctx, img, cardHeight) {
    this.dx = dx;
    this.dy = dy;
    this.distanceBetweenCards = distanceBetweenCards;
    this.ctx = ctx;
    this.img = img;
    this.cardHeight = cardHeight;
    this.cards = [];
  }

  addCard(newCard) {
    this.cards.push({
      card: newCard,
      x: this.dx,
      y: this.dy + this.cards.length * this.distanceBetweenCards
    });
  }

  addCards(...newCards) {
    newCards.forEach(i => this.addCard(i));
  }

  moveCardsFromStack(mousey) {
    if (mousey < this.dy || mousey >= this.endOfStackYValue()) {
      return [];
    }

    let numberOfCards;
    const topOfLastCard = this.endOfStackYValue() - this.cardHeight;
    if (mousey > topOfLastCard) {
      numberOfCards = 1;
    } else {
      numberOfCards = 1 + Math.ceil((topOfLastCard - mousey) / this.distanceBetweenCards);
    }

    return this.removeCards(numberOfCards);
  }

  removeCards(number) {
    let returnVal;
    if (number) {
      returnVal = this.cards.splice(-1 * number, number);
    } else {
      returnVal = this.removeCards(1)[0];
    }
    return returnVal;
  }

  render() {
    for (let i = 0; i < this.cards.length; i++) {
      this.cards[i].card.render(
        this.dx,
        this.dy + i * this.distanceBetweenCards,
        this.ctx,
        this.img
      );
    }
  }

  endOfStackYValue() {
    if (this.cards.length === 0) {
      return this.dy;
    } else {
      return this.dy + this.cardHeight + this.distanceBetweenCards * (this.cards.length - 1);
    }
  }
}

export { TableauColumn };