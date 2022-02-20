import React, { useCallback, useState } from 'react'

import { Bot } from '../../bot'

import { AppContext } from './AppContext'
import { AppView } from './AppView'

const generateBots = (): Bot[] => {
  return [
    // new Bot('8906213883896248'),
    // new Bot('2736471483109757'),
    ...[...new Array(4 * 10)].map(() => new Bot()),
  ]
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
