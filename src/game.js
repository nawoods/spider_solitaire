import { Card } from './card.js';

class Game {
  CARD_WIDTH = 225;
  CARD_HEIGHT = 315;

  canvas = document.querySelector('canvas');
  ctx = this.canvas.getContext('2d');

  constructor() {
    (new Card('Q', 'diamonds')).render(200, 40, this.ctx);
    (new Card('A', 'spades')).render(60, 100, this.ctx);

    const h7loc = { x: 250, y: 200 };
    const h7 = new Card('7', 'hearts');
    h7.render(h7loc.x, h7loc.y, this.ctx);

    this.canvas.onmousedown = (e) => {
      if (e.x >= h7loc.x && e.x < h7loc.x + this.CARD_WIDTH &&
        e.y >= h7loc.y && e.y < h7loc.y + this.CARD_HEIGHT) {
        this.dragCard(h7, h7loc.x, h7loc.y, e.x, e.y);
      }
    };
  }

  dragCard(card, dx, dy, mousex, mousey) {
    const offsetx = mousex - dx;
    const offsety = mousey - dy;

    const followWhileDragging = (e) => {
      console.log(e);
      card.render(e.x - offsetx, e.y - offsety, this.ctx);
    }

    function stopFollowing(e) {
      document.removeEventListener('mousemove', followWhileDragging);
      document.removeEventListener('mouseup', stopFollowing);
    }

    document.addEventListener('mousemove', followWhileDragging);
    document.addEventListener('mouseup', stopFollowing);
  }
}

new Game();