declare type MinMax = {
    MIN: number;
    MAX: number;
} | {
    min: number;
    max: number;
};
export declare const lerp: (minMax: MinMax, time: number) => number;
export declare const lerpInt: (minMax: MinMax, time: number) => number;
export {};
