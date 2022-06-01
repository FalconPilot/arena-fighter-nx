import * as React from 'react'

import { styled } from '@stitches/react'

import { AcceptedItemType, ItemFrameProps } from './types'
import { useRefEvent } from 'hooks'

const ItemBox = styled('div', {
  width: '100px',
  height: '100px',
  border: '1px solid #FFF',
  margin: '4px',
  backgroundColor: '#333',
  borderRadius: '4px',
})

export const ItemFrameView = <Item extends AcceptedItemType>({
  item,
  onHover,
  onQuitHover,
}: ItemFrameProps<Item> & {
  onHover: () => void,
  onQuitHover: () => void,
}) => {
  const ref = React.useRef(null)

  // Bind hover-related events
  useRefEvent(ref, 'mouseover', onHover)
  useRefEvent(ref, 'mouseout', onQuitHover)

  return (
    <ItemBox ref={ref}>
      {item && 'ITEM'}
    </ItemBox>
  )
}
