import { Direction } from './state'

export const B: number = 30 // base — side of a triangle
export const TRIANGLES: number = 30 // amount of trangles in a row
export const GRID_COLOR: string = 'LightSkyBlue'
export const GAME_FREQ: number = 1 // Hz
export const ANIMATION_FREQ: number = 60 //Hz
export const GAME_SPEED: number = 2 //Hz
export const PANEL_FONT: string = 'italic 1em "Fira Sans", serif'
export const DEFAULT_DIRECTION: Direction = Direction.RIGHT
export const BACKGROUND_COLOR: string = 'white'

export const H: number = (B * Math.sqrt(3)) / 2 // heiht of a row
export const HEIGHT: number = TRIANGLES * H + 1 // height of the stage
export const WIDTH: number = TRIANGLES * B // width of the stage
