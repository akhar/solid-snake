import { Subject } from 'rxjs'

export type Coordinates = {
  row: number
  column: number
  color: string
}

type StateChanges = {
  name: string
  value: string | number | boolean | Coordinates[]
}

export type Model = {
  snake?: Coordinates[]
  prey?: Coordinates
  score: number
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
      score: 0,
      activeKeys: {
        ArrowLeft: false,
        ArrowUp: false,
        ArrowRight: false,
        ArrowDown: false,
      },
      snake: [
        {
          row: 6,
          column: 10,
          color: 'darkgreen',
        },
      ],
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
