export declare class Random {
    private seed;
    private random;
    constructor(seed: number | string);
    next(): number;
    reset(): void;
}
