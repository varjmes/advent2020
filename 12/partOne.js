// --- Day 12: Rain Risk ---

// The navigation instructions (your puzzle input) consists of a sequence of single-character actions paired with integer input values.

// Action N means to move north by the given value.
// Action S means to move south by the given value.
// Action E means to move east by the given value.
// Action W means to move west by the given value.
// Action L means to turn left the given number of degrees.
// Action R means to turn right the given number of degrees.
// Action F means to move forward by the given value in the direction the ship is currently facing.

const parseInput = require('../helpers/parseInput')
const instructions = parseInput('input.txt', '\n')


// Rotational Matrices
// 0: (x, y)
// 90: [0, -1  (-y, x)
//      1, 0]
// 180: [-1, 0 (-x, -y)
//       0, -1]
// 270: [0, 1  (y, -x)
//      -1, 0]
const ship = { x: 0, y: 0}
let facing = { x: 1, y: 0}

const rotate = (vector, degrees) => {
  let newVector
  switch(degrees) {
    case 90:
      newVector = {
        x: -vector.y,
        y: vector.x
      }
      break
    case 180:
      newVector = {
        x: -vector.x,
        y: -vector.y
      }
      break
    case 270:
      newVector = {
        x: vector.y,
        y: -vector.x
      }
      break
    default:
      newVector = vector
      break
  }

  return newVector
}

for (let i = 0; i < instructions.length; i++) {
  const direction = instructions[i].slice(0, 1)
  const move = Number(instructions[i].slice(1))

  switch(direction) {
    case 'N':
      ship.y += move
      break
    case 'E':
      ship.x += move
      break
    case 'S':
      ship.y -= move
      break
    case 'W':
      ship.x -= move
      break
    case 'F':
      ship.x += (facing.x * move)
      ship.y += (facing.y * move)
      break
    case 'L':
      facing = rotate(facing, move)
      break
    case 'R':
      facing = rotate(facing, 360 - move)
      break
    default:
      break
  }
}

const manhattanDistance = Math.abs(ship.x) + Math.abs(ship.y)

console.log(manhattanDistance)