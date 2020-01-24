import { ActiveKeys, Model, State } from './state'
import { makeWholeRandomUpTo } from './utils'

export enum Direction {
  LEFT,
  L_UP,
  R_UP,
  RIGHT,
  R_DOWN,
  L_DOWN,
}

export interface Directions {
  getDirection: (activeKeys: ActiveKeys) => Direction
  getRandomDirection: () => Direction
}

export class Directions implements Directions {
  constructor(state: State) {
    state.observe((model: Model): void => {
      this.model = model
    })
    this.state = state
  }
  private model: Model
  private state: State

  private updateLastDirection = (value: Direction): void => {
    // this.state.changeState({ name: 'lastDirection', value })
  }

  public getRandomDirection = (): Direction => {
    return Direction[Direction[makeWholeRandomUpTo(5)]]
  }

  public getDirection = (activeKeys: ActiveKeys): Direction => {
    const { ArrowLeft, ArrowUp, ArrowRight, ArrowDown } = activeKeys
    if (ArrowRight) {
      if (ArrowUp) {
        this.updateLastDirection(Direction.R_UP)
        return Direction.R_UP
      } else if (ArrowDown) {
        this.updateLastDirection(Direction.R_DOWN)
        return Direction.R_DOWN
      } else {
        this.updateLastDirection(Direction.RIGHT)
        return Direction.RIGHT
      }
    } else if (ArrowLeft) {
      if (ArrowUp) {
        this.updateLastDirection(Direction.L_UP)
        return Direction.L_UP
      } else if (ArrowDown) {
        this.updateLastDirection(Direction.L_DOWN)
        return Direction.L_DOWN
      } else {
        this.updateLastDirection(Direction.LEFT)
        return Direction.LEFT
      }
    } else {
      if (this.model.lastDirection || this.model.lastDirection === 0) {
        return this.model.lastDirection
      } else {
        const randomDirection: Direction = this.getRandomDirection()
        this.updateLastDirection(randomDirection)
        return randomDirection
      }
    }
  }
}
