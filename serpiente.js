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
let velocidad = 300;

// Primera pintura del juego al cargar la página
dibujarTodo();
pintarComidaInicial();

alert("Bienvenido al juego de la serpienteee que está buscando la parte de su cola, antes de empezar, les digo buenos días, buenas tardes o buenas noches osiosi")

// =========================
// FUNCIONES DE DIBUJO
// =========================

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarComida();
  pintarSerpiente();
}
function iniciarJuego() {
  if (intervaloSerpiente === null) {
    intervaloSerpiente = setInterval(moverSerpiente, velocidad);
    console.log("Juego iniciado");
    document.getElementById("mensaje").textContent = "Sigue comiendo tanto como puedas :D";
  }
}

function pausarJuego() {
  if (intervaloSerpiente !== null) {
    clearInterval(intervaloSerpiente);
    intervaloSerpiente = null;
    console.log("Juego pausado");
    document.getElementById("mensaje").textContent = "Juego pausado, dale de nuevo a iniciar para continuar";
  }
}

function reiniciarJuego() {
  pausarJuego();
  serpiente.length = 0;
  serpiente.push(
    {x: 8, y: 9},
    {x: 8, y: 10},
    {x: 7, y: 10},
    {x: 6, y: 10}
  );
  direccionActual = "derecha";
  puntaje = 0;
  document.getElementById("puntaje").textContent = puntaje;
  document.getElementById("mensaje").textContent = "¡Partida reiniciada! Presiona iniciar y comenzará ma magia";
  pintarComidaInicial();
  dibujarTodo();
}

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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

function verificarColisionBordes() {
  let cabeza = serpiente[0];
  let maxColumnas = canvas.width / TAMANIO_CELDA;
  let maxFilas = canvas.height / TAMANIO_CELDA;
  if (cabeza.x < 0 || cabeza.x >= maxColumnas  || cabeza.y < 0 || cabeza.y >= maxFilas ) {
    return true;
  }
  return false;
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

function cambiarDireccion(nuevaDireccion) {
  if (direccionActual === "derecha" && nuevaDireccion === "izquierda") return;
  if (direccionActual === "izquierda" && nuevaDireccion === "derecha") return;
  if (direccionActual === "arriba" && nuevaDireccion === "abajo") return;
  if (direccionActual === "abajo" && nuevaDireccion === "arriba") return;
  direccionActual = nuevaDireccion;
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
  if (verificarColisionBordes()) {
    pausarJuego();
    document.getElementById("mensaje").textContent = "¡GAME OVER! Te quitaste la cabeza contra la pared D:";
    return;
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