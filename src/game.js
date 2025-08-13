import { Chapita } from './chapita.js';
import { Payaso } from './payaso.js';
import { Completo } from './completo.js';
import { assets } from './assets.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let chapita = new Chapita();
let payasos = [
  new Payaso(250, 500),
  new Payaso(170, 500, "fuerte"),
  new Payaso(300, 400, "ladron")
];
let completos = [
  new Completo(100, 550),
  new Completo(250, 420)
];

function drawUI() {
  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.fillText(`Salud: ${chapita.health}`, 10, 30);
  ctx.fillText(`Billetes: ${chapita.billetes}`, 180, 30);
}

function drawBackground() {
  if (assets.fondo) {
    ctx.drawImage(assets.fondo, 0, 0, canvas.width, canvas.height);
  } else {
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#444";
    ctx.fillRect(0, 400, canvas.width, 240);
    ctx.font = "bold 24px Arial";
    ctx.fillStyle = "#888";
    ctx.fillText("Ciudad", 130, 470);
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();

  chapita.draw(ctx);
  payasos.forEach(payaso => {
    payaso.update(chapita);
    payaso.draw(ctx);
    if (chapita.punching && chapita.collidesWith(payaso) && payaso.alive) {
      payaso.getHit();
      if (!payaso.alive) chapita.billetes += payaso.stealAmount;
    }
  });
  completos.forEach(completo => {
    completo.draw(ctx);
    if (completo.active && chapita.collidesWith(completo)) {
      chapita.heal(completo.amount);
      completo.active = false;
    }
  });
  drawUI();

  // Game Over
  if (chapita.health <= 0 || chapita.billetes <= 0) {
    ctx.fillStyle = "#F00";
    ctx.font = "40px Arial";
    ctx.fillText("¡GAME OVER!", 80, 320);
    return;
  }

  requestAnimationFrame(gameLoop);
}

// Controles móviles
document.getElementById("btn-left").addEventListener("touchstart", () => chapita.move(-1));
document.getElementById("btn-right").addEventListener("touchstart", () => chapita.move(1));
document.getElementById("btn-punch").addEventListener("touchstart", () => chapita.punch());

// También soporta mouse para pruebas en PC
document.getElementById("btn-left").addEventListener("mousedown", () => chapita.move(-1));
document.getElementById("btn-right").addEventListener("mousedown", () => chapita.move(1));
document.getElementById("btn-punch").addEventListener("mousedown", () => chapita.punch());

window.onload = () => {
  gameLoop();
};