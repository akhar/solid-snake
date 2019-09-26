interface Coordinates {
  row: number
  column: number
  color: string
}

export interface StateInterface {
  snake: Coordinates[]
  prey: Coordinates
  score: number
}

export class State implements StateInterface {
  private _snake: Coordinates[]
  private _prey: Coordinates
  private _score: number

  constructor() {}

  public get snake(): Coordinates[] {
    return this._snake
  }
  public set snake(newSnake: Coordinates[]) {
    this._snake = newSnake
  }

  public get prey(): Coordinates {
    return this._prey
  }
  public set prey(newPrey: Coordinates) {
    this.prey = newPrey
  }

  public get score(): number {
    return this._score
  }
  public set score(newScore: number) {
    this._score = newScore
  }
}
