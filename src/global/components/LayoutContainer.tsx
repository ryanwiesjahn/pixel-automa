import React from 'react'
import styled from '@emotion/styled'

interface LayoutContainerProps {
  className?: string
}

export const LayoutContainer: React.FC<LayoutContainerProps> = ({ className, children }) => (
  <OuterView>
    <InnerView className={className}>
      {children}
    </InnerView>
  </OuterView>
)

const OuterView = styled.div({
  display: 'flex',
  justifyContent: 'center',
})

const InnerView = styled.div({
  width: 1600,
})
