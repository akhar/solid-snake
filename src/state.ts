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

type StateType = {
  snake: Coordinates[]
  prey: Coordinates
  score: number
}

export interface StateInterface<T> {
  subscribe(observer: T): Subscription
}

export class State<T> implements StateInterface<T> {
  private currentState: StateType
  private state //TODO: type?

  constructor(observer) {
    //TODO: initial state
    this.state = new Subject()
  }

  public subscribe(observer: T): Subscription {
    return this.state.subscribe(observer)
  }

  public changeState(changes: StateChanges): void {
    //TODO: change state in subject
  }
}
