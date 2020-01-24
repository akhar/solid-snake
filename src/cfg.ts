import { isMobileDevice } from './utils'

export const GRID_HEIGHT: number = parseFloat(getComputedStyle(document.documentElement).fontSize) // trangles in a column
export const B: number = isMobileDevice()
  ? Math.floor(document.body.clientWidth / GRID_HEIGHT)
  : GRID_HEIGHT * 2 // base side of a triangle in pixels
export const GRID_COLOR: string = 'LightSkyBlue'
export const ANIMATION_FREQ: number = 60 //Hz
export const GAME_SPEED: number = 10 //Hz
export const PANEL_FONT: string = '2rem "Fira code", serif'
export const BACKGROUND_COLOR: string = 'white'
export const SNAKE_COLOR: string = 'darkgreen'
export const FOOD_COLOR: string = 'firebrick'

export const H: number = (B * Math.sqrt(3)) / 2 // heiht of a row
export const HEIGHT: number = GRID_HEIGHT * H + 1 // height of the stage
export const WIDTH: number = GRID_HEIGHT * B // width of the stage
export const GRID_WIDTH: number = GRID_HEIGHT * 2 - 1 // triangles in a row
