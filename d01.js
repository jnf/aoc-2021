import { numberReader } from './shared.js'

const testInput = numberReader('./inputs/d01_test.txt')
const input = numberReader('./inputs/d01_input.txt')
const p1 = input => {
  let prev = input[0]
  return input.reduce((count, current) => {
    if (current > prev) count += 1
    prev = current
    return count
  }, 0)
}

const p2 = input => {
  const chunks = input.reduce((acc,n,i) => {
    if (!input[i+1] || !input[i+2]) return acc
    acc.push(n + input[i + 1] + input[i + 2])
    return acc
  }, [])

  return p1(chunks)
}

console.log(p2(testInput))
console.log(p2(input))
