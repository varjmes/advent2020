// --- Part Two ---

// Almost all of the actions indicate how to move a waypoint which is relative to the ship's position:

// Action N means to move the waypoint north by the given value.
// Action S means to move the waypoint south by the given value.
// Action E means to move the waypoint east by the given value.
// Action W means to move the waypoint west by the given value.
// Action L means to rotate the waypoint around the ship left (counter-clockwise) the given number of degrees.
// Action R means to rotate the waypoint around the ship right (clockwise) the given number of degrees.
// Action F means to move forward to the waypoint a number of times equal to the given value.

// The waypoint starts 10 units east and 1 unit north relative to the ship. The waypoint is relative to the ship; that is, if the ship moves, the waypoint moves with it.

// What is the Manhattan distance between that location and the ship's starting position?

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
let facing = { x: 10, y: 1}

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
      facing.y += move
      break
    case 'E':
      facing.x += move
      break
    case 'S':
      facing.y -= move
      break
    case 'W':
      facing.x -= move
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