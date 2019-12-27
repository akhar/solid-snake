import { Orient } from './render/stage'
import { Coordinates } from './state'

export function makeRandomUpTo(limit: number): number {
  return Math.floor(Math.random() * limit + 1)
}

export function getOrientation(row: number, column: number): Orient {
  const isRowOdd: boolean = row % 2 === 0
  const isColumnOdd: boolean = column % 2 === 0
  return (isRowOdd && isColumnOdd) || (!isRowOdd && !isColumnOdd)
    ? Orient.DOWN
    : Orient.UP
}

export function compareCoordinates(c1: Coordinates, c2: Coordinates): boolean {
  return c1.row === c2.row && c1.column === c2.column
}
