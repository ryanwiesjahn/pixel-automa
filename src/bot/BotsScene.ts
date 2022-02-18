export {}

// import Phaser from 'phaser'

// import { Canvas } from '../Canvas'
// import { Bot, BOT_SIZE } from './Bot'
// import { BotDrawer, CELL_SIZE } from './BotDrawer'

// const KEYCODE_R = 82

// const CANVAS_WIDTH = 1900
// const CANVAS_HEIGHT = 1000
// const CANVAS_PADDING_HORIZONTAL = 50
// const CANVAS_PADDING_VERTICAL = 50

// const DRAW_PADDING = 50

// export class BotsScene extends Canvas
// {
//   private graphics: Phaser.GameObjects.Graphics
//   private botDrawer: BotDrawer

//   constructor() {
//     super({
//       width: CANVAS_WIDTH,
//       height: CANVAS_HEIGHT,
//       paddingHorizontal: CANVAS_PADDING_HORIZONTAL,
//       paddingVertical: CANVAS_PADDING_VERTICAL,
//     })
//   }

//   protected create()
//   {
//     super.create()

//     this.setUpRedrawInput()

//     this.graphics = this.add.graphics({ x: 0, y: 0 })
//     this.botDrawer = new BotDrawer(this.graphics)

//     const botSize = CELL_SIZE * (BOT_SIZE.MAX + 2)

//     const bots: Bot[] = []
//     for (let i = 0; i <= 65; i++) {
//       bots.push(new Bot())
//     }

//     const width = Math.floor((CANVAS_WIDTH - DRAW_PADDING) / (botSize + DRAW_PADDING))
//     for (let i = 0; i < bots.length; i++) {
//       const x = i % width
//       const y = Math.floor(i / width)
      
//       const bot = bots[i]
//       this.botDrawer.draw(bot, {
//         x: ((botSize + DRAW_PADDING) * x) + DRAW_PADDING,
//         y: ((botSize + DRAW_PADDING) * y) + DRAW_PADDING,
//       })
//     }
//   }

//   public update(time: number, delta: number) {
    
//   }

//   private setUpRedrawInput(): void {
//     window.onkeypress = (e) => {
//       if (e.keyCode === KEYCODE_R) {
//         this.graphics.clear()
//       }
//     }
//   }
// }
