import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'

import { Loader } from '../../global'

import { Bot } from '../models/Bot'
import { BotDrawer } from '../models/BotDrawer'

const IMAGE_SIZE = 1000

interface CanvasProps {
  bot: Bot
  className?: string
}

export const BotCanvas: React.FC<CanvasProps> = ({ bot, className }) => {
  const botDrawer = useRef<BotDrawer>(new BotDrawer()).current
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imageSrc, setImageSrc] = useState<string>()

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    let image: string | undefined = undefined
    if (canvas && context) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height)
      botDrawer.draw(bot, { width: context.canvas.width, height: context.canvas.height }, context, 20)
      image = canvas.toDataURL('image/png', 1)
    }

    setImageSrc(image)
  }, [bot, botDrawer, setImageSrc])

  return (
    <View>
      {!imageSrc && <Canvas className={className} ref={canvasRef} width={IMAGE_SIZE} height={IMAGE_SIZE} />}
      <InnerView>
        <Loader />
        <Image isLoaded={!!imageSrc} src={imageSrc} alt={bot.seed} />
      </InnerView>
    </View>
  )
}

const View = styled.div({
  width: '100%',
  height: 0,
  paddingTop: '100%',
  overflow: 'hidden',
  position: 'relative',
})

const InnerView = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  height: '100%',
  width: '100%',
  top: 0,
  left: 0,
})

const Canvas = styled.canvas({
  position: 'absolute',
  height: IMAGE_SIZE,
  width: IMAGE_SIZE,
  visibility: 'hidden',
})

const Image = styled.img<{
  isLoaded: boolean
}>(({ isLoaded }) => ({
  objectFit: 'contain',
  position: 'absolute',
  height: '100%',
  width: '100%',
  top: 0,
  left: 0,
  transition: `opacity 0.5s ease 0s`,
  opacity: isLoaded ? 1 : 0,
  visibility: isLoaded ? 'initial' : 'hidden',
}))
