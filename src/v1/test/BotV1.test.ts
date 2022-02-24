import crypto from 'crypto'

import { BackgroundDirection, Bot } from '../Bot'

/**
 * Integration tests to validate breaking changes were not made to how bots are generated.
 */

const createHasher = (): crypto.Hmac => {
  return crypto.createHmac('md5', 'secretKey')
}

describe('Bot V1', () => {
  const bot1 = new Bot('test1')
  const bot2 = new Bot('test2')
  const bot3 = new Bot('56') // Vibrant

  it('randomly generates correct seeds', () => {
    for (let i = 0; i < 100; i++) {
      const bot1 = new Bot()
      expect(Number(bot1.seed)).not.toBeNaN()
      expect(Number(bot1.seed)).toBeGreaterThanOrEqual(0)
      expect(Number(bot1.seed)).toBeLessThanOrEqual(99_999)
    }
  })

  it('returns the correct seed', () => {
    expect(bot1.seed).toEqual('test1')
    expect(bot2.seed).toEqual('test2')
    expect(bot3.seed).toEqual('56')
  })

  it('generates the correct name', () => {
    expect(bot1.name).toEqual('[Pixel Automa #test1]')
    expect(bot2.name).toEqual('[Pixel Automa #test2]')
    expect(bot3.name).toEqual('[Pixel Automa #56]')
  })

  it('generates the correct image data URL', async () => {
    expect(createHasher().update(await bot1.getImageDataURL()).digest('hex')).toEqual('30ec64fda84ef044c7a1f65d9c2d9bf2')
    expect(createHasher().update(await bot2.getImageDataURL()).digest('hex')).toEqual('cd271c64d0a9f4ad694ed73fb2814f46')
    expect(createHasher().update(await bot3.getImageDataURL()).digest('hex')).toEqual('1f77ca34fc53e98687c57daf82a59fca')
  })

  it('generates the correct bot color', async () => {
    expect(bot1.botColor).toEqual({ fill: '#F669D7', outline: '#B41F93' })
    expect(bot2.botColor).toEqual({ fill: '#4EE981', outline: '#239749' })
    expect(bot3.botColor).toEqual({ fill: '#27C53A', outline: '#216D2A' })
  })
  
  it('generates the correct background color', async () => {
    expect(bot1.backgroundColors).toEqual([ '#EBF7FF', '#FFF7F2' ])
    expect(bot2.backgroundColors).toEqual([ '#FAFFF5', '#F7FEFF' ])
    expect(bot3.backgroundColors).toEqual([ '#A327C5', '#C5277D' ])
  })

  it('generates the correct background direction', async () => {
    expect(bot1.backgroundDirection).toEqual(BackgroundDirection.BottomRight)
    expect(bot2.backgroundDirection).toEqual(BackgroundDirection.BottomLeft)
    expect(bot3.backgroundDirection).toEqual(BackgroundDirection.TopLeft)
  })

  it('generates the correct directive', async () => {
    expect(bot1.directive).toEqual('Oh, I can be your heart, be your falling star.')
    expect(bot2.directive).toEqual('The satellites have been discussing what the future holds for us all.')
    expect(bot3.directive).toEqual('No more hoping for a new life to the apparatus.')
  })

  it('generates the correct version', async () => {
    expect(bot1.version).toEqual(1)
    expect(bot2.version).toEqual(1)
    expect(bot3.version).toEqual(1)
  })
})
