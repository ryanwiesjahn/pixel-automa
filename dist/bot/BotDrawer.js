"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotDrawer = exports.CELL_SIZE = void 0;
const utils_1 = require("../utils");
const Bot_1 = require("./Bot");
exports.CELL_SIZE = 8;
class BotDrawer {
    draw(bot, size, renderer, cellSize = exports.CELL_SIZE) {
        this.drawBackground(bot, size, renderer);
        this.drawBot(bot, size, cellSize, renderer);
    }
    drawBot(bot, size, cellSize, renderer) {
        const botColor = bot.botColor;
        const botSize = { width: bot.size.width * cellSize, height: bot.size.height * cellSize };
        for (let y = -1; y <= bot.size.height; y++) {
            for (let x = -1; x <= bot.size.width; x++) {
                const cellType = bot.getCellType(x, y);
                if (cellType === Bot_1.CellType.Dead) {
                    continue;
                }
                else if (cellType === Bot_1.CellType.Live) {
                    renderer.fillStyle = botColor.fill;
                }
                else if (cellType === Bot_1.CellType.Border) {
                    renderer.fillStyle = botColor.outline;
                }
                renderer.fillRect((x * cellSize) + (size.width / 2) - (botSize.width / 2), (y * cellSize) + (size.height / 2) - (botSize.height / 2), cellSize, cellSize);
            }
        }
    }
    drawBackground(bot, size, renderer) {
        const gradient = {
            [Bot_1.BackgroundDirection.TopLeft]: renderer.createLinearGradient(0, 0, size.width, size.height),
            [Bot_1.BackgroundDirection.Top]: renderer.createLinearGradient(size.width / 2, 0, size.width / 2, size.height),
            [Bot_1.BackgroundDirection.TopRight]: renderer.createLinearGradient(size.width, 0, 0, size.height),
            [Bot_1.BackgroundDirection.Right]: renderer.createLinearGradient(size.width, size.height / 2, 0, size.height / 2),
            [Bot_1.BackgroundDirection.BottomRight]: renderer.createLinearGradient(size.width, size.height, 0, 0),
            [Bot_1.BackgroundDirection.Bottom]: renderer.createLinearGradient(size.width / 2, size.height, size.width / 2, 0),
            [Bot_1.BackgroundDirection.BottomLeft]: renderer.createLinearGradient(0, size.height, size.width, 0),
            [Bot_1.BackgroundDirection.Left]: renderer.createLinearGradient(0, size.height / 2, size.width, size.height / 2),
        }[bot.backgroundDirection];
        for (let i = 0; i < bot.backgroundColors.length; i++) {
            const color = bot.backgroundColors[i];
            gradient.addColorStop((0, utils_1.lerpInt)({ min: 0, max: bot.backgroundColors.length - 1 }, i), color);
        }
        renderer.fillStyle = gradient;
        renderer.fillRect(0, 0, size.width, size.height);
    }
}
exports.BotDrawer = BotDrawer;
