import { assets } from "./assets.js";

export class Chapita {
  constructor() {
    this.x = 50;
    this.y = 500;
    this.width = 48;
    this.height = 48;
    this.health = 100;
    this.billetes = 100;
    this.speed = 5;
    this.punching = false;
  }
  move(dir) {
    this.x += dir * this.speed;
    this.x = Math.max(0, Math.min(this.x, 312));
  }
  punch() {
    this.punching = true;
    setTimeout(() => { this.punching = false; }, 200);
  }
  draw(ctx) {
    if (assets.chapita) {
      ctx.drawImage(assets.chapita, this.x, this.y, this.width, this.height);
    } else {
      // Imagen temporal
      ctx.fillStyle = "#ff0";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.strokeStyle = "#fff";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      ctx.font = "bold 16px Arial";
      ctx.fillStyle = "#000";
      ctx.fillText("C", this.x+12, this.y+32);
    }
    if (this.punching) {
      ctx.strokeStyle = "#FFF";
      ctx.strokeRect(this.x + this.width, this.y + this.height/4, 20, 20);
    }
  }
  heal(amount) {
    this.health = Math.min(this.health + amount, 100);
  }
  loseBilletes(amount) {
    this.billetes = Math.max(this.billetes - amount, 0);
  }
  getHit(amount) {
    this.health = Math.max(this.health - amount, 0);
  }
  collidesWith(obj) {
    return (this.x < obj.x + obj.width &&
      this.x + this.width > obj.x &&
      this.y < obj.y + obj.height &&
      this.y + this.height > obj.y);
  }
}