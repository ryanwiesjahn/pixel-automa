"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = void 0;
const seedrandom_1 = __importDefault(require("seedrandom"));
class Random {
    constructor(seed) {
        this.seed = seed;
        this.random = (0, seedrandom_1.default)(this.seed.toString());
        this.reset();
    }
    next() {
        return this.random();
    }
    reset() {
        this.random = (0, seedrandom_1.default)(this.seed.toString());
    }
}
exports.Random = Random;
