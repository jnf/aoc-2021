import fs from 'fs'
import readline from 'readline'

const stringReader = path =>
  fs.readFileSync(path, 'utf8').trim().split("\n")

const numberReader = path =>
  stringReader(path).map(Number)

export {
  stringReader,
  numberReader,
}
