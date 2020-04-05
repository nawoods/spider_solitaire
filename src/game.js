import { Card } from './card.js';

class Game {
  CARD_WIDTH = 225;
  CARD_HEIGHT = 315;


  img = new Image();


  deck = [
    {
      card: new Card('Q', 'diamonds'),
      x: 200,
      y: 40
    },
    {
      card: new Card('A', 'spades'),
      x: 60,
      y: 100
    },
    {
      card: new Card('7', 'diamonds'),
      x: 250,
      y: 200
    }
  ];

  constructor() {
    this.img.src = './assets/cardsprites.jpg';
    this.img.onload = () => this.renderCards();

    this.addDragListener();

  }

  renderCards() {
    if (!this.canvas) {
      this.canvas = document.querySelector('canvas');
      this.ctx = this.canvas.getContext('2d');
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    console.log(this.deck);
    this.deck.forEach(i => {
      i.card.render(i.x, i.y, this.ctx, this.img);
    })
  }

  addDragListener() {
    if (!this.canvas) {
      this.canvas = document.querySelector('canvas');
      this.ctx = this.canvas.getContext('2d');
    }
    this.canvas.onmousedown = (e) => {
      console.log(e);
      this.deck.forEach(i => {
        if (e.x >= i.x && e.x < i.x + this.CARD_WIDTH &&
          e.y >= i.y && e.y < i.y + this.CARD_HEIGHT) {
          this.dragCard(i, e.x, e.y);
        }
      });
    };
  }

  dragCard(card, mousex, mousey) {
    const offsetx = mousex - card.x;
    const offsety = mousey - card.y;

    const followWhileDragging = (e) => {
      console.log(e);
      // card.render(e.x - offsetx, e.y - offsety, this.ctx);
      card.x = e.x - offsetx;
      card.y = e.y - offsety;
      this.renderCards();
    }

    function stopFollowing(e) {
      document.removeEventListener('mousemove', followWhileDragging);
      document.removeEventListener('mouseup', stopFollowing);
    }

    document.addEventListener('mousemove', followWhileDragging);
    document.addEventListener('mouseup', stopFollowing);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const game = new Game();
  console.log(game.ctx);
});