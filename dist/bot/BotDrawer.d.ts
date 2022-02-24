import { Bot } from './Bot';
export declare const CELL_SIZE = 8;
export declare class BotDrawer {
    draw(bot: Bot, size: {
        width: number;
        height: number;
    }, renderer: CanvasRenderingContext2D, cellSize?: number): void;
    private drawBot;
    private drawBackground;
}
