import React, { useContext } from 'react'

import { AppContext } from '../../app'

import { BotListView } from './BotListView'

export const BotListContainer: React.FC = () => {
  const { bots } = useContext(AppContext)

  return (
    <BotListView
      bots={bots}
    />
  )
}

/**
 * Interesting bots: 
 * 8906213883896248
 * 9617185721141898
 * 4170127736039806
 * 9685586328032214
 * 6619013875231909
 */
