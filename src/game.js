import { Deck } from './deck.js';
import { TableauColumn } from './tableauColumn.js';

class Game {
  constructor(gameConfig) {
    this.gameConfig = gameConfig;

    this.deck = new Deck(this.gameConfig);

    this.columns = [
      new TableauColumn(100, 100, this.gameConfig),
      new TableauColumn(400, 100, this.gameConfig),
      new TableauColumn(700, 100, this.gameConfig)
    ];
    for (let i = 0; i < 2; i++) {
      this.columns.forEach(column => column.addCard(this.deck.dealCard(), false));
    }
    for (let i = 0; i < 5; i++) {
      this.columns.forEach(column => column.addCard(this.deck.dealCard(), true));
    }

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
      })
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
        if (column.isValidMove(cardAndLoc)) {
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
}

document.addEventListener('DOMContentLoaded', function () {
  let cardsLoaded = 0;
  const onLoadCard = () => {
    cardsLoaded++;
    if (cardsLoaded == 53) {
      startGame();
    }
  };

  let cardImgs = {};
  const cardsLoc = './assets/cards/';
  const suits = ['H', 'S', 'D', 'C'];
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
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
  let img = new Image();
  img.src = cardsLoc + '1B.svg';
  img.onload = onLoadCard;
  cardImgs.back = img;

  const startGame = () => new Game({
    canvas: document.querySelector('canvas'),
    ctx: document.querySelector('canvas').getContext('2d'),
    // suits: ['hearts', 'spades', 'diamonds', 'clubs'],
    // ranks: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
    // spritesheetUri: './assets/cardsprites.jpg',
    suits,
    ranks,
    cardsLoc,
    cardWidth: 200,
    cardHeight: 280,
    defaultDistanceBetweenCards: 60,
    //img
    cardImgs
  });
})