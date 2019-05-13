'use strict'

import { startClock, stopClock } from './clock.service.js'
import { cfg } from './config.js'
import { initController, initModel } from './init.service.js'
import { getModel, resetModel, updateModel } from './model.js'
import { clearPanel, clearTitle, print, renderFrame } from './render.js'
import _ from './utils.js'

function startGame() {
  initModel()
  initController()
  startClock()
}

function restartGame() {
  resetModel()
  clearPanel()
  stopClock()
  startGame()
}

function pauseGame() {
  updateModel('pause', true)
  print('Pause')
  stopClock()
}

function resumeGame() {
  updateModel('pause', false)
  clearTitle()
  startClock()
}

function finishGame() {
  stopClock()
  print('Game Over')
}

function tick() {
  checkConditions().then(
    () => {
      makeStep()
      renderFrame()
      cacheDirection()
    },
    reason => console.debug(reason)
  )
}

function cacheDirection() {
  const direction = getModel().direction
  updateModel('cached_direction', direction)
}

function makeStep() {
  const model = getModel()
  const newSnake = model.hasAte
    ? growHead(model.snake, model.direction)
    : dropTail(growHead(model.snake, model.direction))

  model.hasAte && updateModel('hasAte', false)
  updateModel('snake', newSnake)
}

function checkConditions() {
  const model = getModel()
  const head = model.snake[0]
  const tail = model.snake.slice(1)
  const direction = model.direction
  const nextTale = growHead([head], direction)[0]

  if (_.isCoodrsEqual(head, model.food)) {
    eating(model.count, model.snake, direction)
  }

  let cannibalism = false
  tail.forEach(segment => {
    if (_.isCoodrsEqual(nextTale, segment)) {
      cannibalism = true
    }
  })

  if (cannibalism) {
    finishGame()
    return Promise.reject('Cannibalism')
  } else if (
    (head.x === 0 && direction === 'x--') ||
    (head.y === 0 && direction === 'y--') ||
    (head.x === cfg.SATGE_SIZE * cfg.GRID_SIZE - cfg.GRID_SIZE && direction === 'x++') ||
    (head.y === cfg.SATGE_SIZE * cfg.GRID_SIZE - cfg.GRID_SIZE && direction === 'y++')
  ) {
    finishGame()
    return Promise.reject('Border hit')
  } else {
    return Promise.resolve()
  }
}

function eating(count, snake, direction) {
  updateModel('hasAte', true)
  updateModel('count', ++count)
  growHead(snake, direction)
  palceFood()
}

function palceFood() {
  updateModel('food', _.getRandomCoords(cfg.SATGE_SIZE * cfg.GRID_SIZE - cfg.GRID_SIZE))
}

function growHead(snake, direction) {
  const head = snake[0]
  switch (direction) {
    case 'x--':
      return [{ x: head.x - cfg.TILE_SIZE, y: head.y }, ...snake]
    case 'y--':
      return [{ x: head.x, y: head.y - cfg.TILE_SIZE }, ...snake]
    case 'x++':
      return [{ x: head.x + cfg.TILE_SIZE, y: head.y }, ...snake]
    case 'y++':
      return [{ x: head.x, y: head.y + cfg.TILE_SIZE }, ...snake]
  }
}

function dropTail(snake) {
  return snake.slice(0, -1)
}

function changeDirection(newDirection) {
  const cachedDirection = getModel().cached_direction

  newDirection[0] !== cachedDirection[0] && updateModel('direction', newDirection)
}

export { growHead, changeDirection, restartGame, startGame, tick, pauseGame, resumeGame }
