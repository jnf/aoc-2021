import { stringReader } from './shared.js'

const scoreBoard = ({ winsOn, board }, draws) => {
  const pulled = draws.slice(0, winsOn + 1)
  const remaining = board.filter(v => !pulled.includes(v))
  return remaining.reduce((s, v) => s + Number(v), 0) * draws[winsOn]
}

const boardMaker = (stream, draws) => {
  const indexedDraws = draws.reduce((a, n, i) => ({ ...a, [n]: i }), {})
  const b = stream.split(/\n/).reduce((acc, group) => {
    const row = group.trim().split(/\s+/)
    const hWins = row.reduce((a, v) => ({ ...a, [v]: indexedDraws[v] }), {})
    acc.hWins.push(hWins)
    row.forEach((v, i) => {
      if (!acc.vWins[i]) acc.vWins[i] = {}
      acc.vWins[i][v] = indexedDraws[v]
      acc.board.push(v)
    })

    return acc
  }, { hWins: [], vWins: [], board: [] })

  const wins = [...b.vWins, ...b.hWins]
  const winsOn = Math.min(...wins.map(win => Math.max(...Object.values(win))))
  return { winsOn, board: b.board }
}

const p1 = path => {
  const data = stringReader(path, '\n\n')
  const draws = data.shift().split(',')
  const winner = data.map(d => boardMaker(d, draws)).sort((a, b) => a.winsOn - b.winsOn)[0]
  return { score: scoreBoard(winner, draws), winner }
}

const p2 = path => {
  const data = stringReader(path, '\n\n')
  const draws = data.shift().split(',')
  const winner = data.map(d => boardMaker(d, draws)).sort((a, b) => b.winsOn - a.winsOn)[0]
  return { score: scoreBoard(winner, draws), winner }

}

// console.log(p1('./inputs/d04_test.txt'))
console.log(p1('./inputs/d04_input.txt'))
// console.log(p2('./inputs/d04_test.txt'))
console.log(p2('./inputs/d04_input.txt'))
