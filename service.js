'use strict'

import { startClock, stopClock } from './clock.service.js'
import cfg from './config.js'
import { initController, initModel } from './init.service.js'
import { getModel, resetModel, updateModel } from './model.js'
import { clear, print, renderFrame } from './render.js'
import _ from './utils.js'

function startGame() {
  initModel()
  initController()
  startClock()
}

function restartGame() {
  resetModel()
  clear.panel()
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
  clear.title()
  startClock()
}

function finishGame() {
  stopClock()
  updateModel('isGameOver', true)
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
  updateModel('cached_directionL', getModel().directionL)
  updateModel('cached_directionR', getModel().directionR)
}

function makeStep() {
  const model = getModel()

  const newSnakeL = model.hasAteL
    ? growHead(model.snakeL, model.directionL)
    : dropTail(growHead(model.snakeL, model.directionL))

  model.hasAteL && updateModel('hasAteL', false)
  updateModel('snakeL', newSnakeL)

  const newSnakeR = model.hasAteR
    ? growHead(model.snakeR, model.directionR)
    : dropTail(growHead(model.snakeR, model.directionR))

  model.hasAteR && updateModel('hasAteR', false)
  updateModel('snakeR', newSnakeR)
}

function checkConditions() {
  const model = getModel()

  const headL = model.snakeL[0]
  const tailL = model.snakeL.slice(1)
  const directionL = model.directionL
  const nextTaleL = growHead([headL], directionL)[0]
  const headR = model.snakeR[0]
  const tailR = model.snakeR.slice(1)
  const directionR = model.directionR
  const nextTaleR = growHead([headR], directionR)[0]

  if (_.isCoodrsEqual(headL, model.food)) {
    eating(model.countL, model.snakeL, directionL, 'LEFT')
  }
  if (_.isCoodrsEqual(headR, model.food)) {
    eating(model.countR, model.snakeR, directionR, 'RIGHT')
  }

  let cannibalism = false
  tailL.forEach(segment => {
    if (_.isCoodrsEqual(nextTaleL, segment)) {
      cannibalism = true
    }
  })
  tailR.forEach(segment => {
    if (_.isCoodrsEqual(nextTaleR, segment)) {
      cannibalism = true
    }
  })

  if (cannibalism) {
    finishGame()
    return Promise.reject('Cannibalism')
  } else if (
    (headL.x === 0 && directionL === 'x--') ||
    (headR.x === 0 && directionR === 'x--') ||
    (headL.y === 0 && directionL === 'y--') ||
    (headR.y === 0 && directionR === 'y--') ||
    (headL.x === cfg.SATGE_SIZE * cfg.GRID_SIZE - cfg.GRID_SIZE && directionL === 'x++') ||
    (headR.x === cfg.SATGE_SIZE * cfg.GRID_SIZE - cfg.GRID_SIZE && directionR === 'x++') ||
    (headL.y === cfg.SATGE_SIZE * cfg.GRID_SIZE - cfg.GRID_SIZE && directionL === 'y++') ||
    (headR.y === cfg.SATGE_SIZE * cfg.GRID_SIZE - cfg.GRID_SIZE && directionR === 'y++')
  ) {
    finishGame()
    return Promise.reject('Border hit')
  } else {
    return Promise.resolve()
  }
}

function eating(count, snake, direction, player) {
  if (player === 'LEFT') {
    updateModel('hasAteL', true)
    updateModel('countL', ++count)
    growHead(snake, direction)
  } else {
    updateModel('hasAteR', true)
    updateModel('countR', ++count)
    growHead(snake, direction)
  }
  palceFood()
}

function palceFood() {
  const model = getModel()
  updateModel('food', _.getFoodCoords(model))
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

function changeDirectionL(newDirection) {
  const cachedDirection = getModel().cached_directionL

  newDirection[0] !== cachedDirection[0] && updateModel('directionL', newDirection)
}

function changeDirectionR(newDirection) {
  const cachedDirection = getModel().cached_directionR

  newDirection[0] !== cachedDirection[0] && updateModel('directionR', newDirection)
}

export {
  growHead,
  changeDirectionL,
  changeDirectionR,
  restartGame,
  startGame,
  tick,
  pauseGame,
  resumeGame
}
