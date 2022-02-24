import React, { useCallback, useState } from 'react'

import { Bot } from '../../bot'

import { AppContext } from './AppContext'
import { AppView } from './AppView'

const generateBots = (): Bot[] => {
  const amount = 50

  const usedSeeds: string[] = []
  const bots: Bot[] = []

  for (let i = 0; i < amount; i++) {
    let bot: Bot
    let attempts = 0
    while (attempts < 4) {
      attempts++
      bot = new Bot()
      if (!usedSeeds.includes(bot.seed)) {
        bots.push(bot)
        break
      }
    }
  }

  if (bots.length !== amount) {
    throw new Error('Could not create all bots')
  }

  return bots

  // return [
  //   // new Bot('8906213883896248'),
  //   // new Bot('2736471483109757'),
  //   ...[...new Array(100)].map((_, i) => new Bot(i.toString())),
  // ]
}

export const AppContainer: React.FC = () => {
  const [bots, setBots] = useState(generateBots())

  const onRebuildBots = useCallback(() => {
    setBots(generateBots())
  }, [])

  return (
    <AppContext.Provider value={{
      bots,
      onRebuildBots,
    }}>
      <AppView />
    </AppContext.Provider>
  )
}
