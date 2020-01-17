import { Subject } from 'rxjs'
import { DEFAULT_DIRECTION } from './cfg'
import { Direction } from './direction'

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
  lastDirection: Direction
  isRunning: boolean
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
      activeKeys: {
        ArrowLeft: false,
        ArrowUp: false,
        ArrowRight: false,
        ArrowDown: false,
      },
      score: 0,
      lastDirection: DEFAULT_DIRECTION,
      snake: [
        {
          row: 21,
          column: 26,
        },
        {
          row: 21,
          column: 25,
        },
        {
          row: 21,
          column: 24,
        },
        {
          row: 21,
          column: 23,
        },
        {
          row: 21,
          column: 22,
        },
        {
          row: 21,
          column: 21,
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
