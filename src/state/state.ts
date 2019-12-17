import { Subject, Subscription } from 'rxjs'

type Coordinates = {
  row: number
  column: number
  color: string
}

type StateChanges = {
  name: string
  value: string | number | boolean
}

export type StateType = {
  snake?: Coordinates[]
  prey?: Coordinates
  score: number
}

export interface StateInterface {
  observe(observer): void
  changeState(chanages: StateChanges): void
}

export class State implements StateInterface {
  private state: StateType
  private subject

  constructor() {
    this.state = {
      score: 0,
    }
    this.subject = new Subject()
  }

  public observe(observer): void {
    this.subject.subscribe(observer)
  }

  public changeState(changes: StateChanges): void {
    this.state[changes.name] = changes.value
    this.subject.next(this.state)
  }
}
