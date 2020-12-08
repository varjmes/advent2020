// --- Part Two ---

// After some careful analysis, you believe that exactly one instruction is corrupted.

// Somewhere in the program, either a jmp is supposed to be a nop, or a nop is
// supposed to be a jmp. (No acc instructions were harmed in the corruption of this
// boot code.)

// The program is supposed to terminate by attempting to execute an instruction
// immediately after the last instruction in the file.

// Fix the program so that it terminates normally by changing exactly one jmp
// (to nop) or nop (to jmp). What is the value of the accumulator after the program
// terminates?

const parseInput = require('../helpers/parseInput')
const instructions = parseInput('input.txt', '\n')

const runProgram = instructions => {
  let accumulator = 0
  let instructionsRun = []

  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i]
    
    if (i === instructions.length - 1) {
      console.log(`found the correct program! accumulator is ${accumulator}`)
      break
    }
    
    if (instructionsRun.includes(i) || instruction === 'jmp +0') {
      break
    }
    
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
}

for (let i = 0; i < instructions.length; i++) {
  const currentInstruction = instructions[i]
  const [operation, number] = currentInstruction.split(' ')
  let inst = [...instructions]

  switch (operation) {
    case 'nop':
      inst[i] = `jmp ${number}`
      runProgram(inst)
    case 'jmp':
      inst[i] = `nop ${number}`
      runProgram(inst)
    default:
      break
  }
}