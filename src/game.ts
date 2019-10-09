import { TRIANGLES } from './cfg'
import { Render } from './render/render'
import { State, StateInterface } from './state'

function makeRandomUpTo(limit: number): number {
  return Math.floor(Math.random() * limit + 1)
}

export class Game {
  private render
  private state: StateInterface

  constructor() {
    this.state = new State()
    this.render = new Render(this.state)
  }

  public init(): void {
    this.render.init()
    this.render.drowGrid()
    this.render.drowPanel('Press X to win')
  }

  private showBackgroundArt(): void {
    for (let index = 0; index < 500; index++) {
      this.render.drowTriangle(
        makeRandomUpTo(TRIANGLES),
        makeRandomUpTo(TRIANGLES * 2 - 1),
        'NavajoWhite'
      )
    }
  }
}