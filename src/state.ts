import { Subject } from 'rxjs'
import { GRID_HEIGHT, GRID_WIDTH, PADDING } from './cfg'
import { Direction } from './direction'
import { getRandomCoordinatesInsidePadding } from './utils'

export type Coordinates = {
  row: number
  column: number
}

type StateChanges = {
  name: string
  value: string | number | boolean | Coordinates | Coordinates[] | ActiveKeys
}

export type ActiveKeys = {
  ArrowLeft: boolean
  ArrowUp: boolean
  ArrowRight: boolean
  ArrowDown: boolean
}

export type Model = {
  snake: Coordinates[]
  food?: Coordinates
  eaten: Coordinates[]
  score: number
  activeKeys: ActiveKeys
  lastDirection?: Direction
  isRunning: boolean
  isGameOver: boolean
  seconds: number
}

export interface State {
  observe(getState): void
  changeState(chanages: StateChanges): void
  initModel(food: Coordinates, snake: Coordinates[]): void
}

export class State implements State {
  private model: Model
  private subject: Subject<unknown>

  constructor() {
    this.subject = new Subject()
  }

  public observe(onModelChange): void {
    this.subject.subscribe(onModelChange)
    this.subject.next(this.model)
  }

  public changeState(changes: StateChanges): void {
    this.model[changes.name] = changes.value
    this.subject.next(this.model)
  }

  public initModel(): void {
    this.model = {
      seconds: 0,
      isRunning: false,
      isGameOver: false,
      activeKeys: {
        ArrowLeft: false,
        ArrowUp: false,
        ArrowRight: false,
        ArrowDown: false,
      },
      score: 0,
      eaten: [],
      snake: [getRandomCoordinatesInsidePadding(GRID_HEIGHT, GRID_WIDTH, PADDING)],
    }
  }
}
