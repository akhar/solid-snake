import { Coordinates } from './state'
import { compareCoordinates } from './utils'

export function isSelfCrossed(head: Coordinates, tail: Coordinates[]): boolean {
  let result: boolean = false
  tail.forEach((segment: Coordinates): void => {
    if (segment.row === head.row && segment.column === head.column) {
      result = true
    }
  })
  return result
}

export function hasFoodEaten(head: Coordinates): boolean {
  const food = this.model.food
  if (compareCoordinates(food, head)) {
    const value: Coordinates[] = [...this.model.eaten, head]
    this.state.changeState({ name: 'eaten', value })
    return true
  }
}

export function isGameWillBeOver(
  grid_height: number,
  grid_width: number,
  head: Coordinates,
  tail?: Coordinates[]
): boolean {
  if (tail && isSelfCrossed(head, tail)) return true
  return isBorderCrossed(head, grid_height, grid_width)
}

function isBorderCrossed(head: Coordinates, grid_height: number, grid_width: number): boolean {
  const { row, column } = head
  return row < 1 || row > grid_height || column < 1 || column > grid_width
}
