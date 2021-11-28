import { numberReader, stringReader } from './shared.js'

const p1 = path => {
  const mods = {
    up: (co, amt)      => ({ ...co, depth: co.depth - amt }),
    down: (co, amt)    => ({ ...co, depth: co.depth + amt }),
    forward: (co, amt) => ({ ...co, pos: co.pos + amt }),
  }
  const commands = stringReader(path)
  const coords = commands.reduce((co, command) => {
    const [direction, amount] = command.split(/\s+/)
    return mods[direction](co, Number(amount))
  }, { depth: 0, pos: 0 })

  coords.product = coords.depth * coords.pos
  return coords
}

const p2 = path => {
  const mods = {
    up: (co, amt)      => ({ ...co, aim: co.aim - amt }),
    down: (co, amt)    => ({ ...co, aim: co.aim + amt }),
    forward: (co, amt) => ({
      ...co,
      pos: co.pos + amt,
      depth: co.depth + (co.aim * amt),
    }),
  }
  const commands = stringReader(path)
  const coords = commands.reduce((co, command) => {
    const [direction, amount] = command.split(/\s+/)
    return mods[direction](co, Number(amount))
  }, { depth: 0, pos: 0, aim: 0 })

  coords.product = coords.depth * coords.pos
  return coords
}

console.log(p1('./inputs/d02_test.txt'))
console.log(p1('./inputs/d02_input.txt'))
console.log(p2('./inputs/d02_test.txt'))
console.log(p2('./inputs/d02_input.txt'))
