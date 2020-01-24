import { Subject } from 'rxjs'
import { GRID_HEIGHT, GRID_WIDTH } from './cfg'
import { Direction } from './direction'
import { makeWholeRandomFromTo } from './utils'

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
  score: number
  activeKeys: ActiveKeys
  lastDirection?: Direction
  isRunning: boolean
  isGameOver: boolean
}

export interface State {
  observe(getState): void
  changeState(chanages: StateChanges): void
}

export class State implements State {
  private model: Model
  private subject: Subject<unknown>

  constructor() {
    this.model = {
      isRunning: false,
      isGameOver: false,
      activeKeys: {
        ArrowLeft: false,
        ArrowUp: false,
        ArrowRight: false,
        ArrowDown: false,
      },
      score: 0,
      snake: [
        {
          row: makeWholeRandomFromTo(5, GRID_HEIGHT - 5),
          column: makeWholeRandomFromTo(5, GRID_WIDTH - 5),
        },
      ],
    }

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
}
