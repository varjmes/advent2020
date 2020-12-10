// --- Day 10: Adapter Array ---

// The charging outlet near your seat produces the wrong number of jolts. Always prepared, you make a list of all of the joltage adapters in your bag.

// Each of your joltage adapters is rated for a specific output joltage (your puzzle input). Any given adapter can take an input 1, 2, or 3 jolts lower than its rating and still produce its rated output joltage.

// In addition, your device has a built-in joltage adapter rated for 3 jolts higher than the highest-rated adapter in your bag. (If your adapter list were 3, 9, and 6, your device's built-in adapter would be rated for 12 jolts.)

// Treat the charging outlet near your seat as having an effective joltage rating of 0.

// If you use every adapter in your bag at once, what is the distribution of joltage differences between the charging outlet, the adapters, and your device?

// Find a chain that uses all of your adapters to connect the charging outlet to your device's built-in adapter and count the joltage differences between the charging outlet, the adapters, and your device.

// What is the number of 1-jolt differences multiplied by the number of 3-jolt differences?

const parseInput = require('../helpers/parseInput')
const adapters = parseInput('input.txt', '\n').map(Number)
adapters.sort((a, b) => a - b)

const deviceAdapter = adapters[adapters.length - 1] + 3
const allAdapters = [0, ...adapters, deviceAdapter]
const differences = []

for (let i = 0; i < allAdapters.length - 1; i++) {
  differences.push(allAdapters[i + 1] - allAdapters[i])
}

const oneJolts = differences.filter(x => x === 1).length;
const threeJolts = differences.filter(x => x === 3).length
console.log(oneJolts * threeJolts)