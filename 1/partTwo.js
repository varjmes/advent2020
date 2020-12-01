// --- Part Two ---
// Find the three entries that sum to 2020 and then multiply those two numbers
// together.

const fs = require('fs')

const entries = fs.readFileSync('input.txt').toString().split('\n').map(Number);

for (let i = 0; i <= entries.length - 1; i++) {
  for (let j = 0; j <= entries.length - 1; j++) {
    for (let k = 0; k <= entries.length - 1; k++) {
      if (entries[i] + entries[j] + entries[k] === 2020) {
        console.log(entries[i] * entries[j] * entries[k]);
        return entries[i] * entries[j] * entries[k];
      }
    }
  }
}