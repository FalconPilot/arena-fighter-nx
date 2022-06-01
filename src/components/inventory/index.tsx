import * as React from 'react'

import { useOverlays } from 'contexts'
import { Character } from 'types'

import { InventoryView } from './view'

export const Inventory: React.FC<{
  character: Character,
}> = ({ character }) => {
  const [{ itemInfo }] = useOverlays()

  return (
    <InventoryView
      character={character}
      itemInfo={itemInfo}
    />
  )
}
