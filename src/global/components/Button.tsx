import React from 'react'
import styled from '@emotion/styled'

import { theme } from '../theme/theme'

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
}) => (
  <View
    children={children}
    onClick={onClick}
    className={className}
  />
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
  transition: `
    background-color 0.11s ease-out,
    margin-top 0.11s ease-out,
    margin-bottom 0.11s ease-out,
    box-shadow 0.11s ease-out
  `,

  ['&:hover']: {
    boxShadow: `0px 2px 3px 0px ${theme.color.layout.shadowLess}`,
    marginTop: -2,
    marginBottom: 2,
    cursor: 'pointer',
  },

  ['&:active']: {
    background: theme.color.background.secondary,
    boxShadow: `0px 1px 2px 0px ${theme.color.layout.shadowLess}`,
    marginTop: -1,
    marginBottom: 1,
    cursor: 'pointer',
    transition: `
      background-color 0s,
      margin-top 0s,
      margin-bottom 0s,
      box-shadow 0s
    `,
  }
})
