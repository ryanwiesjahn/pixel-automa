import { Bot } from './Bot';
export declare const DEFAULT_BOT_CELL_SIZE = 8;
export declare class BotDrawer {
    private readonly bot;
    constructor(bot: Bot);
    drawToDataURL(size: {
        width: number;
        height: number;
    }, cellSize?: number): Promise<string>;
    private drawBot;
    private drawBackground;
}
