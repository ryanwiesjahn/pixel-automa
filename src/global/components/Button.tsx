import React from 'react'
import styled from '@emotion/styled'

import { Loader } from './Loader'
import { theme } from '../theme/theme'

interface ButtonProps {
  isLoading?: boolean
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  className,
  onClick,
}) => (
  <View
    onClick={onClick}
    className={className}
  >
    {isLoading ? <Loader size='small' /> : children}
  </View>
)

const View = styled.button({
  background: theme.color.background.primary,
  // border: 'none',
  padding: '12px 16px',
  margin: 0,
  borderRadius: theme.layout.borderRadius,
  border: `1px solid ${theme.color.layout.border}`,
  fontWeight: 600,
  position: 'relative',
  top: 0,
  transition: `
    background-color 0.11s ease-out,
    top 0.11s ease-out,
    box-shadow 0.11s ease-out
  `,

  ['&:hover']: {
    boxShadow: `0px 2px 3px 0px ${theme.color.layout.shadowLess}`,
    top: -2,
    cursor: 'pointer',
  },

  ['&:active']: {
    background: theme.color.background.secondary,
    boxShadow: `0px 1px 2px 0px ${theme.color.layout.shadowLess}`,
    top: -1,
    cursor: 'pointer',
    transition: `
      background-color 0s,
      top 0s,
      box-shadow 0s
    `,
  }
})
