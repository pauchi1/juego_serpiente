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
    }
    
function dibujarTablero() {
    let canvas = document.getElementById("canvasJuego"); 
    let ctx = canvas.getContext("2d");
    let TAMANIO_CELDA = 30; 
    let anchoCanvas = canvas.width;
    let altoCanvas = canvas.height;
    ctx.clearRect(0, 0, anchoCanvas, altoCanvas);
    ctx.strokeStyle = "white"; 
    ctx.beginPath();
    for (let i = 0; i <= anchoCanvas; i += TAMANIO_CELDA) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, altoCanvas);
    }
    for (let x = 0; x <= altoCanvas; x += TAMANIO_CELDA) {
        ctx.moveTo(0, x);
        ctx.lineTo(anchoCanvas, x);
    }
    ctx.stroke(); 
}



