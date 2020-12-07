// --- Day 5: Binary Boarding ---
// Scan all the nearby boarding passes to find your seat
// Boarding passes on this flight uses "binary space partitioning"
// A seat might be specified like FBFBBFFRLR, where F means "front", B means
// "back", L means "left", and R means "right".

// The first 7 characters will either be F or B; these specify exactly one of
// the 128 rows on the plane (numbered 0 through 127). Each letter tells you
// which half of a region the given seat is in. Start with the whole list of
// rows; the first letter indicates whether the seat is in the front
// (0 through 63) or the back (64 through 127). The next letter indicates which
// half of that region the seat is in, and so on until you're left with exactly
// one row.

// The last three characters will be either L or R; these specify exactly one of
// the 8 columns of seats on the plane (numbered 0 through 7). The same process as
// above proceeds again, this time with only three steps. L means to keep the lower
// half, while R means to keep the upper half.

// Every seat also has a unique seat ID: multiply the row by 8, then add the column.
// In this example, the seat has ID 44 * 8 + 5 = 357.

// What is the highest seat ID on a boarding pass?

const parseInput = require('../helpers/parseInput')
const boardingPasses = parseInput('input.txt', '\n')

const getPosition = (identifiers, start, end) => {
  let lower = start
  let upper = end

  identifiers.forEach(identifier => {
    const mid = (upper - lower + 1) / 2;
    if (identifier === 'F' || identifier === 'L') {
      upper -= mid
    } else {
      lower += mid
    }
  })

  return upper
}

const seatIds = boardingPasses.map(pass => {
  const identifiers = pass.split('')
  const rowIdentifiers = identifiers.slice(0, 7)
  const columnIdentifiers = identifiers.slice(7)

  const row = getPosition(rowIdentifiers, 0, 127)
  const column = getPosition(columnIdentifiers, 0, 7)
  return row * 8 + column
})

console.log(Math.max(...seatIds), 'max')