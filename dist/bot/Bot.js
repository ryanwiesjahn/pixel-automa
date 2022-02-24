"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = exports.BOT_SIZE = exports.CellType = exports.BackgroundDirection = void 0;
const asm_noise_1 = __importDefault(require("asm-noise"));
const simplex_noise_1 = __importDefault(require("simplex-noise"));
const color_1 = __importDefault(require("color"));
const utils_1 = require("../utils");
var Algorithm;
(function (Algorithm) {
    Algorithm["Perlin"] = "perlin";
    Algorithm["Simplex"] = "simplex";
})(Algorithm || (Algorithm = {}));
var BackgroundDirection;
(function (BackgroundDirection) {
    BackgroundDirection["TopLeft"] = "TopLeft";
    BackgroundDirection["Top"] = "Top";
    BackgroundDirection["TopRight"] = "TopRight";
    BackgroundDirection["Right"] = "Right";
    BackgroundDirection["BottomRight"] = "BottomRight";
    BackgroundDirection["Bottom"] = "Bottom";
    BackgroundDirection["BottomLeft"] = "BottomLeft";
    BackgroundDirection["Left"] = "Left";
})(BackgroundDirection = exports.BackgroundDirection || (exports.BackgroundDirection = {}));
const CELL_LIVE = true;
const CELL_DEAD = false;
var CellType;
(function (CellType) {
    CellType[CellType["Live"] = 0] = "Live";
    CellType[CellType["Border"] = 1] = "Border";
    CellType[CellType["Dead"] = 2] = "Dead";
})(CellType = exports.CellType || (exports.CellType = {}));
exports.BOT_SIZE = { MIN: 8, MAX: 12 };
const NOISE_IMPACT = { MIN: 0.498, MAX: 0.512 }; // 0.51
const CELL_ITERATIONS = { MIN: 2, MAX: 3 }; // 2
const BACKGROUND_COLOR = {
    S: { MIN: 0.01, MAX: 0.03 },
    V: { MIN: 0.5, MAX: 0.7 },
};
const INVERSE_PROBABILITY = 0.5;
const SIMPLEX_PROBABILITY = 0;
const BACKGROUND_VIBRANT_PROBABILITY = 0.2;
const VERSION = 1;
class Bot {
    constructor(seed = (0, utils_1.lerpInt)({ min: 100000 * (VERSION - 1), max: (100000 * VERSION) - 1 }, Math.random()).toString(), algorithm, asInverse) {
        var _a;
        this.seed = seed;
        this.grid = [];
        if (typeof seed !== 'string') {
            throw new Error('Seed must be a string');
        }
        this.random = new utils_1.Random(seed);
        this.randomValues = {
            noiseSeed: this.random.next() * 10000000000000000,
            size: (0, utils_1.lerpInt)(exports.BOT_SIZE, this.random.next()),
            algorithm: this.random.next() <= SIMPLEX_PROBABILITY ? Algorithm.Simplex : Algorithm.Perlin,
            asInverse: this.random.next() <= INVERSE_PROBABILITY,
            noiseImpact: (0, utils_1.lerp)(NOISE_IMPACT, this.random.next()),
            cellIterations: (0, utils_1.lerpInt)(CELL_ITERATIONS, this.random.next()),
            botColor: {
                r: Math.round(this.random.next() * 255),
                g: Math.round(this.random.next() * 255),
                b: Math.round(this.random.next() * 255),
            },
            backgroundColors: [color_1.default.hsv({
                    h: Math.round(this.random.next() * 255),
                    s: Math.round((0, utils_1.lerp)(BACKGROUND_COLOR.S, this.random.next()) * 255),
                    v: Math.round((0, utils_1.lerp)(BACKGROUND_COLOR.V, this.random.next()) * 255),
                }).hex(), color_1.default.hsv({
                    h: Math.round(this.random.next() * 255),
                    s: Math.round((0, utils_1.lerp)(BACKGROUND_COLOR.S, this.random.next()) * 255),
                    v: Math.round((0, utils_1.lerp)(BACKGROUND_COLOR.V, this.random.next()) * 255),
                }).hex()],
            backgroundDirection: (_a = {
                0: BackgroundDirection.TopLeft,
                1: BackgroundDirection.Top,
                2: BackgroundDirection.TopRight,
                3: BackgroundDirection.Right,
                4: BackgroundDirection.BottomRight,
                5: BackgroundDirection.Bottom,
                6: BackgroundDirection.BottomLeft,
                7: BackgroundDirection.Left,
            }[(0, utils_1.lerpInt)({ min: 0, max: 7 }, this.random.next())]) !== null && _a !== void 0 ? _a : BackgroundDirection.TopLeft,
            isBackgroundVibrant: this.random.next() <= BACKGROUND_VIBRANT_PROBABILITY
        };
        this.simplexNoise = new simplex_noise_1.default(this.randomValues.noiseSeed);
        asm_noise_1.default.config({ algorithm: 'perlin' });
        asm_noise_1.default.seed = this.randomValues.noiseSeed;
        this.algorithm = typeof algorithm !== 'undefined' ? algorithm : this.randomValues.algorithm;
        this.asInverse = typeof asInverse !== 'undefined' ? asInverse : this.randomValues.asInverse;
        this.instantiate();
    }
    instantiate() {
        this.grid = this.generateGrid();
        this.grid = this.iterateCells(this.grid);
        this.grid = this.addFlippedHalf(this.grid);
        return this;
    }
    generateGrid() {
        const grid = [];
        for (let y = 0; y < this.randomValues.size; y++) {
            for (let x = 0; x < this.halfSize; x++) {
                const value = this.algorithm === 'perlin' ? this.getPerlinNoise(x, y) : this.getSimplexNoise(x, y);
                if (!grid[y]) {
                    grid[y] = [];
                }
                grid[y][x] = value < this.randomValues.noiseImpact ? CELL_LIVE : CELL_DEAD;
            }
        }
        return grid;
    }
    iterateCells(oldGrid) {
        let grid = JSON.parse(JSON.stringify(oldGrid));
        for (let i = 0; i < this.randomValues.cellIterations; i++) {
            const newGrid = [];
            for (let y = 0; y < grid.length; y++) {
                for (let x = 0; x < grid[0].length; x++) {
                    if (!newGrid[y]) {
                        newGrid[y] = [];
                    }
                    const value = grid[y][x];
                    const liveNeighborCount = this.getLiveNeighborCount(x, y, grid);
                    if (value === CELL_LIVE) {
                        if (liveNeighborCount >= 2 && liveNeighborCount <= 3) {
                            newGrid[y][x] = CELL_LIVE;
                        }
                        else {
                            newGrid[y][x] = CELL_DEAD;
                        }
                    }
                    else {
                        if (liveNeighborCount <= 1) {
                            newGrid[y][x] = CELL_LIVE;
                        }
                        else {
                            newGrid[y][x] = CELL_DEAD;
                        }
                    }
                }
            }
            grid = JSON.parse(JSON.stringify(newGrid));
        }
        return grid;
    }
    addFlippedHalf(oldGrid) {
        const grid = JSON.parse(JSON.stringify(oldGrid));
        for (let y = 0; y < grid.length; y++) {
            for (let x = this.halfSize; x < this.randomValues.size; x++) {
                grid[y][x] = grid[y][this.randomValues.size - 1 - x];
            }
        }
        return grid;
    }
    getLiveNeighborCount(x, y, grid) {
        let count = 0;
        for (let yi = y - 1; yi <= y + 1; yi++) {
            for (let xi = x - 1; xi <= x + 1; xi++) {
                if (xi < 0 || xi >= this.halfSize || yi < 0 || yi >= this.randomValues.size || (xi === x && yi === y)) {
                    continue;
                }
                if (grid[yi][xi] === CELL_LIVE) {
                    count++;
                }
            }
        }
        return count;
    }
    getSimplexNoise(x, y) {
        // Magic numbers activate!
        let noise = Math.abs(this.simplexNoise.noise2D(x, y));
        noise += 0.2523312331234123;
        noise = Math.min(0.737902161253512, noise);
        noise *= 0.716734897123541235;
        return noise;
    }
    getPerlinNoise(x, y) {
        return (0, asm_noise_1.default)(x, y);
    }
    isCellLive(x, y) {
        if (!this.grid.length || y < 0 || y >= this.grid.length || x < 0 || x >= this.grid[0].length) {
            return false;
        }
        const isLive = !!this.grid[y][x];
        return this.asInverse ? !isLive : isLive;
    }
    getCellType(x, y) {
        if (!this.grid.length) {
            return CellType.Dead;
        }
        if (this.isCellLive(x, y)) {
            return CellType.Live;
        }
        if (this.isCellLive(x - 1, y)
            || this.isCellLive(x + 1, y)
            || this.isCellLive(x, y - 1)
            || this.isCellLive(x, y + 1)) {
            return CellType.Border;
        }
        return CellType.Dead;
    }
    get botColor() {
        const color = color_1.default.rgb(this.randomValues.botColor);
        return {
            fill: color.hex(),
            outline: color.desaturate(0.2).darken(0.4).hex(),
        };
    }
    get backgroundColors() {
        return this.randomValues.isBackgroundVibrant ? [
            color_1.default.rgb(this.randomValues.botColor).rotate(160).hex(),
            color_1.default.rgb(this.randomValues.botColor).rotate(200).hex(),
        ] : this.randomValues.backgroundColors;
    }
    get backgroundDirection() {
        return this.randomValues.backgroundDirection;
    }
    get size() {
        if (!this.grid.length) {
            return { width: 0, height: 0 };
        }
        return {
            height: this.grid.length,
            width: this.grid[0].length,
        };
    }
    get halfSize() {
        return Math.floor(this.randomValues.size / 2);
    }
}
exports.Bot = Bot;
