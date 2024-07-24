document.addEventListener("DOMContentLoaded", () => {
  const commandLine = document.getElementById("command-line");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  let turtle = {
    posX: 100,
    posY: 100,
    angle: 90,
  };

  // Diccionario de comandos
  const commands = {
    drawRect: drawRect,
    clear: clearCanvas,
    drawTriangle: drawTriangle,
    advance: advance
  };

  // Función para ejecutar comandos
  function executeCommand(command) {
    const args = command.split(" ");
    const cmd = args[0];
    if (commands[cmd]) {
      commands[cmd](args.slice(1));
    } else {
      console.log(`Comando desconocido: ${cmd}`);
    }
  }
  function toRadians(angle) {
    return angle * (Math.PI / 180);
}



  function drawTriangle(args) {
    const [centerX, centerY, base, height, angleDegrees] = args.map(Number);

    // Convertir el ángulo a radianes
    const angle = angleDegrees * (Math.PI / 180);

    // Coordenadas del triángulo sin rotar
    const halfBase = base / 2;
    const topX = 0;
    const topY = -height / 2;
    const leftX = -halfBase;
    const leftY = height / 2;
    const rightX = halfBase;
    const rightY = height / 2;

    // Función para rotar un punto alrededor del centro
    function rotatePoint(x, y, angle) {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: cos * x - sin * y,
        y: sin * x + cos * y,
      };
    }

    // Rotar los puntos del triángulo
    const rotatedTop = rotatePoint(topX, topY, angle);
    const rotatedLeft = rotatePoint(leftX, leftY, angle);
    const rotatedRight = rotatePoint(rightX, rightY, angle);

    // Trasladar los puntos rotados al centro del triángulo
    const finalTopX = centerX + rotatedTop.x;
    const finalTopY = centerY + rotatedTop.y;
    const finalLeftX = centerX + rotatedLeft.x;
    const finalLeftY = centerY + rotatedLeft.y;
    const finalRightX = centerX + rotatedRight.x;
    const finalRightY = centerY + rotatedRight.y;

    // Dibuja el triángulo
    ctx.beginPath();
    ctx.moveTo(finalTopX, finalTopY);
    ctx.lineTo(finalLeftX, finalLeftY);
    ctx.lineTo(finalRightX, finalRightY);
    ctx.closePath();

    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  // Función para avanzar la tortuga y dibujar una línea
  function advance(args) {
    const length = Number(args[0]);
    const angleInRadians = toRadians(turtle.angle);

    // Calcular la nueva posición
    const newX = turtle.posX + length * Math.cos(angleInRadians);
    const newY = turtle.posY - length * Math.sin(angleInRadians); // Usamos "-" ya que la coordenada Y en canvas decrece hacia arriba

    // Dibuja una línea desde la posición actual hasta la nueva posición
    drawLine(turtle.posX, turtle.posY, newX, newY);

    // Actualizar la posición de la tortuga
    turtle.posX = newX;
    turtle.posY = newY;
  }

  function drawLine(x1, y1, x2, y2) { 
  
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}


  // Comando: Dibujar un rectángulo
  function drawRect(args) {
    const [x, y, width, height] = args.map(Number);
    ctx.fillStyle = "blue";
    console.log( "   aqui "+x+","+y+","+width+","+height);
    ctx.fillRect(x, y, width, height);
  }

  // Comando: Limpiar el canvas
  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Evento para la línea de comando
  commandLine.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      console.log("comando:" + commandLine.value);
      const command = commandLine.value;
      executeCommand(command);
      commandLine.value = "";
    }
  });
});
