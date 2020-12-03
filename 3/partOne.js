// --- Day 3: Toboggan Trajectory ---
// You'll need to see which angles will take you near the fewest trees.
// These aren't the only trees, though; due to something you read about once
// involving arboreal genetics and biome stability, the same pattern repeats to
// the right many times

// Starting at the top-left corner of your map and following a slope of right 3
// and down 1, how many trees would you encounter?

const fs = require('fs')

const lines = fs.readFileSync('input.txt').toString().split('\n').filter(line => line)
const height = lines.length;
const width = lines[0].length;
let treeCount = 0;
let x = 0;

const isTree = place => {
  return place === '#'
}

for (let i = 1; i < height; i++) {
    x += 3

    if (!lines[i][x]) {
      isTree(lines[i][x % width]) ? treeCount += 1 : false
    } else {
      isTree(lines[i][x]) ? treeCount += 1 : false
    }
}

console.log(treeCount) 