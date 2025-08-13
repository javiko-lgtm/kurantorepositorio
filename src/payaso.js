import { assets } from "./assets.js";

export class Payaso {
  constructor(x, y, type = "normal") {
    this.x = x;
    this.y = y;
    this.width = 48;
    this.height = 48;
    this.type = type;
    this.health = type === "fuerte" ? 40 : 20;
    this.speed = type === "ladron" ? 3 : 2;
    this.alive = true;
    this.stealAmount = type === "fuerte" ? 10 : 5;
  }
  update(chapita) {
    if (!this.alive) return;
    if (this.x > chapita.x) this.x -= this.speed;
    else if (this.x < chapita.x) this.x += this.speed;
    // ataque
    if (chapita.collidesWith(this)) {
      chapita.getHit(10);
      chapita.loseBilletes(this.stealAmount);
    }
  }
  draw(ctx) {
    if (this.alive) {
      if (assets.payaso) {
        ctx.drawImage(assets.payaso, this.x, this.y, this.width, this.height);
      } else {
        // Imagen temporal
        ctx.fillStyle = "#f00";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = "#fff";
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.font = "bold 16px Arial";
        ctx.fillStyle = "#fff";
        ctx.fillText("P", this.x+12, this.y+32);
      }
    }
  }
  getHit() {
    this.health -= 20;
    if (this.health <= 0) this.alive = false;
  }
}