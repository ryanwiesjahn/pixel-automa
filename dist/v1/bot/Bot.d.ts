declare enum Algorithm {
    Perlin = "perlin",
    Simplex = "simplex"
}
export declare enum BackgroundDirection {
    TopLeft = "TopLeft",
    Top = "Top",
    TopRight = "TopRight",
    Right = "Right",
    BottomRight = "BottomRight",
    Bottom = "Bottom",
    BottomLeft = "BottomLeft",
    Left = "Left"
}
export declare enum CellType {
    Live = 0,
    Border = 1,
    Dead = 2
}
export declare const BOT_SIZE: {
    MIN: number;
    MAX: number;
};
export declare class Bot {
    readonly seed: string;
    private readonly simplexNoise;
    private readonly random;
    private readonly algorithm;
    private readonly asInverse;
    private grid;
    private readonly randomValues;
    private drawer;
    private markov;
    constructor(seed?: string, algorithm?: Algorithm, asInverse?: boolean);
    private instantiate;
    private generateGrid;
    private iterateCells;
    private addFlippedHalf;
    private getLiveNeighborCount;
    private getSimplexNoise;
    private getPerlinNoise;
    private isCellLive;
    getCellType(x: number, y: number): CellType;
    getImageDataURL(size?: {
        width: number;
        height: number;
    }, cellSize?: number): Promise<string>;
    get botColor(): {
        fill: string;
        outline: string;
    };
    get backgroundColors(): string[];
    get backgroundDirection(): BackgroundDirection;
    get size(): {
        width: number;
        height: number;
    };
    get halfSize(): number;
    get name(): string;
    get directive(): string;
    get version(): number;
}
export {};
