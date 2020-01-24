import { interval, Subscription } from 'rxjs'
import { AnimationClock } from './animation'
import { GAME_SPEED, GRID_HEIGHT, GRID_WIDTH } from './cfg'
import { Direction, Directions } from './direction'
import { Render } from './render/render'
import { Orient } from './render/stage'
import { Coordinates, Model, State } from './state'
import { compareCoordinates, getOrientation, makeWholeRandomUpTo } from './utils'

// TODO: mobile version with screen contriller
export class Game {
  constructor(render: Render, state: State, animationClock: AnimationClock, directions: Directions) {
    this.state = state
    this.render = render
    this.directions = directions

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
    this.state.changeState({ name: 'isRunning', value: false })
  }

  private game = (): void => {
    this.moveSnake()
  }

  private isBorderCrossed = (head: Coordinates): boolean => {
    const { row, column } = head
    return row < 0 || row > GRID_HEIGHT || column < 0 || column > GRID_WIDTH
  }

  private isSelfCrossed = (head: Coordinates, tail: Coordinates[]): boolean => {
    let result: boolean = false
    tail.forEach((segment: Coordinates): void => {
      if (segment.row === head.row && segment.column === head.column) {
        result = true
      }
    })
    return result
  }

  private placeFood = (): void => {
    const row: number = makeWholeRandomUpTo(GRID_HEIGHT)
    const column: number = makeWholeRandomUpTo(GRID_WIDTH)
    const value: Coordinates = { row, column }

    this.state.changeState({ name: 'food', value })
  }

  private isGameWillBeOver = (head: Coordinates, tail?: Coordinates[]): boolean => {
    if (tail && this.isSelfCrossed(head, tail)) return true
    return this.isBorderCrossed(head)
  }

  //TODO: refactor this pile of shit
  private moveSnake = (): void => {
    const snake: Coordinates[] = this.model.snake
    const direction: Direction = this.directions.getDirection(this.model.activeKeys)
    const head: Coordinates = snake[0]

    const newHead: Coordinates = this.makeNewHead(head, direction)

    if (snake.length === 1) {
      if (this.isGameWillBeOver(newHead)) {
        this.endGame()
      } else {
        this.state.changeState({ name: 'snake', value: [newHead] })
      }
    } else {
      const neck: Coordinates = snake[1]
      const newTail: Coordinates[] = snake.slice(0, snake.length - 1)

      const isDirectionWrong: boolean = compareCoordinates(neck, newHead)
      const newHeadCorected = isDirectionWrong ? this.makeNewHead(head, this.model.lastDirection) : newHead

      if (this.isGameWillBeOver(newHeadCorected, newTail)) {
        this.endGame()
      } else {
        const newSnake: Coordinates[] = [newHeadCorected, ...newTail]

        !isDirectionWrong && this.state.changeState({ name: 'lastDirection', value: direction })

        this.state.changeState({ name: 'snake', value: newSnake })
      }
    }
  }

  private endGame = (): void => {
    this.state.changeState({ name: 'isGameOver', value: true })
    this.stopGame
  }

  private makeNewHead = (head: Coordinates, direction: Direction): Coordinates => {
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
