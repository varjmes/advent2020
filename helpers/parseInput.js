const fs = require('fs')
const parseInput = (name, split) => {
  return fs.readFileSync(name).toString().split(split).filter(entry => entry)
}

module.exports = parseInput