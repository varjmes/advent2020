// --- Day 1: Report Repair ---
// Find the two entries that sum to 2020 and then multiply those two numbers
// together.

const fs = require('fs')

const entries = fs.readFileSync('input.txt').toString().split('\n').map(Number);

for (let i = 0; i <= entries.length - 1; i++) {
  for (let j = 0; j <= entries.length - 1; j++) {
      if (entries[i] + entries[j] === 2020) {
        return entries[i] * entries[j];
      }
  }
}