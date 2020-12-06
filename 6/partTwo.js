// --- Part Two ---
// You don't need to identify the questions to which anyone answered "yes"; you
// need to identify the questions to which everyone answered "yes"!

const fs = require('fs')

const answers = fs.readFileSync('input.txt').toString().split('\n\n').filter(entry => entry)

const generateAlphabetObject = () => {
  const obj = {}

  for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); ++i) {
      obj[String.fromCharCode(i)] = 0
  }

  return obj;
}

const countYeses = (obj, numberInGroup) => {
  let count = 0;
  for (letter in obj) {
    if (obj[letter] === numberInGroup) count++
  }

  return count
}

const yesCounts = answers.map(answer => {
  const alphabet = generateAlphabetObject()
  const groupAnswers = answer.split('\n').map(a => {
    return a.replace(/\W/g, '')
  }).filter(a => a)

  const numberInGroup = groupAnswers.length

  const string = groupAnswers.join('')
  
  for (let char of string) {
    alphabet[char]++
  }

  return countYeses(alphabet, numberInGroup)
})

const total = yesCounts.reduce((a, b) => a + b, 0)
console.log(total)