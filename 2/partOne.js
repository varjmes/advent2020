// --- Day 2: Password Philosophy ---
// Each line gives the password policy and then the password. The password
//  policy indicates the lowest and highest number of times a given letter must
// appear for the password to be valid. For example, 1-3 a means that the
// password must contain a at least 1 time and at most 3 times.

// How many passwords are valid according to their policies?

const fs = require('fs')

const entries = fs.readFileSync('input.txt').toString().split('\n').filter(entry => entry)

const validPasswords = entries.filter(entry => {
  const [frequency, lettering, password] = entry.split(' ');
  const [min, max] = frequency.split('-')
  const letter = lettering[0];
  const timesOccured = password.split(letter).length - 1;

  return timesOccured >= min && timesOccured <= max;
});

console.log(validPasswords.length);