import * as React from 'react'

import { useOverlays } from 'contexts'

import { AcceptedItemType, ItemFrameProps } from './types'
import { ItemFrameView } from './view'

export const ItemFrame = <Item extends AcceptedItemType>({
  item,
}: ItemFrameProps<Item>) => {
  const [{ itemInfo }, { setItemInfoOverlay }] = useOverlays()

  const onHover = React.useCallback(() => {
    if (item) {
      setItemInfoOverlay(item)
    }
  }, [item, setItemInfoOverlay])

  const onQuitHover = React.useCallback(() => {
    if (itemInfo) {
      setItemInfoOverlay(null)
    }
  }, [itemInfo, setItemInfoOverlay])

  return (
    <ItemFrameView
      item={item}
      onHover={onHover}
      onQuitHover={onQuitHover}
    />
  )
}
