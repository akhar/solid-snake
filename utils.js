const _ = {
  getRandomInRange: (from, to) =>
    Math.floor(Math.random() * (to - from) + from), //from inclusve to exclusive

  getRandomSafeCoords: max => {
    return {
      x: _.getRandomInRange(Math.floor(max / 3), max - Math.floor(max / 3)),
      y: _.getRandomInRange(Math.floor(max / 3), max - Math.floor(max / 3))
    }
  },

  getRandomCoords: max => {
    return { x: _.getRandomInRange(0, max), y: _.getRandomInRange(0, max) }
  },

  getRandomDirection: () => {
    const seed = _.getRandomInRange(0, 4)
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
  }
}

export default _
