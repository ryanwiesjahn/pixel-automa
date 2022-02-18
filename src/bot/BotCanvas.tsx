import React, { useCallback, useEffect, useRef } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import styled from '@emotion/styled'

import { Bot } from './Bot'
import { BotDrawer } from './BotDrawer'

interface CanvasProps {
  bot: Bot
}

export const BotCanvas: React.FC<CanvasProps> = ({ bot }) => {
  const botDrawer = useRef<BotDrawer>(new BotDrawer()).current
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { width, height } = useResizeDetector({ targetRef: canvasRef })

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    botDrawer.draw(bot, { width: context.canvas.width, height: context.canvas.height }, context)
  }, [bot, botDrawer])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (width) canvas.width = width
    if (height) canvas.height = height

    draw()
  }, [width, height, canvasRef, botDrawer, draw])

  return (
    <Canvas ref={canvasRef} />
  )
}

const Canvas = styled.canvas({
  width: '100%',
  height: '100%',
})
