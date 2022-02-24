import { createCanvas } from 'canvas'

import { lerpInt } from '../utils'

import { Bot, CellType, BackgroundDirection } from './Bot'

export const DEFAULT_BOT_CELL_SIZE = 8

export class BotDrawer {
  constructor(private readonly bot: Bot) {}

  public drawToDataURL(
    size: { width: number, height: number },
    cellSize = DEFAULT_BOT_CELL_SIZE,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const canvas = createCanvas(size.width, size.height)
        const context = canvas.getContext('2d')

        this.drawBackground(this.bot, size, context)
        this.drawBot(this.bot, size, cellSize, context)

        resolve(canvas.toDataURL())
      } catch (e) {
        reject(e)
      }
    })
  }

  private drawBot(
    bot: Bot,
    size: { width: number, height: number },
    cellSize: number,
    renderer: CanvasRenderingContext2D,
  ): void {
    const botColor = bot.botColor
    const botSize = { width: bot.size.width * cellSize, height: bot.size.height * cellSize }

    for (let y = -1; y <= bot.size.height; y++) {
      for (let x = -1; x <= bot.size.width; x++) {
        const cellType = bot.getCellType(x, y)

        if (cellType === CellType.Dead) {
          continue
        } else if (cellType === CellType.Live) {
          renderer.fillStyle = botColor.fill
        } else if (cellType === CellType.Border) {
          renderer.fillStyle = botColor.outline
        }

        renderer.fillRect(
          (x * cellSize) + (size.width / 2) - (botSize.width / 2),
          (y * cellSize) + (size.height / 2) - (botSize.height / 2),
          cellSize,
          cellSize,
        )
      }
    }
  }

  private drawBackground(
    bot: Bot,
    size: { width: number, height: number },
    renderer: CanvasRenderingContext2D,
  ): void {
    const gradient = {
      [BackgroundDirection.TopLeft]: renderer.createLinearGradient(0, 0, size.width, size.height),
      [BackgroundDirection.Top]: renderer.createLinearGradient(size.width / 2, 0, size.width / 2, size.height),
      [BackgroundDirection.TopRight]: renderer.createLinearGradient(size.width, 0, 0, size.height),
      [BackgroundDirection.Right]: renderer.createLinearGradient(size.width, size.height / 2, 0, size.height / 2),
      [BackgroundDirection.BottomRight]: renderer.createLinearGradient(size.width, size.height, 0, 0),
      [BackgroundDirection.Bottom]: renderer.createLinearGradient(size.width / 2, size.height, size.width / 2, 0),
      [BackgroundDirection.BottomLeft]: renderer.createLinearGradient(0, size.height, size.width, 0),
      [BackgroundDirection.Left]: renderer.createLinearGradient(0, size.height / 2, size.width, size.height / 2),
    }[bot.backgroundDirection]

    for (let i = 0; i < bot.backgroundColors.length; i++) {
      const color = bot.backgroundColors[i]
      gradient.addColorStop(lerpInt({ min: 0, max: bot.backgroundColors.length - 1 }, i), color)
    }
    
    renderer.fillStyle = gradient

    renderer.fillRect(0, 0, size.width, size.height)
  }
}
