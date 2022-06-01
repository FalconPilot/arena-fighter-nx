import { Weapon } from 'types'

export type AcceptedItemType =
  | Weapon

export interface ItemFrameProps<Item extends AcceptedItemType> {
  item: Item | null,
}
