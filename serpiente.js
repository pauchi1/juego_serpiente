const TAMANIO_CELDA = 25;

    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

    // Primera pintura del juego al cargar la página
    dibujarTodo();

    // =========================
    // FUNCIONES DE DIBUJO
    // =========================

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function dibujarTodo() {
      limpiarCanvas();
      dibujarTablero();
      pintarParte(5,5);
      pintarParte(10,2);
      pintarParte(12,(canvas.height/TAMANIO_CELDA - 1));
      pintarParte((canvas.width/TAMANIO_CELDA - 1),12)
      pintarParte(0,15);
      pintarParte((canvas.width/TAMANIO_CELDA - 1), (canvas.height/TAMANIO_CELDA - 1))
    }
    
function dibujarTablero() {
    let anchoCanvas = canvas.width;
    let altoCanvas = canvas.height;
    ctx.clearRect(0, 0, anchoCanvas, altoCanvas);
    ctx.strokeStyle = "white"; 
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
  ctx.fillStyle = "orange"; 
  ctx.fillRect(posX, posY, TAMANIO_CELDA, TAMANIO_CELDA);
  ctx.strokeStyle = "black"; 
  ctx.strokeRect(posX, posY, TAMANIO_CELDA, TAMANIO_CELDA);
}

