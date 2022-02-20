import { createContext } from 'react'

import { Bot } from '../../bot'

interface AppContextValue {
  bots: Bot[]
  onRebuildBots: () => void
}

export const AppContext = createContext<AppContextValue>({
  bots: [],
  onRebuildBots: () => {},
});
