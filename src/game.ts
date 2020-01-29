import { interval, Subscription } from 'rxjs'
import { AnimationClock } from './animation'
import { GAME_SPEED, GRID_HEIGHT, GRID_WIDTH } from './cfg'
import { hasFoodEaten, isGameWillBeOver, isSelfCrossed } from './checks'
import { Direction, Directions } from './direction'
import { Render } from './render/render'
import { Orient } from './render/stage'
import { Coordinates, Model, State } from './state'
import { compareCoordinates, getOrientation, makeWholeRandomUpTo } from './utils'

// TODO: mobile version with screen contriller
export class Game {
  constructor(
    render: Render,
    state: State,
    animationClock: AnimationClock,
    directions: Directions
  ) {
    this.state = state
    this.render = render
    this.directions = directions

    this.state.observe((model: Model): void => {
      this.model = model
    })

    animationClock.start((): void => {
      this.render.renderModel(this.model)

      if (!Boolean(this.gameStream) && this.model.isRunning) {
        this.startGame()
      } else if (Boolean(this.gameStream) && !this.model.isRunning) {
        this.stopGame()
      }
    })
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

  private game = (step: number): void => {
    step % GAME_SPEED === 0 && this.state.changeState({ name: 'seconds', value: step / GAME_SPEED })
    this.moveSnake()
    this.updateEaten()
  }

  private updateEaten = (): void =>
    this.state.changeState({
      name: 'eaten',
      value: this.model.eaten.filter((eaten: Coordinates) => this.model.snake.includes(eaten)),
    })

  private placeFood = (): void => {
    const snake = this.model.snake
    const row: number = makeWholeRandomUpTo(GRID_HEIGHT)
    const column: number = makeWholeRandomUpTo(GRID_WIDTH)
    const value: Coordinates = { row, column }

    if (isSelfCrossed(value, snake)) {
      this.placeFood()
    } else {
      this.state.changeState({ name: 'food', value })
    }
  }

  private moveOneCellSnake = (
    head: Coordinates,
    newHead: Coordinates,
    snake: Coordinates[],
    direction: Direction
  ): void => {
    if (isGameWillBeOver(GRID_HEIGHT, GRID_WIDTH, newHead)) {
      this.endGame()
    } else {
      if (hasFoodEaten(head)) {
        this.state.changeState({ name: 'snake', value: [newHead, ...snake] })
        this.placeFood()
      } else {
        this.state.changeState({ name: 'snake', value: [newHead] })
      }
      this.state.changeState({ name: 'lastDirection', value: direction })
    }
  }

  //TODO: refactor this pile of shit
  private moveSnake = (): void => {
    const snake: Coordinates[] = this.model.snake
    const direction: Direction = this.directions.getDirection(this.model.activeKeys)
    const head: Coordinates = snake[0]
    const newHead: Coordinates = this.makeNewHead(head, direction)

    if (snake.length === 1) {
      this.moveOneCellSnake(head, newHead, snake, direction)
    } else {
      const neck: Coordinates = snake[1]
      const newTail: Coordinates[] = hasFoodEaten(head) ? snake : snake.slice(0, snake.length - 1)
      hasFoodEaten(head) && this.placeFood()

      const isDirectionWrong: boolean = compareCoordinates(neck, newHead)
      const newHeadCorected = isDirectionWrong
        ? this.makeNewHead(head, this.model.lastDirection)
        : newHead

      if (isGameWillBeOver(GRID_HEIGHT, GRID_WIDTH, newHeadCorected, newTail)) {
        this.endGame()
      } else {
        const newSnake: Coordinates[] = [newHeadCorected, ...newTail]

        !isDirectionWrong && this.state.changeState({ name: 'lastDirection', value: direction })
        this.state.changeState({ name: 'snake', value: newSnake })
      }
    }
  }

  private endGame = (): void => {
    this.stopGame()
    this.state.changeState({ name: 'isGameOver', value: true })
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
