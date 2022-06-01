import * as React from 'react'

import { styled } from '@stitches/react'

import { AcceptedItemType } from 'components/item-frame/types'
import { useTranslations } from 'contexts'
import { Character, Weapon } from 'types'

import { WeaponView } from './weapon'

const InventoryRow = styled('div', {
  width: '100%',
  display: 'flex',
})

const ItemsRow = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
})

const ItemInfoZone = styled('div', {
  width: '300px',
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: '2px solid #FFF',
  overflow: 'auto',
  marginLeft: 'auto',
})

const ItemInfoRow = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
})

const Row: React.FC<{
  label: string,
  value: string,
}> = ({ label, value }) => {
  return (
    <ItemInfoRow>
      <label>{label}</label>
      <div>{value}</div>
    </ItemInfoRow>
  )
}

const WeaponInfos: React.FC<{
  weapon: Weapon
}> = ({ weapon }) => {
  const [{ t, dt }] = useTranslations()

  return (
    <>
      <h3>{dt(weapon.nameKey)}</h3>
      <Row label={t('material')} value={dt(weapon.material.nameKey)} />
    </>
  )
}

export const InventoryView: React.FC<{
  character: Character,
  itemInfo: AcceptedItemType | null,
}> = ({ character, itemInfo }) => {

  return (
    <InventoryRow>
      <ItemsRow>
        <WeaponView weapon={character.weapon} />
        <WeaponView weapon={character.secondaryWeapon} />
      </ItemsRow>
      <ItemInfoZone>
        {itemInfo && (
          (itemInfo.__brand === 'weapon' && <WeaponInfos weapon={itemInfo} />)
        )}
      </ItemInfoZone>
    </InventoryRow>
  )
}
