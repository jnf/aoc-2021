import { stringReader } from './shared.js'

const p1 = path => {
  const bins = stringReader(path)
  const bitLength = bins[0].length
  const counts = new Array(bitLength).fill(0).map(() => ({ 0: 0, 1: 0 }))

  counts.map((count, index) => {
    bins.forEach(bin => count[bin[index]] += 1)
  })

  const [gBin, eBin] = counts.reduce(([ag, ae], e) => {
    const gbit = e['0'] > e['1'] ? '0' : '1'
    const ebit = e['0'] < e['1'] ? '0' : '1'
    return [ag + gbit, ae + ebit]
  }, ['', ''])

  const gDec = parseInt(gBin, 2)
  const eDec = parseInt(eBin, 2)
  const product = gDec * eDec

  return {gBin, gDec, eBin, eDec, product}
}

const p2 = path => {
  const keepMost  = c => c['0'] > c['1'] ? '0' : '1'
  const keepLeast = c => c['0'] <= c['1'] ? '0' : '1'
  const keeper = (bins, kFunc, bitIndex=0) => {
    const filterBins = bins => {
      const counts = { 0: 0, 1: 0 }
      bins.forEach(bin => counts[bin[bitIndex]] += 1)
      return bins.filter(bin => bin[bitIndex] === kFunc(counts))
    }

    while (bins.length > 1) {
      bins = filterBins(bins)
      bitIndex++
    }

    return bins[0]
  }

  const bins = stringReader(path)
  const oBin = keeper(bins, keepMost)
  const oDec = parseInt(oBin, 2)
  const cBin = keeper(bins, keepLeast)
  const cDec = parseInt(cBin, 2)
  const product = oDec * cDec

  return {oBin, oDec, cDec, cBin, product}
}

console.log('p1', p1('./inputs/d03_input.txt'))
console.log('p2', p2('./inputs/d03_input.txt'))
