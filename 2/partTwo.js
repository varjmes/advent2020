// --- Part Two ---
// Each policy actually describes two positions in the password, where 1 means
// the first character, 2 means the second character, and so on. (Be careful
// Toboggan Corporate Policies have no concept of "index zero"!) Exactly one of
// these positions must contain the given letter. Other occurrences of the
// letter are irrelevant for the purposes of policy enforcement.

// How many passwords are valid according to the new interpretation of the policies?

const fs = require('fs')

const entries = fs.readFileSync('input.txt').toString().split('\n').filter(entry => entry)

const validPasswords = entries.filter(entry => {
  const [frequency, lettering, password] = entry.split(' ')
  const [positionOne, positionTwo] = frequency.split('-')
  const letter = lettering[0]

  if ((password[positionOne - 1] === letter) && (password[positionTwo - 1] === letter)) {
    return false
  }

  if ((password[positionOne - 1] === letter) || (password[positionTwo - 1] === letter)) {
    return true
  }

  return false
})

console.log(validPasswords.length)