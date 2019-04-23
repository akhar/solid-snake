const _ = {
  getRandomInRange: (from, to) => Math.floor(Math.random() * (to - from) + from), //from inclusve to exclusive

  getRandomSafeCoords: max => {
    return [
      _.getRandomInRange(Math.floor(max / 3), max - Math.floor(max / 3)),
      _.getRandomInRange(Math.floor(max / 3), max - Math.floor(max / 3))
    ]
  },

  getRandomCoords: max => {
    return [_.getRandomInRange(0, max), _.getRandomInRange(0, max)]
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
