import React from 'react'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import { theme } from '../theme/theme'

export const Loader: React.FC = () => (
  <View />
)

const animation = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`

const View = styled.div({
  width: 48,
  height: 48,
  display: 'inline-block',
  position: 'relative',

  ['&::after, &::before']: {
    content: '""',  
    boxSizing: 'border-box',
    width: 48,
    height: 48,
    borderRadius: '50%',
    border: `2px solid ${theme.color.brand.primary}`,
    position: 'absolute',
    left: 0,
    top: 0,
    animation: `${animation} 2s linear infinite`,
  },

  ['&::after']: {
    animationDelay: '1s',
  },
})
