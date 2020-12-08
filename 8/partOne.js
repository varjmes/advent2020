// --- Day 8: Handheld Halting ---

// You narrow the problem down to a strange infinite loop in the boot code
// (your puzzle input) of the device. You should be able to fix it, but first you
// need to be able to run the code in isolation.

// The boot code is represented as a text file with one instruction per line of
// text. Each instruction consists of an operation (acc, jmp, or nop) and an argument
// (a signed number like +4 or -20).

// acc: inc or dec accumulator, move to next line
// jmp: jump to new instruction relative to itself, +2 = skip one, +1 go to next. -20
// nop: noop, does nothing, execute next instruction

// Input is an infinite loop, the moment the program tries to run any instruction
// a second time, you know it will never terminate.

// Run your copy of the boot code. Immediately before any instruction is executed
// a second time, what value is in the accumulator?

const parseInput = require('../helpers/parseInput')
const instructions = parseInput('input.txt', '\n')
const instructionsRun = []

let accumulator = 0

for (let i = 0; i < instructions.length; i++) {
  const instruction = instructions[i]
  if (instructionsRun.includes(i)) break

  const [operation, number] = instruction.split(' ')
  switch (operation) {
    case 'nop':
      break
    case 'acc':
      accumulator += Number(number)
      break
    case 'jmp':
      i += Number(number) - 1
      break
    default:
      break
  }

  instructionsRun.push(i)
}

console.log(accumulator, 'accumulator')