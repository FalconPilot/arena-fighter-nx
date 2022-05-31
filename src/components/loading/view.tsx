import * as React from 'react'

import { keyframes, styled } from '@stitches/react'

const spin = keyframes({
  from: {
    transform: 'rotate(0deg)'
  },
  to: {
    transform: 'rotate(360deg)'
  }
})

const Spinner = styled('div', {
  width: '50px',
  height: '50px',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'transparent',
  borderTopColor: '#333',
  borderRadius: '50%',
  animation: `${spin} ease-in-out 1s infinite`,
})

const LoadingContainer = styled('div', {
  padding: '4px',
})

export const LoadingView: React.FunctionComponent = () => {
  return (
    <LoadingContainer>
      <Spinner />
    </LoadingContainer>
  )
}
