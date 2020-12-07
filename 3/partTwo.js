// --- Part Two ---
// Determine the number of trees you would encounter if, for each of the following slopes, you start at the top-left corner and traverse the map all the way to the bottom:

const parseInput = require('../helpers/parseInput')

const lines = parseInput('input.txt', '\n')
const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]
const height = lines.length
const width = lines[0].length

const isTree = place => {
  return place === '#'
}

const countTrees = slope => {
  const [right, down] = slope;
  let treeCount = 0
  let x = 0;

  for (let i = down; i < height; i += down) {
    x += right

    if (!lines[i][x]) {
      isTree(lines[i][x % width]) ? treeCount += 1 : false
    } else {
      isTree(lines[i][x]) ? treeCount += 1 : false
    }
  }

  return treeCount
}

const treeCounts = slopes.map(slope => countTrees(slope))
const totalTrees = treeCounts.reduce((a, b) => a * b)

console.log(totalTrees)