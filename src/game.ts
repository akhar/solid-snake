import { startClock } from './clock'
import { TRIANGLES } from './cfg'
import { Render } from './render/render'

const render = new Render()

export function initGame(): void {
  render.init()
  render.drowGrid()
  startClock()
  render.drowPanel('Press X to win')
}

export function getTick(): Function {
  return () => {
    render.clearStage()
    showBackgroundArt()
  }
}

function showBackgroundArt(): void {
  for (let index = 0; index < 500; index++) {
    requestAnimationFrame(() =>
      render.drowTriangle(
        makeRundomUpTo(TRIANGLES),
        makeRundomUpTo(TRIANGLES * 2 - 1),
        'LightGoldenrodYellow'
      )
    )
  }
}

function makeRundomUpTo(limit: number): number {
  return Math.floor(Math.random() * limit + 1)
}
