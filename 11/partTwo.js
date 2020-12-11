// --- Part Two ---

// Instead of considering just the eight immediately adjacent seats, consider
// the first seat in each of those eight directions
// How many seats end up occupied?

const parseInput = require('../helpers/parseInput')
const seatRows = parseInput('input.txt', '\n')
const seats = seatRows.map(row => row.split(''))

const getFirstLeftSeat = (seats, i, j) => {
  let seat
  for (let x = j; x >= 0; x--) {
    if (x - 1 < 0) return false
    if (seats[i][x - 1] !== '.') {
      seat = seats[i][x - 1]
      break
    }
  }

  return seat
}

const getFirstRightSeat = (seats, i, j) => {
  let seat
  for (let x = j; x <= seats[i].length - 1; x++) {
    if (x + 1 > seats[i].length - 1) return
    if (seats[i][x + 1] !== '.') {
      seat = seats[i][x + 1]
      break
    }
  }

  return seat
}

const getFirstDownSeat = (seats, i, j) => {
  let seat
  for (let x = i; x <= seats.length - 1; x++) {
    if (x + 1 > seats.length - 1) return
    if (seats[x + 1][j] !== '.') {
      seat = seats[x + 1][j]
      break
    }
  }

  return seat
}

const getFirstUpSeat = (seats, i, j) => {
  let seat
  for (let x = i; x >= 0; x--) {
    if (x - 1 < 0) return
    if (seats[x - 1][j] !== '.') {
      seat = seats[x - 1][j]
      break
    }
  }

  return seat
}

const getFirstLeftUpDiagonalSeat = (seats, i, j) => {
  let seat
  for (let x = i; x >= 0; x--) {
    if (x - 1 < 0 || j - 1 < 0) return
    if (seats[x - 1][j - 1] !== '.') {
      seat = seats[x - 1][j - 1]
      break
    }

    j -= 1
  }

  return seat
}

const getFirstRightUpDiagonalSeat = (seats, i, j) => {
  let seat
  for (let x = i; x >= 0; x--) {
    if (x - 1 < 0 || j + 1 > seats[x].length - 1) return
    if (seats[x - 1][j + 1] !== '.') {
      seat = seats[x - 1][j + 1]
      break
    }

    j += 1
  }

  return seat
}

const getFirstLeftDownDiagonalSeat = (seats, i, j) => {
  let seat
  for (let x = i; x <= seats.length - 1; x++) {
    if (x + 1 > seats.length - 1 || j - 1 < 0) return
    if (seats[x + 1][j - 1] !== '.') {
      seat = seats[x + 1][j - 1]
      break
    }

    j -= 1
  }

  return seat
}

const getFirstRightDownDiagonalSeat = (seats, i, j) => {
  let seat
  for (let x = i; x <= seats.length - 1; x++) {
    if (x + 1 > seats.length - 1|| j + 1 > seats[x].length - 1) return
    if (seats[x + 1][j + 1] !== '.') {
      seat = seats[x + 1][j + 1]
      break
    }

    j += 1
  }

  return seat
}

const countOccupiedSeats = seats => {
  return seats.reduce((a, v) => (v === '#' ? a + 1 : a), 0);
}

const getFirstSeats = (seats, i, j) => {
  const leftSeat = getFirstLeftSeat(seats, i, j)
  const rightSeat = getFirstRightSeat(seats, i, j)
  const downSeat = getFirstDownSeat(seats, i, j)
  const upSeat = getFirstUpSeat(seats, i, j)
  const leftUpSeat = getFirstLeftUpDiagonalSeat(seats, i, j)
  const rightUpSeat = getFirstRightUpDiagonalSeat(seats, i, j)
  const leftDownSeat = getFirstLeftDownDiagonalSeat(seats, i, j)
  const rightDownSeat = getFirstRightDownDiagonalSeat(seats, i, j)
  const firsts = [
    leftSeat,
    rightSeat,
    downSeat,
    upSeat,
    leftUpSeat,
    rightUpSeat,
    leftDownSeat,
    rightDownSeat
  ].filter(seat => seat === 'L' || seat === '#')

  return firsts
}

const calculateRound = seats => {
  const round = []
  for (let i = 0; i < seats.length; i++) {
    round[i] = []
    for (let j = 0; j < seats[i].length; j++) {
      const seat = seats[i][j]
      round[i][j] = seat
  
      if (seat === '.') continue
  
      const firsts = getFirstSeats(seats, i, j)
  
      if (seat === 'L') {
        if (firsts.every(seat => seat === 'L')) {
          round[i][j] = '#'
        }
      } else if (seat === '#') {
        const occupiedFirstsCount = countOccupiedSeats(firsts)
        if (occupiedFirstsCount > 4) round[i][j] = 'L'
      }
    }
  }

  return round
}

let stable = false
let current = seats
while (!stable) {
  let next = calculateRound(current)
  let currentString = current.join('').replace(/,/g, '')
  let nextString = next.join('').replace(/,/g, '')

  if (currentString === nextString) {
    stable = true
  } else {
    current = next
  }
}

console.log(countOccupiedSeats([].concat.apply([], current)))
console.log('forgive me for my sins')