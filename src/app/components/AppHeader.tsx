/* eslint-disable no-useless-computed-key */

import React, { useContext } from 'react'
import styled from '@emotion/styled'

import {
  LayoutContainer as _LayoutContainer,
  Button,
  theme,
} from '../../global'
import { AppContext } from '.'

export const AppHeader: React.FC = () => {
  const { onRebuildBots } = useContext(AppContext)

  return (
    <View>
      <LayoutContainer>
        <Logo>Pixel Bots</Logo>
        <div>
          <Button onClick={onRebuildBots}>Rebuild Bots</Button>
          <Button onClick={onRebuildBots} isLoading>Send It!</Button>
        </div>
      </LayoutContainer>
    </View>
  )
}

const View = styled.div({
  background: theme.color.background.primary,
  boxShadow: `0px 0px 8px 0px ${theme.color.layout.shadow}`,
  padding: 18,
  position: 'sticky',
  top: 0,
  zIndex: 10,
})

const LayoutContainer = styled(_LayoutContainer)({
  display: 'flex',
  justifyContent: 'space-between',
})

const Logo = styled.span({
  fontWeight: 900,
  fontSize: '1.7rem',
  color: theme.color.brand.primaryTweak,
  display: 'flex',
  alignItems: 'center',
})
