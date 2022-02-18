import asmNoise from 'asm-noise'
import SimplexNoise from 'simplex-noise'
import Color from 'color'

import { lerp, lerpInt, Random } from '../utils'

type Grid = boolean[][]
type Algorithm = 'perlin' | 'simplex'

const CELL_LIVE = true
const CELL_DEAD = false

export enum CellType {
  Live,
  Border,
  Dead,
}

interface RandomValues {
  noiseSeed: number
  size: number
  algorithm: Algorithm
  asInverse: boolean
  noiseImpact: number
  cellIterations: number
  botColor: {
    r: number
    g: number
    b: number
  },
  backgroundColor: {
    h: number
    s: number
    v: number
  }
}

export const BOT_SIZE = { MIN: 8, MAX: 12 }

const NOISE_IMPACT = { MIN: 0.498, MAX: 0.512 } // 0.51
const CELL_ITERATIONS = { MIN: 2, MAX: 3 }  // 2

const BACKGROUND_COLOR = {
  S: { MIN: 0.01, MAX: 0.03 },
  V: { MIN: 0.5, MAX: 0.7 },
}

const INVERSE_PROBABILITY = 0.5
const SIMPLEX_PROBABILITY = 0

export class Bot {
  private readonly simplexNoise: SimplexNoise
  private readonly random: Random

  private readonly algorithm: Algorithm
  private readonly asInverse: boolean

  private grid: Grid = []
  private readonly randomValues: RandomValues

  constructor(
    public readonly seed: string = (Math.random() * 10000000000000000).toString(),
    algorithm?: Algorithm,
    asInverse?: boolean,
  ) {
    if (typeof seed !== 'string') {
      throw new Error('Seed must be a string')
    }

    console.info(`Seed: ${seed}`)

    this.random = new Random(seed)
    this.randomValues = {
      noiseSeed: this.random.next() * 10000000000000000,
      size: lerpInt(BOT_SIZE, this.random.next()),
      algorithm: this.random.next() <= SIMPLEX_PROBABILITY ? 'simplex' : 'perlin',
      asInverse: this.random.next() <= INVERSE_PROBABILITY,
      noiseImpact: lerp(NOISE_IMPACT, this.random.next()),
      cellIterations: lerpInt(CELL_ITERATIONS, this.random.next()),
      botColor: {
        r: Math.round(this.random.next() * 255),
        g: Math.round(this.random.next() * 255),
        b: Math.round(this.random.next() * 255),
      },
      backgroundColor: {
        h: Math.round(this.random.next() * 255), 
        s: Math.round(lerp(BACKGROUND_COLOR.S, this.random.next()) * 255),
        v: Math.round(lerp(BACKGROUND_COLOR.V, this.random.next()) * 255),
      }
    }

    this.simplexNoise = new SimplexNoise(this.randomValues.noiseSeed)

    asmNoise.config({ algorithm: 'perlin' })
    asmNoise.seed = this.randomValues.noiseSeed

    this.algorithm = typeof algorithm !== 'undefined' ? algorithm : this.randomValues.algorithm
    this.asInverse = typeof asInverse !== 'undefined' ? asInverse : this.randomValues.asInverse

    this.instantiate()
  }

  private instantiate(): Bot {
    this.grid = this.generateGrid()
    this.grid = this.iterateCells(this.grid)
    this.grid = this.addFlippedHalf(this.grid)

    return this
  }

  private generateGrid(): Grid {
    const grid: Grid = []
    for (let y = 0; y < this.randomValues.size; y++) {
      for (let x = 0; x < this.halfSize; x++) {
        const value = this.algorithm === 'perlin' ? this.getPerlinNoise(x, y) : this.getSimplexNoise(x, y)
  
        if (!grid[y]) {
          grid[y] = []
        }

        grid[y][x] = value < this.randomValues.noiseImpact ? CELL_LIVE : CELL_DEAD
      } 
    }
    return grid
  }

  private iterateCells(oldGrid: Grid): Grid {
    let grid = JSON.parse(JSON.stringify(oldGrid)) as Grid

    for (let i = 0; i < this.randomValues.cellIterations; i++) {
      const newGrid: Grid = []
  
      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
          if (!newGrid[y]) {
            newGrid[y] = []
          }
  
          const value = grid[y][x]
          const liveNeighborCount = this.getLiveNeighborCount(x, y, grid)
          
          if (value === CELL_LIVE) {
            if (liveNeighborCount >= 2 && liveNeighborCount <= 3) {
              newGrid[y][x] = CELL_LIVE
            } else {
              newGrid[y][x] = CELL_DEAD
            }
          } else {
            if (liveNeighborCount <= 1) {
              newGrid[y][x] = CELL_LIVE
            } else { 
              newGrid[y][x] = CELL_DEAD
            }
          }
        } 
      }
  
      grid = JSON.parse(JSON.stringify(newGrid))
    }

    return grid
  }

  private addFlippedHalf(oldGrid: Grid): Grid {
    const grid = JSON.parse(JSON.stringify(oldGrid)) as Grid

    for (let y = 0; y < grid.length; y++) {
      for (let x = this.halfSize; x < this.randomValues.size; x++) {
        grid[y][x] = grid[y][this.randomValues.size - 1 - x]
      } 
    }

    return grid
  }

  private getLiveNeighborCount(x: number, y: number, grid: Grid): number {
    let count = 0
    for (let yi = y - 1; yi <= y + 1; yi++) {
      for (let xi = x - 1; xi <= x + 1; xi++) {
        if (xi < 0 || xi >= this.halfSize || yi < 0 || yi >= this.randomValues.size || (xi === x && yi === y)) {
          continue
        }

        if (grid[yi][xi] === CELL_LIVE) {
          count++
        }
      } 
    }
    return count
  }

  private getSimplexNoise(x: number, y: number): number {
    // Magic numbers activate!
    let noise = Math.abs(this.simplexNoise.noise2D(x, y))
    noise += 0.2523312331234123
    noise = Math.min(0.737902161253512, noise)
    noise *= 0.716734897123541235
    return noise
  }

  private getPerlinNoise(x: number, y: number): number {
    return asmNoise(x, y)
  }

  private isCellLive(x: number, y: number): boolean {
    if (!this.grid.length || y < 0 || y >= this.grid.length || x < 0 || x >= this.grid[0].length) {
      return false
    }

    const isLive = !!this.grid[y][x]
    return this.asInverse ? !isLive : isLive
  }

  public getCellType(x: number, y: number): CellType {
    if (!this.grid.length) {
      return CellType.Dead
    }

    if (this.isCellLive(x, y)) {
      return CellType.Live
    }

    if (
      this.isCellLive(x - 1, y)
      || this.isCellLive(x + 1, y)
      || this.isCellLive(x, y - 1)
      || this.isCellLive(x, y + 1)
    ) {
      return CellType.Border
    }

    return CellType.Dead
  }

  public get botColor(): { fill: string, outline: string } {
    const color = Color.rgb(this.randomValues.botColor)

    return {
      fill: color.hex(),
      outline: color.desaturate(0.2).darken(0.4).hex(),
    }
  }

  public get backgroundColor(): string {
    return Color.hsv(this.randomValues.backgroundColor).hex()
  }

  public get size(): { width: number, height: number } {
    if (!this.grid.length) {
      return { width: 0, height: 0 }
    }

    return {
      height: this.grid.length,
      width: this.grid[0].length,
    }
  }

  public get halfSize(): number {
    return Math.floor(this.randomValues.size / 2)
  }
}
