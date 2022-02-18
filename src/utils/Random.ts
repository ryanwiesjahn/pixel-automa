import seedrandom from 'seedrandom'

export class Random {
  private random: seedrandom.PRNG

  constructor(private seed: number | string) {
    this.random = seedrandom(this.seed.toString())

    this.reset()
  }
  
  public next(): number {
    return this.random()
  }

  public reset(): void {
    this.random = seedrandom(this.seed.toString())
  }
}
