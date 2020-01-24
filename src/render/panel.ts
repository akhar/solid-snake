import { B, FOOD_COLOR, GRID_COLOR, H, PANEL_FONT } from '../cfg'

export function drowPanelOnCanvas(canvas: HTMLCanvasElement, text: string): void {
  const panel = canvas.getContext('2d') as CanvasRenderingContext2D
  const background = new Path2D()

  background.moveTo(5 * B, 4 * H) // top-left
  background.lineTo(14 * B, 4 * H) // top-right
  background.lineTo(14.5 * B, 4 * H + H) // far-right
  background.lineTo(11 * B, 12 * H) // bottom-right
  background.lineTo(2 * B, 12 * H) // bottom-left
  background.lineTo(1.5 * B, 11 * H) // far-left

  panel.fillStyle = GRID_COLOR
  panel.fill(background)

  panel.fillStyle = FOOD_COLOR
  panel.font = PANEL_FONT
  panel.fillText(text, 5 * B, 8 * H)
}

export function clearPanelOnCanvas(canvas: HTMLCanvasElement): void {
  const panel = canvas.getContext('2d') as CanvasRenderingContext2D
  panel.fillStyle = 'transpanent'
  panel.fill()
}
