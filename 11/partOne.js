// --- Day 11: Seating System ---

// Picking the best seat
// All decisions are based on the number of occupied seats adjacent to a given
// seat (one of the eight positions immediately up, down, left, right, or
// diagonal from the seat).

// If a seat is empty (L) and there are no occupied seats adjacent to it, the
// seat becomes occupied.
// If a seat is occupied (#) and four or more seats adjacent to it are also
// occupied, the seat becomes empty.
// Otherwise, the seat's state does not change.

// Floor (.) never changes; seats don't move, and nobody sits on the floor.

// Keep going until no seat changes state.
// How many seats end up occupied?

const parseInput = require('../helpers/parseInput')
const seatRows = parseInput('input.txt', '\n')
const seats = seatRows.map(row => row.split(''))

const getLeftSeat = (seats, i, j) => {
  if (j - 1 < 0) return false
  return seats[i][j - 1]
}

const getRightSeat = (seats, i, j) => {
  if (j + 1 > seats[i].length - 1) return false
  return seats[i][j + 1]
}

const getDownSeat = (seats, i, j) => {
  if (i + 1 > seats.length - 1) return false
  return seats[i + 1][j]
}

const getUpSeat = (seats, i, j) => {
  if (i - 1 < 0) return false
  return seats[i - 1][j]
}

const getLeftUpDiagonalSeat = (seats, i, j) => {
  if (i - 1 < 0 || j - 1 < 0) return false
  return seats[i - 1][j - 1]
}

const getRightUpDiagonalSeat = (seats, i, j) => {
  if (i - 1 < 0 || j + 1 > seats[i].length - 1) return false
  return seats[i - 1][j + 1]
}

const getLeftDownDiagonalSeat = (seats, i, j) => {
  if (i + 1 > seats.length - 1|| j - 1 < 0) return false
  return seats[i + 1][j - 1]
}

const getRightDownDiagonalSeat = (seats, i, j) => {
  if (i + 1 > seats.length - 1|| j + 1 > seats[i].length - 1) return false
  return seats[i + 1][j + 1]
}

const countOccupiedSeats = seats => {
  return seats.reduce((a, v) => (v === '#' ? a + 1 : a), 0);
}

const calculateRound = seats => {
  const round = []
  for (let i = 0; i < seats.length; i++) {
    round[i] = []
    for (let j = 0; j < seats[i].length; j++) {
      const seat = seats[i][j]
      round[i][j] = seat
  
      if (seat === '.') continue
  
      const left = getLeftSeat(seats, i, j)
      const right = getRightSeat(seats, i, j)
      const down = getDownSeat(seats, i, j)
      const up = getUpSeat(seats, i, j)
      const leftUpDiagonal = getLeftUpDiagonalSeat(seats, i, j)
      const rightUpDiagonal = getRightUpDiagonalSeat(seats, i, j)
      const leftDownDiagonal = getLeftDownDiagonalSeat(seats, i, j)
      const rightDownDiagonal = getRightDownDiagonalSeat(seats, i, j)
      const adjacents = [left, right, down, up, leftUpDiagonal, rightUpDiagonal, leftDownDiagonal, rightDownDiagonal].filter(seat => seat === 'L' || seat === '#')
  
      if (seat === 'L') {
        if (adjacents.every(seat => seat === 'L')) {
          round[i][j] = '#'
        }
      } else if (seat === '#') {
        const occupiedSeatsCount = countOccupiedSeats(adjacents)
        if (occupiedSeatsCount > 3) round[i][j] = 'L'
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