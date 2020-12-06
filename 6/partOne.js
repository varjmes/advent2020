// --- Day 6: Custom Customs ---
// The form asks a series of 26 yes-or-no questions marked a through z. All you
// need to do is identify the questions for which anyone in your group answers
// "yes". Since your group is just you, this doesn't take very long.

// Each group's answers are separated by a blank line, and within each group, each
// person's answers are on a single line.

// For each group, count the number of questions to which anyone answered "yes".
// What is the sum of those counts?

const fs = require('fs')

const answers = fs.readFileSync('input.txt').toString().split('\n\n').filter(entry => entry)

const generateAlphabetObject = () => {
  const obj = {}

  for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); ++i) {
      obj[String.fromCharCode(i)] = 0
  }

  return obj;
}

const countYeses = obj => {
  let count = 0;
  for (letter in obj) {
    count += obj[letter]
  }

  return count
}

const yesCounts = answers.map(answer => {
  const alphabet = generateAlphabetObject()
  const yeses = answer.replace(/\W/g, '').replace(/\n/g, '').split('')
  
  for (let yes of yeses) {
    alphabet[yes] = 1
  }

  return countYeses(alphabet)
})

const total = yesCounts.reduce((a, b) => a + b, 0)
console.log(total)