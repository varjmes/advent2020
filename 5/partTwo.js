// --- Part Two ---
// It's a completely full flight, so your seat should be the only missing
// boarding pass in your list. However, there's a catch: some of the seats at
// the very front and back of the plane don't exist on this aircraft, so they'll
// be missing from your list as well.

// Your seat wasn't at the very front or back, though; the seats with IDs +1 and
// -1 from yours will be in your list.
// What is the ID of your seat?

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

const sorted = seatIds.sort((a, b) => {
  return a - b
})

for (let i = 0; i < sorted.length - 1; i++) {
  if ((sorted[i] + 1) !== sorted[i + 1]) {
    console.log(sorted[i] + 1, 'your seat')
    break
  }
}