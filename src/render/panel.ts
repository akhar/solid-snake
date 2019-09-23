import { B, H, GRID_COLOR } from '../cfg.js'

export function drowPanel(canvas: HTMLCanvasElement, text: string): void {
  const panel = canvas.getContext('2d') as CanvasRenderingContext2D
  const background = new Path2D()

  background.moveTo(8 * B, 8 * H) // top-left
  background.lineTo(19 * B, 8 * H) // top-right
  background.lineTo(19.5 * B, 8 * H + H) // far-right
  background.lineTo(16 * B, 16 * H) // bottom-right
  background.lineTo(5 * B, 16 * H) // bottom-left
  background.lineTo(4.5 * B, 15 * H) // far-left

  panel.fillStyle = GRID_COLOR
  panel.fill(background)

  panel.fillStyle = 'white'
  panel.font = 'italic 2em "Fira Sans", serif'
  panel.fillText(text, 8 * B, 12 * H)
}
