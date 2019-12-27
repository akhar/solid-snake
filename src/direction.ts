import { ActiveKeys, Model, State } from './state'

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
}

export class Directions implements Directions {
  constructor(state: State) {
    state.observe((model: Model): void => {
      this.model = model
    })
  }
  private model: Model

  public getDirection = (activeKeys: ActiveKeys): Direction => {
    const { ArrowLeft, ArrowUp, ArrowRight, ArrowDown } = activeKeys

    if (ArrowRight) {
      if (ArrowUp) {
        return Direction.R_UP
      } else if (ArrowDown) {
        return Direction.R_DOWN
      } else {
        return Direction.RIGHT
      }
    } else if (ArrowLeft) {
      if (ArrowUp) {
        return Direction.L_UP
      } else if (ArrowDown) {
        return Direction.L_DOWN
      } else {
        return Direction.LEFT
      }
    } else {
      return this.model.lastDirection
    }
  }
}
