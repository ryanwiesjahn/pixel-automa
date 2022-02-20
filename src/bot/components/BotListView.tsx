import React from 'react'
import styled from '@emotion/styled'

import { LayoutContainer } from '../../global'

import { Bot } from '../models/Bot'
import { BotCell } from './BotCell'

interface BotListViewProps {
  bots: Bot[]
}

export const BotListView: React.FC<BotListViewProps> = ({ bots }) => {
  const renderBotCells = () => {
    return bots.map((bot) => <BotCell bot={bot} key={bot.seed} />)
  }

  return (
    <LayoutContainer>
      <Grid>
        {!!bots.length && renderBotCells()}
      </Grid>
    </LayoutContainer>
  )
}

const Grid = styled.div({
  // display: 'flex',
  // flexWrap: 'wrap',
  // justifyContent: 'space-between',
  display: 'grid',
  gridTemplateColumns: `1fr 1fr 1fr 1fr`,
  columnGap: 30,
  rowGap: 30,
  paddingTop: 30,
  paddingBottom: 30,
})
