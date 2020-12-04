// --- Day 4: Passport Processing ---
// Passport data is validated in batch files (your puzzle input). Each passport
// is represented as a sequence of key:value pairs separated by spaces or
// newlines. Passports are separated by blank lines.
// A passport is valid if it contains all eight required fields.
// A passport is valid if the only missing field is 'cid'

// How many passports are valid?

const fs = require('fs')

const entries = fs.readFileSync('input.txt').toString().split('\n\n').filter(entry => entry).map(entry => entry.replace('\n', ' '))

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid']

const validPassports = entries.filter(entry => {
  let isValid = true

  for (let i = 0; i < requiredFields.length; i++) {
    if (!entry.includes(requiredFields[i]) && requiredFields[i] !== 'cid') {
      isValid = false
      break
    }
  }

  return isValid
})

console.log(validPassports.length)