import { Deck } from './deck.js';
import { TableauColumn } from './tableauColumn.js';

class Game {
  constructor(gameConfig) {
    this.gameConfig = gameConfig;

    this.deck = new Deck(800, 800, this.gameConfig);

    this.columns = [];
    for (let i=0; i<10; i++) {
      this.columns.push(new TableauColumn(20+i*110, 100, this.gameConfig));
    }
    for (let i=0; i<5; i++) {
      this.columns.forEach(column => column.addCard(this.deck.dealCard()));
    }
    for (let i=0; i<4; i++) {
      this.columns[i].addCard(this.deck.dealCard());
    }
    this.columns.forEach(column => column.flipTopCardIfFaceDown());

    this.cardsBeingMoved = [];
    this.addDragListener();

    this.renderCards();
  }

  renderCards() {
    this.gameConfig.ctx.fillStyle = '#333';
    this.gameConfig.ctx.fillRect(0, 0, this.gameConfig.canvas.width, this.gameConfig.canvas.height);
    this.columns.forEach(i => {
      i.render();
    })
    this.cardsBeingMoved.forEach(cardWithLoc => {
      cardWithLoc.card.render(cardWithLoc.x, cardWithLoc.y);
    });
    this.deck.render();
  }

  addDragListener() {
    this.gameConfig.canvas.onmousedown = (e) => {
      this.columns.forEach(column => {
        if (e.x > column.dx && e.x < column.dx + this.gameConfig.cardWidth) {
          this.cardsBeingMoved = column.moveCardsFromStack(e.y);
          this.cardsBeingMoved.forEach(cardAndLoc => {
            this.dragCard(column, cardAndLoc, e.x, e.y);
          });
        }
      });

      if (e.x > this.deck.x && e.x < this.deck.x + this.gameConfig.cardWidth &&
          e.y > this.deck.y && e.y < this.deck.y + this.gameConfig.cardHeight) {
        this.dealFromDeck();
      }
    };
  }

  dragCard(sourceColumn, cardAndLoc, mousex, mousey) {
    const offsetx = mousex - cardAndLoc.x;
    const offsety = mousey - cardAndLoc.y;

    const followWhileDragging = (e) => {
      cardAndLoc.x = e.x - offsetx;
      cardAndLoc.y = e.y - offsety;
      this.renderCards();
    }

    const stopFollowing = e => {
      document.removeEventListener('mousemove', followWhileDragging);
      document.removeEventListener('mouseup', stopFollowing);

      this.columns.forEach(column => {
        if (column.isLegalMoveToStack(cardAndLoc)) {
          column.addCards(...this.cardsBeingMoved.map(cardWithLoc => cardWithLoc.card));
          this.cardsBeingMoved = [];
          this.columns.forEach(i => i.flipTopCardIfFaceDown());
        }
      });

      if (this.cardsBeingMoved.length > 0) {
          sourceColumn.addCards(...this.cardsBeingMoved.map(cardWithLoc => cardWithLoc.card));
          this.cardsBeingMoved = [];
      }

      this.renderCards();
    }

    document.addEventListener('mousemove', followWhileDragging);
    document.addEventListener('mouseup', stopFollowing);
  }

  dealFromDeck() {
    this.columns.forEach(column => column.addCard(this.deck.dealCard(), true));
    this.renderCards();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  let cardsLoaded = 0;
  const onLoadCard = () => {
    cardsLoaded++;
    // 52 cards + back + empty column marker
    if (cardsLoaded == 54) {
      startGame();
    }
  };

  let cardImgs = {};
  const cardsLoc = './assets/cards/';
  const suits = ['H', 'H', 'S', 'S', 'D', 'D', 'C', 'C'];
  const ranks = ['K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'A'];
  suits.forEach(suit => {
    cardImgs[suit] = {};
    ranks.forEach(rank => {
      let img = new Image();
      img.src = cardsLoc + rank + suit + '.svg';
      img.onload = onLoadCard;
      cardImgs[suit][rank] = img;
    });
  });

  // load back of card
  let backImg = new Image();
  backImg.src = cardsLoc + '1B.svg';
  backImg.onload = onLoadCard;
  cardImgs.back = backImg;

  // load "blank" card to be used as empty column marker
  let emptyImg = new Image();
  emptyImg.src = cardsLoc + '2B.svg';
  emptyImg.onload = onLoadCard;
  cardImgs.empty = emptyImg;

  const startGame = () => new Game({
    canvas: document.querySelector('canvas'),
    ctx: document.querySelector('canvas').getContext('2d'),
    suits,
    ranks,
    cardsLoc,
    cardWidth: 100,
    cardHeight: 140,
    defaultDistanceBetweenCards: 30,
    //img
    cardImgs
  });
})