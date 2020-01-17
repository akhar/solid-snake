import { interval, Subscription } from 'rxjs'
import { AnimationClock } from './animation'
import { GAME_SPEED, GRID_HEIGHT, GRID_WIDTH } from './cfg'
import { Direction, Directions } from './direction'
import { Render } from './render/render'
import { Orient } from './render/stage'
import { Coordinates, Model, State } from './state'
import {
  compareCoordinates,
  getOrientation,
  makeWholeRandomUpTo,
} from './utils'

export class Game {
  constructor(render: Render, state: State, animationClock: AnimationClock) {
    this.state = state
    this.render = render

    this.state.observe((model: Model): void => {
      this.model = model
    })

    animationClock.start((frame: number): void => {
      this.render.renderModel(this.model)
      if (!Boolean(this.gameStream) && this.model.isRunning) {
        this.startGame()
      } else if (Boolean(this.gameStream) && !this.model.isRunning) {
        this.stopGame()
      }
    })

    this.directions = new Directions(this.state)

    this.placeFood()
  }

  private render: Render
  private state: State
  private model: Model
  private gameInterval: number = 1000 / GAME_SPEED // from Hz to intrval
  private directions: Directions
  private gameStream: Subscription

  public startGame = (): void => {
    this.gameStream = interval(this.gameInterval).subscribe(this.game)
  }

  private stopGame = (): void => {
    this.gameStream.unsubscribe()
    this.gameStream = undefined
  }

  private game = (): void => {
    if (this.isGameOver()) {
      this.stopGame()
    } else {
      this.moveSnake()
    }
  }

  private isGameOver = (): boolean => {
    return false
  }

  private placeFood = (): void => {
    const row: number = makeWholeRandomUpTo(GRID_HEIGHT)
    const column: number = makeWholeRandomUpTo(GRID_WIDTH)
    const value: Coordinates = { row, column }
    console.log(GRID_WIDTH, GRID_HEIGHT)
    this.state.changeState({ name: 'food', value })
  }

  private moveSnake = (): void => {
    const snake: Coordinates[] = this.model.snake
    const head: Coordinates = snake[0]
    const neck: Coordinates = snake[1]
    const direction: Direction = this.directions.getDirection(
      this.model.activeKeys
    )
    const newTail: Coordinates[] = snake.slice(0, snake.length - 1)
    const newHead: Coordinates = this.makeNewHead(head, direction)

    const isDirectionWrong: boolean = compareCoordinates(neck, newHead)

    const newHeadCorected = isDirectionWrong
      ? this.makeNewHead(head, this.model.lastDirection)
      : newHead

    const newSnake: Coordinates[] = [newHeadCorected, ...newTail]

    !isDirectionWrong &&
      this.state.changeState({ name: 'lastDirection', value: direction })

    this.state.changeState({ name: 'snake', value: newSnake })
  }

  private makeNewHead = (
    head: Coordinates,
    direction: Direction
  ): Coordinates => {
    const { row, column } = head
    const headOrientation: Orient = getOrientation(head.row, head.column)

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
}
