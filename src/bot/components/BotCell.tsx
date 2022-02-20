import React, { useRef } from 'react'
import styled from '@emotion/styled'

import { theme } from '../../global'

import { Bot } from '../models/Bot'
import { BotCanvas as _BotCanvas } from './BotCanvas'

interface BotCellProps {
  bot: Bot
}

export const BotCell: React.FC<BotCellProps> = ({ bot }) => {
  const viewRef = useRef<HTMLDivElement>(null)

  return (
    <View ref={viewRef}>
      <BotCanvas bot={bot} />
      <Info>
        <Name>Pixel Bot #{bot.seed}</Name>
      </Info>
    </View>
  )
}

const View = styled.div({
  position: 'relative',
  borderRadius: theme.layout.borderRadius,
  overflow: 'hidden',
  boxShadow: `0px 0px 8px 0px ${theme.color.layout.shadowLess}`,
  border: `1px solid ${theme.color.layout.border}`,
})

const BotCanvas = styled(_BotCanvas)({
  margin: 0,
})

const Info = styled.div({
  display: 'flex',
  justifyContent: 'center',
  background: theme.color.background.primary,
  // border: `1px solid ${theme.color.layout.border}`,
  // borderTopWidth: 0,
  margin: 0,
  padding: 12,
})

const Name = styled.span({
  fontWeight: 900,
})
