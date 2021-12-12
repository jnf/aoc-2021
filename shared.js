import fs from 'fs'
import readline from 'readline'

const stringReader = (path, splitPattern='\n') =>
  fs.readFileSync(path, 'utf8').trim().split(splitPattern)

const numberReader = path =>
  stringReader(path).map(Number)

export {
  stringReader,
  numberReader,
}
