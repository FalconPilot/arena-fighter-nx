import * as React from 'react'

import { ItemFrame } from 'components/item-frame'
import { Weapon } from 'types'

export const WeaponView: React.FC<{
  weapon: Weapon | null
}> = ({ weapon }) => {
  return (
    <ItemFrame item={weapon} />
  )
}
