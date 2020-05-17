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

    if (this.isLegalMoveFromStack(numberOfCards)) {
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

  isLegalMoveFromStack(numberOfCards) {
    const firstCardMovedIndex = this.cards.length - numberOfCards;
    if (!this.cards[firstCardMovedIndex].card.faceUp) return false;

    const suit = this.cards[firstCardMovedIndex].card.suit;
    const rank = this.cards[firstCardMovedIndex].card.rank;
    const leadRankIndex = this.gameConfig.ranks.indexOf(rank);

    for (let i=firstCardMovedIndex+1; i<this.cards.length; i++) {
      let card = this.cards[i].card;
      console.log(this.gameConfig.ranks.indexOf(card.rank));
      console.log(leadRankIndex+i-firstCardMovedIndex);
      if (card.suit !== suit || this.gameConfig.ranks.indexOf(card.rank) !== leadRankIndex+i-firstCardMovedIndex) {
        return false;
      }
    }

    return true;
  }

  isLegalMoveToStack(cardAndLoc) {
    // check if location of card is close to stack
    if (Math.abs(this.dx - cardAndLoc.x) > this.gameConfig.cardWidth / 3) {
      return false;
    }

    const lastCardInStack = this.cards[this.cards.length-1].card;
    const lastCardInStackRankIndex = this.gameConfig.ranks.indexOf(lastCardInStack.rank);
    const movedCardRankIndex = this.gameConfig.ranks.indexOf(cardAndLoc.card.rank);
    return lastCardInStackRankIndex + 1 === movedCardRankIndex;
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