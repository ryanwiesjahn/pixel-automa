/* eslint-disable no-useless-computed-key */

import React from 'react'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/react'
import { Routes, Route } from 'react-router-dom'

import { theme } from '../../global'
import { BotListPage } from '../../bot'

import { AppHeader } from './AppHeader'

// import '@fontsource/poppins'
import 'normalize.css'

export const AppView: React.FC = () => {
  return (
    <>
    <Global styles={globalStyles} />
    <View>
      <AppHeader />
      <Routes>
        <Route path='/' element={<BotListPage />} />
      </Routes>
    </View>
    </>
  )
}

const View = styled.div({
  
})

const globalStyles = css({
  ['*']: {
    boxSizing: 'border-box',
  },
  
  body: {
    background: theme.color.background.primary,
    fontFamily: theme.font.body,
    fontSize: 14,
    color: theme.color.text.primary,
  },

  a: {
    ['&']: {
      color: theme.color.brand.primary,
      textDecoration: 'none',
    },

    ['&:active']: {
      color: theme.color.brand.primaryTweak,
    },

    ['&:hover']: {
      color: theme.color.brand.primaryTweak,
    },
  },

  'h1, h2, h3, h4, h5': {
    display: 'flex',
    alignItems: 'center',
  },
})
