import { cfg } from './config.js'

const _ = {
  getRandomSafeCoords: max => {
    return {
      x: roundToGrid(getRandomInRange(Math.floor(max / 3), max - Math.floor(max / 3))),
      y: roundToGrid(getRandomInRange(Math.floor(max / 3), max - Math.floor(max / 3)))
    }
  },

  getRandomCoords: max => {
    return {
      x: roundToGrid(getRandomInRange(0, max)),
      y: roundToGrid(getRandomInRange(0, max))
    }
  },

  getRandomDirection: () => {
    const seed = getRandomInRange(0, 4)
    switch (seed) {
      case 0:
        return 'x++'
      case 1:
        return 'x--'
      case 2:
        return 'y++'
      case 3:
        return 'y--'
    }
  },

  isCoodrsEqual: (a, b) => a.x === b.x && a.y === b.y
}

function roundToGrid(num) {
  return num + cfg.GRID_SIZE - (num % cfg.GRID_SIZE)
}

function getRandomInRange(from, to) {
  //from inclusve to exclusive
  return Math.floor(Math.random() * (to - from) + from)
}

export default _
