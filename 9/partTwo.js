// --- Part Two ---

// You must find a contiguous set of at least two numbers in your list which sum to the invalid number from step 1.

// To find the encryption weakness, add together the smallest and largest number in this contiguous range; in this example, these are 15 and 47, producing 62

const parseInput = require('../helpers/parseInput')
const input = parseInput('input.txt', '\n').map(Number)

const number = 393911906

let values = []
let found = false

for (let i = 0; i < input.length; i++) {
  if (found) break
  if (input[i] > number) break

  values = []
  let total = input[i]
  values.push(input[i])

  for (let j = i + 1; j < input.length; j++) {
    if (total === number) {
      found = true
      break
    }

    if (total > number) {
      break
    }

    total += input[j]
    values.push(input[j])
  }
}

console.log(values[0] + values[values.length - 1])