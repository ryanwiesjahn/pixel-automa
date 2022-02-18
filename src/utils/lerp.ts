type MinMax = {
  MIN: number
  MAX: number
} | {
  min: number
  max: number
}

export const lerp = (minMax: MinMax, time: number): number => {
  let start: number
  let end: number

  if (isLowerCaseKeys(minMax)) {
    start = minMax.min
    end = minMax.max
  } else {
    start = minMax.MIN
    end = minMax.MAX
  }

  time = Math.min(1, Math.max(0, time))
  return (1 - time) * start + time * end
}

export const lerpInt = (minMax: MinMax, time: number): number => {
  return Math.round(lerp(minMax, time))
}

const isLowerCaseKeys = (minMax: MinMax): minMax is { min: number, max: number } => {
  return !!minMax
    && 'min' in minMax
    && 'max' in minMax
}
