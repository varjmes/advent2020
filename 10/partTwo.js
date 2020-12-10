// --- Part Two ---

// To completely determine whether you have enough adapters, you'll need to figure out how many different ways they can be arranged. Every arrangement needs to connect the charging outlet to your device. The previous rules about when adapters can successfully connect still apply.

// What is the total number of distinct ways you can arrange the adapters to connect the charging outlet to your device?

const parseInput = require('../helpers/parseInput')
const adapters = parseInput('input.txt', '\n').map(Number)
adapters.sort((a, b) => a - b)

const deviceAdapter = adapters[adapters.length - 1] + 3
const allAdapters = [0, ...adapters, deviceAdapter]
const tribonacci = [0, 1, 1, 2, 4, 7, 13, 24];

let sequenceLength = 1;
let arrangements = 1;
for (let i = 1; i < allAdapters.length; i++) {
  if (allAdapters[i] === allAdapters[i - 1] + 1) {
    sequenceLength++;
  } else {
    arrangements *= tribonacci[sequenceLength];
    sequenceLength = 1;
  }
}

console.log(arrangements);