'use strict'

const SATGE_SIZE = 50 // move to the config

import { getModel, updateModel } from './model.js'
import _ from './utils.js'

function makeStep() {
  const model = getModel()
  const newSnake = model.hasEat
    ? growHead(model.snake, model.direction)
    : dropTail(growHead(model.snake, model.direction))
  updateModel('snake', newSnake)
}

function checkConditions(tiker) {
  const model = getModel()
  const head = model.snake[0]

  if (isEqual(head, model.food)) {
    onEating()
  }

  if (
    head.x === -1 ||
    head.y === -1 ||
    head.x === SATGE_SIZE ||
    head.y === SATGE_SIZE
  ) {
    clearInterval(tiker)
  }
}

function onEating() {
  updateModel('hasEat', true)
  palceNewFood()
  updateModel('hasEat', false)
}

function palceNewFood() {
  updateModel('food', _.getRandomCoords(SATGE_SIZE))
}

function growHead(snake, direction) {
  const head = snake[0]
  switch (direction) {
    case 'x--':
      return [{ x: head.x--, y: head.y }, ...snake]
    case 'y--':
      return [{ x: head.x, y: head.y-- }, ...snake]
    case 'x++':
      return [{ x: head.x++, y: head.y }, ...snake]
    case 'y++':
      return [{ x: head.x, y: head.y++ }, ...snake]
  }
}

function isEqual(a, b) {
  return a.x === b.x && a.y === b.y
}

function dropTail(snake) {
  return snake.splice(-1, 1)
}

export { makeStep, checkConditions }
