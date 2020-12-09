// --- Day 9: Encoding Error ---

// The data appears to be encrypted with the eXchange-Masking Addition System (XMAS) which, conveniently for you, is an old cypher with an important weakness.

// XMAS starts by transmitting a preamble of 25 numbers. After that, each number you receive should be the sum of any two of the 25 immediately previous numbers. The two numbers will have different values, and there might be more than one such pair.

// What is the first number that does not have this property?

const parseInput = require('../helpers/parseInput')
const numbers = parseInput('input.txt', '\n').map(Number)
const preambleLength = 25

for (let i = preambleLength; i < numbers.length; i++) {
  const sums = []
  const number = numbers[i]
  const preamble = numbers.slice(i - preambleLength, i)

  for (let j = 0; j < preamble.length; j++) {
    for (let k = j + 1; k < preamble.length; k++) {
      sums.push(preamble[j] + preamble[k])
    }
  }

  if (!sums.includes(number)) {
    console.log('invalid number', number)
    break
  }
}