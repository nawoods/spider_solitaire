class TableauColumn {
  constructor(dx, dy, gameConfig) {
    this.dx = dx;
    this.dy = dy;
    this.distanceBetweenCards = gameConfig.defaultDistanceBetweenCards;
    this.cardHeight = gameConfig.cardHeight;
    this.gameConfig = gameConfig;
    this.cards = [];
  }

  addCard(newCard, faceUp) {
    if (faceUp !== undefined) {
      newCard.faceUp = faceUp;
    }

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
    const topOfLastCard = this.endOfStackYValue() - this.gameConfig.cardHeight;
    if (mousey > topOfLastCard) {
      numberOfCards = 1;
    } else {
      numberOfCards = 1 + Math.ceil((topOfLastCard - mousey) / this.distanceBetweenCards);
    }

    console.log(this.cards[this.cards.length - numberOfCards]);
    if (this.cards[this.cards.length - numberOfCards].card.faceUp) {
      return this.removeCards(numberOfCards);
    } else {
      return [];
    }
  }

  removeCards(number) {
    let returnVal;
    if (number) {
      returnVal = this.cards.splice(-1 * number, number);
    } else {
      returnVal = this.removeCards(1);
    }
    return returnVal;
  }

  isValidMove(cardAndLoc) {
    // const topOfLastCard = this.endOfStackYValue() - this.gameConfig.cardHeight;
    return Math.abs(this.dx - cardAndLoc.x) < this.gameConfig.cardWidth / 3;
  }

  render() {
    for (let i = 0; i < this.cards.length; i++) {
      this.cards[i].card.render(
        this.dx,
        this.dy + i * this.distanceBetweenCards
      );
    }
  }

  flipTopCardIfFaceDown() {
    if (this.cards.length > 0) {
      this.cards[this.cards.length - 1].card.faceUp = true;
    }
  }

  endOfStackYValue() {
    if (this.cards.length === 0) {
      return this.dy;
    } else {
      return this.dy + this.gameConfig.cardHeight + this.distanceBetweenCards 
        * (this.cards.length - 1);
    }
  }
}

export { TableauColumn };