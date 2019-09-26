import { startClock } from './clock'
import { TRIANGLES } from './cfg'
import { Render } from './render/render'
import { State, StateInterface } from './state'

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
        'NavajoWhite'
      )
    )
  }
}

function makeRundomUpTo(limit: number): number {
  return Math.floor(Math.random() * limit + 1)
}

export class Game {
  private render
  private state

  constructor() {
    this.render = new Render()
    this.state = new State()
  }

  public init(): void {
    render.init()
    render.drowGrid()
    startClock()
    render.drowPanel('Press X to win')
  }
}
