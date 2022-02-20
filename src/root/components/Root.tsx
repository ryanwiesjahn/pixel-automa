import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { AppContainer } from '../../app'

export const Root: React.FC = () => (
  <Router>
    <AppContainer />
  </Router>
)
