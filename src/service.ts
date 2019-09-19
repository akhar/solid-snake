import { drowTriangle, Orient } from './render/triangle.js'
import { drowGrid } from './render/grid.js'
import { H, B } from './cfg.js'

const ROWS = 58
const COLS = 51

const startGame = () => {
  for (let j = 0; j < ROWS; j++) {
    for (let i = -1; i < COLS; i++) {
      j % 2 === 0
        ? drowTriangle(i * B, j * H, Orient.DOWN)
        : drowTriangle(i * B - B / 2, j * H, Orient.DOWN)
    }
  }

  for (let j = 0; j < ROWS; j++) {
    for (let i = -1; i < COLS; i++) {
      j % 2 === 0
        ? drowTriangle(B / 2 + i * B, j * H + H, Orient.UP)
        : drowTriangle(B / 2 + i * B - B / 2, j * H + H, Orient.UP)
    }
  }
  drowGrid()
}

export default startGame
