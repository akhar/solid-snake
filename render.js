'use strict'

import cfg from './config.js'
import { getModel } from './model.js'

const panel = document.getElementById('panel').getContext('2d')
const stage = document.getElementById('stage').getContext('2d')

function renderFrame() {
  clear.stage()
  clear.score()
  paint()
  printScore()
}

function paint() {
  const model = getModel()
  paintFood(model)
  paintSnake(model)
}

function paintSnake(model) {
  model.snakeL.map((segment, index) => {
    stage.fillStyle = cfg.SHADOW_COLOR
    stage.fillRect(segment.x, segment.y, cfg.TILE_SIZE, cfg.TILE_SIZE)
    stage.fillStyle = cfg.SNAKE_L_COLOR
    stage.fillRect(segment.x - 1, segment.y - 1, cfg.TILE_SIZE - 1, cfg.TILE_SIZE - 1)
    if (index === 0) {
      stage.fillStyle = cfg.SHADOW_COLOR
      stage.fillRect(segment.x + 2, segment.y + 2, cfg.TILE_SIZE - 7, cfg.TILE_SIZE - 7)
    }
  })

  model.snakeR.map((segment, index) => {
    stage.fillStyle = cfg.SHADOW_COLOR
    stage.fillRect(segment.x, segment.y, cfg.TILE_SIZE, cfg.TILE_SIZE)
    stage.fillStyle = cfg.SNAKE_R_COLOR
    stage.fillRect(segment.x - 1, segment.y - 1, cfg.TILE_SIZE - 1, cfg.TILE_SIZE - 1)
    if (index === 0) {
      stage.fillStyle = cfg.SHADOW_COLOR
      stage.fillRect(segment.x + 2, segment.y + 2, cfg.TILE_SIZE - 7, cfg.TILE_SIZE - 7)
    }
  })
}

function paintFood(model) {
  stage.fillStyle = cfg.SHADOW_COLOR
  stage.fillRect(model.food.x, model.food.y, cfg.TILE_SIZE, cfg.TILE_SIZE)
  stage.fillStyle = cfg.FOOD_COLOR
  stage.fillRect(model.food.x - 1, model.food.y - 1, cfg.TILE_SIZE - 1, cfg.TILE_SIZE - 1)
}

function print(text) {
  panel.font = 'bold 24px monospace'
  panel.fillStyle = cfg.FOOD_COLOR
  panel.textBaseline = 'middle'
  panel.textAlign = 'center'
  panel.fillText(text, cfg.PANEL_SIZE_X / 2, cfg.PANEL_SIZE_Y / 2)
}

function printScore() {
  const leftScore = String(getModel().countL)
  const rightScore = String(getModel().countR)
  panel.font = '24px monospace'
  panel.textBaseline = 'middle'
  panel.textAlign = 'center'
  panel.fillStyle = cfg.SNAKE_L_COLOR
  panel.fillText(leftScore, cfg.PANEL_SIZE_Y / 2, cfg.PANEL_SIZE_Y / 2)
  panel.fillStyle = cfg.SNAKE_R_COLOR
  panel.fillText(rightScore, cfg.PANEL_SIZE_X - cfg.PANEL_SIZE_Y / 2, cfg.PANEL_SIZE_Y / 2)
}

const clear = {
  stage() {
    stage.clearRect(0, 0, cfg.SATGE_SIZE * cfg.GRID_SIZE, cfg.SATGE_SIZE * cfg.GRID_SIZE)
  },

  panel() {
    clear.score()
    clear.title()
  },

  score() {
    clear.scoreL()
    clear.scoreR()
  },

  scoreL() {
    panel.clearRect(0, 0, cfg.PANEL_SIZE_Y, cfg.PANEL_SIZE_Y)
  },
  scoreR() {
    panel.clearRect(cfg.PANEL_SIZE_X - cfg.PANEL_SIZE_Y, 0, cfg.PANEL_SIZE_X, cfg.PANEL_SIZE_Y)
  },

  title() {
    panel.clearRect(cfg.PANEL_SIZE_Y, 0, cfg.PANEL_SIZE_X - cfg.PANEL_SIZE_Y * 2, cfg.PANEL_SIZE_Y)
  }
}

export { renderFrame, print, clear }
