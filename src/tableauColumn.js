class TableauColumn {
  constructor(dx, dy, distanceBetweenCards, ctx, img) {
    this.dx = dx;
    this.dy = dy;
    this.distanceBetweenCards = distanceBetweenCards;
    this.ctx = ctx;
    this.img = img;
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
}

export { TableauColumn };