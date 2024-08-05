document.addEventListener("DOMContentLoaded", () => {
  const commandLine = document.getElementById("command-line");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  let turtle = {
    posX: 100,
    posY: 100,
    angle: 90,
    color: "blue",
  };

  let history = [];

  // Diccionario de comandos
  const commands = {
    drawRect: drawRect,
    clear: clearCanvas,
    drawtriangle: drawTriangle,
    advance: advance,
    drawline: drawLine,
    turtle: fturtle,
    turnleft: turnLeft,
    turnright: turnRight,
    changecolor: changeColor,
    triangulo: triangulo,
    repeat: repeat,
  };

  function extractOuterBracketContent(command) {
    const regex = /\[(.*)\]/;
    const match = command.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  }

  function repeat(args) {
    console.log("in repeat: args:" + args);

    const numRepetitions = Number(args[0]);
    const commandStr = args.slice(1).join(" ");

    const match = extractOuterBracketContent(commandStr);

    console.log("match" + match);

    if (match) {
      for (let i = 1; i <= numRepetitions; i++) {
        const commandsList = match.split(";");

        console.log("commandsList:" + commandsList);

        commandsList.forEach((cmdStr) => {
          const cmdArgs = cmdStr.trim().split(" ");
          const cmd = cmdArgs[0];
          if (commands[cmd]) {
            console.log(`Executing Command : ${cmd}  ${cmdArgs.slice(1)}`);

            commands[cmd](cmdArgs.slice(1));
          } else {
            console.log(`Command unknown: ${cmd}`);
          }
        });
      }
    } else {
      console.log("No brackets found");
    }
  }

  function drawHistory() {
    turtle = {
      posX: 100,
      posY: 100,
      angle: 90,
      color: "blue",
    };

    clearCanvas();
    history.forEach((cmd) => {
      console.log("in command:" + JSON.stringify(cmd));
      commands[cmd.command](cmd.args);
    });
    triangulo();
  }

  // Función para ejecutar comandos
  function executeCommand(command) {
    const args = command.split(" ");
    const cmd = args[0];
    if (commands[cmd]) {
      console.log(`Executing : ${cmd} ${args.slice(1)}  `);

      history.push({ command: cmd, args: args.slice(1) });

      drawHistory();
      /*
      triangulo(true);
      commands[cmd](args.slice(1));
      triangulo();
      */
    } else {
      console.log(`Command unkown: ${cmd}`);
    }
  }

  function changeColor(args) {
    const color = args[0];
    turtle.color = color;
  }

  function turnRight(args) {
    const angle = Number(args[0]);
    turtle.angle = turtle.angle - angle;
  }

  function turnLeft(args) {
    const angle = Number(args[0]);
    turtle.angle = turtle.angle + angle;
  }

  function fturtle(args) {
    console.log("turtle:" + JSON.stringify(turtle));
  }

  function toRadians(angle) {
    return angle * (Math.PI / 180);
  }

  // Función para rotar un punto alrededor del centro
  function drawTriangle() {
    const [x, y, base, height, angle] = [
      turtle.posX,
      turtle.posY,
      10,
      15,
      turtle.angle,
    ];

    // Convertir el ángulo a radianes
    let radians = angle * (Math.PI / 180);

    // Guardar el estado del contexto
    ctx.save();

    // Mover el contexto al punto x, y
    ctx.translate(x, y);

    // Rotar el contexto por el ángulo dado
    ctx.rotate(radians);

    // Dibujar el triángulo
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(base, 0);
    ctx.lineTo(base / 2, -height);
    ctx.closePath();

    // Aplicar estilo al triángulo
    ctx.strokeStyle = "black"; // Color del borde
    ctx.fillStyle = "blue"; // Color de relleno
    ctx.stroke();
    ctx.fill();

    // Restaurar el estado del contexto
    ctx.restore();
  }

  // Función para avanzar la tortuga y dibujar una línea
  function advance(args) {
    console.log("en advance..");

    const length = Number(args[0]);
    const angleInRadians = toRadians(turtle.angle);

    // Calcular la nueva posición
    const newX = turtle.posX + length * Math.cos(angleInRadians);
    const newY = turtle.posY - length * Math.sin(angleInRadians); // Usamos "-" ya que la coordenada Y en canvas decrece hacia arriba

    // Dibuja una línea desde la posición actual hasta la nueva posición
    drawLine([turtle.posX, turtle.posY, newX, newY, turtle.color]);

    // Actualizar la posición de la tortuga
    turtle.posX = newX;
    turtle.posY = newY;
  }

  function triangulo(limpia = false) {
    const length = 15; //Number(args[0]);
    let angleInRadians = toRadians(turtle.angle);

    // Calcular la nueva posición
    let topX = turtle.posX + length * Math.cos(angleInRadians);
    let topY = turtle.posY - length * Math.sin(angleInRadians); // Usamos "-" ya que la coordenada Y en canvas decrece hacia arriba

    // Dibuja una línea desde la posición actual hasta la nueva posición
    // drawLine([turtle.posX, turtle.posY, newX, newY, "red"]);

    angleInRadians = toRadians(turtle.angle - 90); // asume que queda en angulo recto
    const leftBaseX = turtle.posX + (length / 3) * Math.cos(angleInRadians);
    const leftBaseY = turtle.posY - (length / 3) * Math.sin(angleInRadians); // Usamos "-" ya que la coordenada Y en canvas decrece hacia arriba

    //drawLine([turtle.posX, turtle.posY, newX, newY, "red"]);

    angleInRadians = toRadians(turtle.angle + 90); // asume que queda en angulo recto
    const rightBaseX = turtle.posX + (length / 3) * Math.cos(angleInRadians);
    const rightBaseY = turtle.posY - (length / 3) * Math.sin(angleInRadians); // Usamos "-" ya que la coordenada Y en canvas decrece hacia arriba

    //drawLine([turtle.posX, turtle.posY, newX, newY, "red"]);

    // Dibujar el triángulo
    ctx.beginPath();
    ctx.moveTo(topX, topY);
    ctx.lineTo(leftBaseX, leftBaseY);
    ctx.lineTo(rightBaseX, rightBaseY);
    ctx.closePath();

    if (!limpia) {
      ctx.strokeStyle = "black"; // Color del borde
      ctx.fillStyle = "blue"; // Color de relleno
      ctx.stroke();
      ctx.fill();
    } else {
      ctx.strokeStyle = "white"; // Color del borde
      ctx.fillStyle = "white"; // Color de relleno
      ctx.stroke();
      ctx.fill();
    }
  }

  function drawLine(args) {
    const [x1, y1, x2, y2, color] = args.map(Number);

    console.log("x1:" + x1 + " y1:" + y1 + " x2:" + x2 + " y2:" + y2);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "black";

    ctx.stroke();
  }

  // Comando: Dibujar un rectángulo
  function drawRect(args) {
    const [x, y, width, height] = args.map(Number);
    ctx.fillStyle = "blue";
    console.log("   aqui " + x + "," + y + "," + width + "," + height);
    ctx.fillRect(x, y, width, height);
  }

  // Comando: Limpiar el canvas
  function clearCanvas() {
    console.log("clearCanvas");

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
