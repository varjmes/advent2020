// --- Day 7: Handy Haversacks ---

// Due to recent aviation regulations, many rules (your puzzle input) are being
// enforced about bags and their contents; bags must be color-coded and must contain
// specific quantities of other color-coded bags. Apparently, nobody responsible for
// these regulations considered how long they would take to enforce!

// You have a shiny gold bag. If you wanted to carry it in at least one other bag,
// how many different bag colors would be valid for the outermost bag? (In other
//   words: how many colors can, eventually, contain at least one shiny gold bag?)

// How many bag colors can eventually contain at least one shiny gold bag?

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

const countBags = (count = 0, entries) => {
  if (!entries) {
    return count
  }

  if (entries.hasOwnProperty('shiny gold')) {
    count += 1
    return count
  } else {
    const arr = Object.keys(entries).map(entry => {
      return countBags(count, rulesObj[entry])
    })
    
    if (arr.indexOf(1) !== -1) {
      count += 1
      return count
    }

    return count
  }
}

let total = 0;
for (let rule in rulesObj) {
  total += countBags(undefined, rulesObj[rule])
}

console.log(total)

