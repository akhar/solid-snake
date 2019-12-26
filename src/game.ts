import { interval, Subscription } from 'rxjs'
import { AnimationClock } from './animation'
import { DEFAULT_DIRECTION, GAME_SPEED } from './cfg'
import { Render } from './render/render'
import { Orient } from './render/stage'
import { ActiveKeys, Coordinates, Direction, Model, State } from './state'
import { whatOrientation } from './utils'

export class Game {
  private render: Render
  private state: State
  private model: Model
  private gameInterval: number = 1000 / GAME_SPEED // from Hz to intrval
  private lastDirection: Direction = DEFAULT_DIRECTION
  public gameStream: Subscription

  constructor(render: Render, state: State, animationClock: AnimationClock) {
    this.state = state
    this.render = render

    this.state.observe((model: Model): void => {
      this.model = model
    })

    animationClock.start((frame: number): void => {
      this.render.renderModel(this.model)
    })

    this.startGame()
  }

  public startGame = (): void => {
    this.gameStream = interval(this.gameInterval).subscribe(this.game)
  }

  private game = (): void => {
    const direction: Direction = this.whatDirection(this.model.activeKeys)
    const snake: Coordinates[] = this.model.snake
    const head: Coordinates = this.model.snake[0]
    const newTail: Coordinates[] = snake.slice(0, snake.length - 1)
    const newHead: Coordinates = this.makeNewHead(head, direction)
    const newSnake: Coordinates[] = [newHead, ...newTail]

    this.state.changeState({ name: 'snake', value: newSnake })
  }

  private makeNewHead = (
    head: Coordinates,
    direction: Direction
  ): Coordinates => {
    const { row, column } = head
    const headOrientation: Orient = whatOrientation(head.row, head.column)

    if (headOrientation === Orient.DOWN) {
      switch (direction) {
        case Direction.LEFT:
          return { ...head, row, column: column - 1 }
        case Direction.L_DOWN:
          return { ...head, row, column: column - 1 }
        case Direction.L_UP:
          return { ...head, row: row - 1, column }
        case Direction.R_UP:
          return { ...head, row: row - 1, column }
        case Direction.RIGHT:
          return { ...head, row, column: column + 1 }
        case Direction.R_DOWN:
          return { ...head, row, column: column + 1 }
      }
    } else {
      switch (direction) {
        case Direction.LEFT:
          return { ...head, row, column: column - 1 }
        case Direction.L_UP:
          return { ...head, row, column: column - 1 }
        case Direction.RIGHT:
          return { ...head, row, column: column + 1 }
        case Direction.R_UP:
          return { ...head, row, column: column + 1 }
        case Direction.L_DOWN:
          return { ...head, row: row + 1, column }
        case Direction.R_DOWN:
          return { ...head, row: row + 1, column }
      }
    }
  }

  private whatDirection = (activeKeys: ActiveKeys): Direction => {
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
      return this.lastDirection
    }
  }

  private updateLastDirection = (direction: Direction): void => {
    this.lastDirection = direction
  }
}
