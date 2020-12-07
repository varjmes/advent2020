// --- Part Two ---

// How many individual bags are required inside your single shiny gold bag?

const parseInput = require('../helpers/parseInput')

const rules = parseInput('input.txt', '\n')
const rulesObj = {}

for (let rule of rules) {
  const [mainBag, contains] = rule.split(' bags contain ')
  const innerBags = contains.replace(/\./g, '').split(', ')

  for (let bag of innerBags) {
    if (bag !== 'no other bags') {
      const [,number, bagName] = bag.match(/(\d+) (\w+\s\w+)/)
      if (!rulesObj[mainBag]) rulesObj[mainBag] = {}
      rulesObj[mainBag][bagName] = number
    } else {
      rulesObj[mainBag] = 0
    }
  }
}

const countBags = entries => {
  let count = 1
  if (!entries) {
    return count
  } else {
    for (let bag in entries) {
      let entryCount = parseInt(entries[bag])
      count += entryCount * countBags(rulesObj[bag]);
    }

    return count;
  }
}

console.log(countBags(rulesObj['shiny gold']) - 1)