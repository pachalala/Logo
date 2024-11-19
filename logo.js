document.addEventListener("DOMContentLoaded", () => {
  const commandLine = document.getElementById("command-line");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  let turtle = {
    posX: 200,
    posY: 600,
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


  function splitIgnoringBrackets(input, delimiter) {
    let result = [];
    let current = '';
    let inBrackets = false;

    for (let i = 0; i < input.length; i++) {
        const char = input[i];

        if (char === '[') {
            inBrackets = true;
        } else if (char === ']') {
            inBrackets = false;
        }

        if (char === delimiter && !inBrackets) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }

    // Add the last part
    if (current) {
        result.push(current.trim());
    }

    return result;
}


  function repeat(args) {
    console.log("in repeat: args:" + args);

    const numRepetitions = Number(args[0]);
    const commandStr = args.slice(1).join(" ");

    const match = extractOuterBracketContent(commandStr);

    console.log("match" + match);
//repeat 3 [ repeat 6 [ advance 20 ;  turnright 20 ] ; advance 50; turnleft 45 ] 
    if (match) {
      for (let i = 1; i <= numRepetitions; i++) {
        const commandsList = splitIgnoringBrackets(match,';') ;// match.split(";");

        console.log("commandsList:" + commandsList);

        commandsList.forEach((cmdStr) => {
          const cmdArgs = cmdStr.trim().split(" ");
          const cmd = cmdArgs[0];
          if (commands[cmd]) {
            console.log(`Executing Command (brackets) : ${cmd}  ${cmdArgs.slice(1)}`);

            commands[cmd](cmdArgs.slice(1));
          } else {
            console.log(`Command unknown: ${cmd}`);
          }
          setTimeout(1000);
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

    console.log("historial:" + JSON.stringify(history));
    clearCanvas();
    history.forEach((cmd) => {
      console.log("in command:" + JSON.stringify(cmd));
      commands[cmd.command](cmd.args);
    });
    triangulo();
  }
 
/*
  // Función para ejecutar comandos
  function executeCommand(command) {
    // Función para verificar si un comando está contenido entre corchetes
    function isInsideBrackets(cmd) {
      return /\[.*\]/.test(cmd);
    }
  
    // Divide el comando en subcomandos usando ';' como separador
    let subcommands = splitIgnoringBrackets(command, ';');
  
    // Itera sobre cada subcomando
    subcommands.forEach(subcommand => {
      if (subcommand) {
        // Verifica si el subcomando está dentro de corchetes
        if (isInsideBrackets(subcommand)) {
          console.log(`Executing command inside brackets: ${subcommand}`);
          const cmdArgs = subcommand.trim().split(" ");
          const cmd = cmdArgs[0];
  
          if (commands[cmd]) {
            console.log(`Executing : ${cmd} ${cmdArgs.slice(1).join(" ")}`);
            history.push({ command: cmd, args: cmdArgs.slice(1) });
            drawHistory();
          } else {
            console.log(`Unknown command: ${cmd}`);
          }
        } else {
          // Procesa subcomandos fuera de los corchetes
          const cmds = subcommand.split(";");
          cmds.forEach(cmd => {
            const args = cmd.trim().split(" ");
            const commandName = args[0];
  
            if (commands[commandName]) {
              console.log(`Executing : ${commandName} ${args.slice(1).join(" ")}`);
              history.push({ command: commandName, args: args.slice(1) });
              drawHistory();
            } else {
              console.log(`Unknown command: ${commandName}`);
            }
          });
        }
      }
    });
  }
 


  function executeCommand(command) {
    const args = command.trim().split(" ");
    const cmd = args[0];
    if (commands[cmd]) {
      console.log(`Executing : ${cmd} ${args.slice(1)} }` );
      console.log(`Executing JSON: ${cmd} ${ JSON.stringify(   args.slice(1)) } }` );

      history.push({ command: cmd, args: args.slice(1) });

      drawHistory();
    } else {
      console.log(`Command unkown: ${cmd}`);
    }
  }


  */ 
   
  function executeCommand(input) {
    let regex = /repeat\s+\d+\s+\[.*?\]|[a-z]+\s+\d+/gi; // Reconoce patrones de 'repeat X [ ... ]' y 'comando número'
    let matches = [];
    let match;
    
    // Usamos un bucle para buscar todas las coincidencias
    while ((match = regex.exec(input)) !== null) {
        matches.push(match[0].trim());

        const args = match[0].trim().split(" ");
        const cmd = args[0];
        if (commands[cmd]) {
          console.log(`Executing : ${cmd} ${args.slice(1)} }` );
          history.push({ command: cmd, args: args.slice(1) });
    
        } 
        

    }
    drawHistory();
    console.log(matches);
    
    return matches;
}


  function executeCommand__(input) {
    let comandos = [];
    let currentIndex = 0;
  
    while (currentIndex < input.length) {
      // Si encuentra "repeat" y lo que sigue es un bloque con corchetes
      if (input.slice(currentIndex).startsWith('repeat')) {
        let startRepeat = currentIndex;
        currentIndex += 'repeat'.length; // Mueve el índice después de 'repeat'
        
        // Encuentra el primer corchete de apertura '['
        while (input[currentIndex] !== '[' && currentIndex < input.length) {
          currentIndex++;
        }
  
        // Maneja la captura de bloques anidados
        let bracketCount = 1;
        currentIndex++; // Avanza al primer carácter después de '['
  
        while (bracketCount > 0 && currentIndex < input.length) {

          console.log ("buscando dentro de []"+input[currentIndex]);
          if (input[currentIndex] === '[') {
            bracketCount++;
          } else if (input[currentIndex] === ']') {
            bracketCount--;
          }
          currentIndex++;
        }
  
        // Captura todo el bloque de 'repeat'
        comandos.push(input.slice(startRepeat, currentIndex).trim());
      } else {
        // Encuentra el próximo ';' o el final de la cadena
        let nextSemicolon = input.indexOf(';', currentIndex);
        if (nextSemicolon === -1) nextSemicolon = input.length;
        
        // Agrega la instrucción si no es una cadena vacía
        let command = input.slice(currentIndex, nextSemicolon).trim();
        if (command) comandos.push(command);
  
        // Avanza el índice al siguiente carácter después de ';'
        currentIndex = nextSemicolon + 1;
      }
    }
    console.log(comandos);
    
    return comandos;
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
    ctx.strokeStyle = color;

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
