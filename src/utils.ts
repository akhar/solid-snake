import { Orient } from './render/stage'

export function makeRandomUpTo(limit: number): number {
  return Math.floor(Math.random() * limit + 1)
}

export function whatOrientation(row: number, column: number): Orient {
  const isRowOdd: boolean = row % 2 === 0
  const isColumnOdd: boolean = column % 2 === 0
  return (isRowOdd && isColumnOdd) || (!isRowOdd && !isColumnOdd)
    ? Orient.DOWN
    : Orient.UP
}
