import { Direction } from './direction'

export const GRID_HEIGHT: number = 30 // trangles in a column
export const B: number = 30 // base side of a triangle in pixels
export const GRID_COLOR: string = 'LightSkyBlue'
export const GAME_FREQ: number = 2 // Hz
export const ANIMATION_FREQ: number = 60 //Hz
export const GAME_SPEED: number = 4 //Hz
export const PANEL_FONT: string = 'italic 1em "Fira Sans", serif'
export const DEFAULT_DIRECTION: Direction = Direction.RIGHT
export const BACKGROUND_COLOR: string = 'white'
export const SNAKE_COLOR: string = 'darkgreen'
export const FOOD_COLOR: string = 'firebrick'

export const H: number = (B * Math.sqrt(3)) / 2 // heiht of a row
export const HEIGHT: number = GRID_HEIGHT * H + 1 // height of the stage
export const WIDTH: number = GRID_HEIGHT * B // width of the stage
export const GRID_WIDTH: number = GRID_HEIGHT * 2 - 1 // triangles in a row
