export const B: number = 30 // side of a triangle
export const TRIANLES: number = 24 // amount of trangles

export const H: number = (B * Math.sqrt(3)) / 2 // heiht of a row
console.log(`H=${H}, B=${B}`)
export const HEIGHT: number = TRIANLES * H + 1 // height of the stage
export const WIDTH: number = TRIANLES * B // width of the stage
export const GRID_COLOR = 'LightSkyBlue'
export const SPEED = 1 // Hz
