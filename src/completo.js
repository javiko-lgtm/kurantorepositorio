import { assets } from "./assets.js";
export class Completo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.amount = 30;
    this.active = true;
  }
  draw(ctx) {
    if (this.active) {
      if (assets.completo) {
        ctx.drawImage(assets.completo, this.x, this.y, this.width, this.height);
      } else {
        // Imagen temporal
        ctx.fillStyle = "#0f0";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = "#fff";
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.font = "bold 12px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText("Cp", this.x+4, this.y+22);
      }
    }
  }
}