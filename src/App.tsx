import React from 'react'
import styled from '@emotion/styled'

import { Bot, BotCell } from './bot'

const bots = [...new Array(6 * 50)].map(() => new Bot())

export const App: React.FC = () => {
  const renderBotCells = () => (
    bots.map((bot) => <BotCell bot={bot} key={bot.seed} />)
  )

  return (
    <View>
      <Grid>
        {renderBotCells()}
      </Grid>
    </View>
  )
}

const View = styled.div({
  
})

const Grid = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
})
