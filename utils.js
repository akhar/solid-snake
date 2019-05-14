import cfg from './config.js'

const _ = {
  getRandomLeftCoords: () => {
    const max = cfg.SATGE_SIZE * cfg.GRID_SIZE - cfg.GRID_SIZE

    return {
      x: roundToGrid(getRandomInRange(Math.floor(max / 5), Math.floor(max / 2))),
      y: roundToGrid(getRandomInRange(Math.floor(max / 5), max - Math.floor(max / 5)))
    }
  },

  getRandomRightCoords: () => {
    const max = cfg.SATGE_SIZE * cfg.GRID_SIZE - cfg.GRID_SIZE

    return {
      x: roundToGrid(getRandomInRange(Math.floor(max / 2), max - Math.floor(max / 5))),
      y: roundToGrid(getRandomInRange(Math.floor(max / 5), max - Math.floor(max / 5)))
    }
  },

  getRandomCoords: () => {
    const max = cfg.SATGE_SIZE * cfg.GRID_SIZE - cfg.GRID_SIZE
    return {
      x: roundToGrid(getRandomInRange(0, max)),
      y: roundToGrid(getRandomInRange(0, max))
    }
  },

  getFoodCoords: model => {
    const attemption = _.getRandomCoords()
    if ([...model.snakeL, ...model.snakeR].includes(attemption)) {
      return _.getFoodCoords(model)
    } else {
      return attemption
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
