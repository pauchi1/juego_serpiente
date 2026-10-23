// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");const TAMANIO_CELDA = 25;

const serpiente = [
  {x:8, y:9},
  {x:8, y:10},
  {x:7, y:10},
  {x:6, y:10}
];

let comida = {
  x: 5,
  y: 5
};

let intervaloSerpiente = null;
let direccionActual = "derecha";
let puntaje = 0;

// Primera pintura del juego al cargar la página
dibujarTodo();
pintarComidaInicial();

// =========================
// FUNCIONES DE DIBUJO
// =========================

function iniciarJuego() {
  if (intervaloSerpiente === null) {
    intervaloSerpiente = setInterval(moverSerpiente, 200);
    console.log("Juego iniciado");
  }
}

function pausarJuego() {
  if (intervaloSerpiente !== null) {
    clearInterval(intervaloSerpiente);
    intervaloSerpiente = null;
    console.log("Juego pausado");
  }
}

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarComida();
  pintarSerpiente();
}
    
function dibujarTablero() {
  let anchoCanvas = canvas.width;
  let altoCanvas = canvas.height;
  ctx.strokeStyle = "#5a5a5a"; 
  ctx.beginPath();
  for (let x = 0; x <= anchoCanvas; x += TAMANIO_CELDA) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, altoCanvas);
  }
  for (let y = 0; y <= altoCanvas; y += TAMANIO_CELDA) {
    ctx.moveTo(0, y);
    ctx.lineTo(anchoCanvas, y);
  }
  ctx.stroke(); 
}

function pintarParte(lineaX, lineaY) {
  let posX = lineaX * TAMANIO_CELDA;
  let posY = lineaY * TAMANIO_CELDA;
  ctx.fillRect(posX, posY, TAMANIO_CELDA, TAMANIO_CELDA);
  ctx.strokeStyle = "black"; 
  ctx.strokeRect(posX, posY, TAMANIO_CELDA, TAMANIO_CELDA);
}

function moverSerpiente() {
  let comio = atrapaComida();
  if (direccionActual === "derecha") {
    moverDerecha(comio);
  } else if (direccionActual === "izquierda") {
    moverIzquierda(comio);
  } else if (direccionActual === "arriba") {
    moverArriba(comio);
  } else if (direccionActual === "abajo") {
    moverAbajo(comio);
  }
  if (comio) {
    puntaje += 1;
    document.getElementById("puntaje").textContent = puntaje;
    pintarComidaInicial();
  }
  dibujarTodo();
}

function cambiarDireccion(nuevaDireccion) {
  direccionActual = nuevaDireccion;
}

function pintarComidaInicial() {
  let maxColumnas = canvas.width / TAMANIO_CELDA;
  let maxFilas = canvas.height / TAMANIO_CELDA;
  comida.x = Math.floor(Math.random() * maxColumnas);
  comida.y = Math.floor(Math.random() * maxFilas);
}

function pintarComida() {
  ctx.fillStyle = "#db7f34";
  pintarParte(comida.x, comida.y);
}

function atrapaComida() {
  let cabeza = serpiente[0];
  if (cabeza.x === comida.x && cabeza.y === comida.y) {
    return true;
  }
  return false;
}

function pintarSerpiente() {
  for (let i = 0; i < serpiente.length; i++) {
    let parte = serpiente[i];
    if (i === 0) {
      ctx.fillStyle = "#47c225";
    } else {
      ctx.fillStyle = "#f5e35f";
    }
    pintarParte(parte.x, parte.y);
  }
}

function moverDerecha(comio) {
  let cabezaS = serpiente[0];
  let nCabeza = {
    x: cabezaS.x + 1,
    y: cabezaS.y
  };
  serpiente.unshift(nCabeza);
  if (!comio) {
    serpiente.pop();
  }
}

function moverIzquierda(comio) {
  let cabezaS = serpiente[0];
  let nCabeza = {
    x: cabezaS.x - 1,
    y: cabezaS.y
  };
  serpiente.unshift(nCabeza);
  if (!comio) {
    serpiente.pop();
  }
}

function moverArriba(comio) {
  let cabezaS = serpiente[0];
  let nCabeza = {
    x: cabezaS.x,
    y: cabezaS.y - 1
  };
  serpiente.unshift(nCabeza);
  if (!comio) {
    serpiente.pop();
  }
}

function moverAbajo(comio) {
  let cabezaS = serpiente[0];
  let nCabeza = {
    x: cabezaS.x,
    y: cabezaS.y + 1
  };
  serpiente.unshift(nCabeza);
  if (!comio) {
    serpiente.pop();
  }
}