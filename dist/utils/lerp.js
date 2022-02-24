"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lerpInt = exports.lerp = void 0;
const lerp = (minMax, time) => {
    let start;
    let end;
    if (isLowerCaseKeys(minMax)) {
        start = minMax.min;
        end = minMax.max;
    }
    else {
        start = minMax.MIN;
        end = minMax.MAX;
    }
    time = Math.min(1, Math.max(0, time));
    return (1 - time) * start + time * end;
};
exports.lerp = lerp;
const lerpInt = (minMax, time) => {
    return Math.round((0, exports.lerp)(minMax, time));
};
exports.lerpInt = lerpInt;
const isLowerCaseKeys = (minMax) => {
    return !!minMax
        && 'min' in minMax
        && 'max' in minMax;
};
