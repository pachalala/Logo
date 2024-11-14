---- crear medio ambiente basico
        linea de comando
        canvas
        que reconozca comandos (chat gpt kickstart)

-- tourtle 
        draw itself
        advance
        turn (degrees)
        change color
        save history (for repaiting)
        recognice lowercase
        repeat
        repeat recursive

-- instructions
      functions
      sentences
      recursives
      examples

drawRect: drawRect,
    clear: clearCanvas,
    drawtriangle: drawTriangle,
    advance: advance,
    drawline: drawLine,
    turtle: fturtle,
    left: turnLeft,
    right: turnRight,
    changecolor: changeColor,
    triangulo: triangulo,
    repeat : repeat ;


advance distance

Logo instrucciones
https://medium.com/@isetitra/logo-language-for-windows-mac-and-linux-ab184196bd20

repeat 3 [ repeat 6 [ advance 20 ;  turnright 20 ] ; advance 30 ] 
repeat 3 [ advance 40 ;  turnrigth 45 ]


repeat 36 [   advance 20 ; turnright 45 ; advance 10 ; turnright 90 ; advance 10 ; turnright 45 ; advance 20 ; turnright 100 ]


1. advance
Description: Moves the turtle forward by a specified distance in its current direction, drawing a line.
Usage: advance [distance]
Parameters:
distance: Distance to move forward in pixels.
Example: advance 50 - Moves the turtle forward 50 pixels, leaving a line behind.

3. turtle
Description: Outputs the current turtle position, angle, and color to the console.
Usage: turtle
Parameters: None.
Example: turtle - Prints the turtle's current state.

4. turnLeft
Description: Rotates the turtle counterclockwise by the specified angle.
Usage: turnLeft [angle]
Parameters:
angle: Angle in degrees to rotate.
Example: turnLeft 45 - Rotates the turtle 45° to the left.

5. turnRight
Description: Rotates the turtle clockwise by the specified angle.
Usage: turnRight [angle]
Parameters:
angle: Angle in degrees to rotate.
Example: turnRight 45 - Rotates the turtle 45° to the right.

6. changeColor
Description: Changes the turtle's drawing color.
Usage: changeColor [color]
Parameters:
color: New color for the turtle's path.
Example: changeColor "green" - Sets the drawing color to green.

7. repeat
Description: Repeats a series of commands a specified number of times.
Usage: repeat numRepetitions [ commandSequence ]
Parameters:
numRepetitions: Number of times to repeat the command sequence.
commandSequence: Commands to repeat, surrounded by brackets [].
Example: repeat 3 [advance 20 ; turnright 90] - Repeats the sequence "advance 20; turn right 90°" three times.











repeat 3 [ advance 40 ;  turnright 45 ]

repeat 3 [ repeat 6 [ advance 20 ;  turnright 20 ] ; advance 30 ] 