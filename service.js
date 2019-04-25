'use strict'

import { cfg } from './config.js'
import { getModel, updateModel } from './model.js'
import _ from './utils.js'

function makeStep() {
  const model = getModel()
  const newSnake = model.hasEat
    ? growHead(model.snake, model.direction)
    : dropTail(growHead(model.snake, model.direction))

  model.hasEat && updateModel('hasEat', false)
  updateModel('snake', newSnake)
}

function checkConditions(tiker) {
  const model = getModel()
  const head = model.snake[0]

  if (isEqual(head, model.food)) {
    eating()
  }

  if (
    head.x === 0 ||
    head.y === 0 ||
    head.x === cfg.SATGE_SIZE * cfg.GRID_SIZE - cfg.GRID_SIZE ||
    head.y === cfg.SATGE_SIZE * cfg.GRID_SIZE - cfg.GRID_SIZE
  ) {
    clearInterval(tiker)
  }
}

function eating() {
  updateModel('hasEat', true)
  palceNewFood()
}

function palceNewFood() {
  updateModel('food', _.getRandomCoords(cfg.SATGE_SIZE * cfg.GRID_SIZE))
}

function growHead(snake, direction) {
  const head = snake[0]
  switch (direction) {
    case 'x--':
      const newHead = {}
      return [{ x: head.x - cfg.TILE_SIZE, y: head.y }, ...snake]
    case 'y--':
      return [{ x: head.x, y: head.y - cfg.TILE_SIZE }, ...snake]
    case 'x++':
      return [{ x: head.x + cfg.TILE_SIZE, y: head.y }, ...snake]
    case 'y++':
      return [{ x: head.x, y: head.y + cfg.TILE_SIZE }, ...snake]
  }
}

function isEqual(a, b) {
  return a.x === b.x && a.y === b.y
}

function dropTail(snake) {
  return snake.splice(-1, 1)
}

export { makeStep, checkConditions }
