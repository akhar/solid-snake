import { Subject } from 'rxjs'

export type Coordinates = {
  row: number
  column: number
  color: string
}

type StateChanges = {
  name: string
  value: string | number | boolean | Coordinates[] | ActiveKeys
}

type ActiveKeys = {
  ArrowLeft: boolean
  ArrowUp: boolean
  ArrowRight: boolean
  ArrowDown: boolean
}

export enum Direction {
  LEFT,
  L_UP,
  R_UP,
  RIGHT,
  R_DOWN,
  L_DOWN,
}

export type Model = {
  input: Input
  output: Output
}

type Output = {
  snake: Coordinates[]
  prey?: Coordinates
  score: number
}

type Input = {
  activeKeys: {
    ArrowLeft: boolean
    ArrowUp: boolean
    ArrowRight: boolean
    ArrowDown: boolean
  }
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
      input: {
        activeKeys: {
          ArrowLeft: false,
          ArrowUp: false,
          ArrowRight: false,
          ArrowDown: false,
        },
      },
      output: {
        score: 0,
        snake: [
          {
            row: 13,
            column: 13,
            color: 'darkgreen',
          },
        ],
      },
    }
    this.subject = new Subject()
  }

  public observe(getState): void {
    this.subject.subscribe(getState)
    this.subject.next(this.model)
  }

  public changeState(changes: StateChanges): void {
    this.model[changes.name] = changes.value
    this.subject.next(this.model)
  }
}
