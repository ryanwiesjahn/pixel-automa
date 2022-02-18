import { Bot, CellType } from './Bot';

export const CELL_SIZE = 8

export class BotDrawer {
  public draw(
    bot: Bot,
    size: { width: number, height: number },
    renderer: CanvasRenderingContext2D,
  ): void {
    const backgroundColor = bot.backgroundColor
    const botColor = bot.botColor
    const botSize = { width: bot.size.width * CELL_SIZE, height: bot.size.height * CELL_SIZE }

    renderer.fillStyle = backgroundColor

    renderer.fillRect(0, 0, size.width, size.height)

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
          (x * CELL_SIZE) + (size.width / 2) - (botSize.width / 2),
          (y * CELL_SIZE) + (size.height / 2) - (botSize.height / 2),
          CELL_SIZE,
          CELL_SIZE,
        )
      }
    }
  }
}
