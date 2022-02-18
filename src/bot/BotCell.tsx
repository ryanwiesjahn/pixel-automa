import React, { useRef } from 'react'
import styled from '@emotion/styled'

import { BotCanvas } from './BotCanvas'
import { Bot } from './Bot'

interface BotCellProps {
  bot: Bot
}

export const BotCell: React.FC<BotCellProps> = ({ bot }) => {
  const viewRef = useRef<HTMLDivElement>(null)

  return (
    <View ref={viewRef}>
      <BotCanvas bot={bot} />
    </View>
  )
}

const View = styled.div({
  height: 240,
  width: 240,
  background: '#333',
  padding: 4,
  margin: 4,
})
