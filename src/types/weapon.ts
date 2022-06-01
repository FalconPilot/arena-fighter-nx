import { z } from 'zod'

import {
  Weapon as DBWeapon,
  WeaponMaterial as DBWeaponMaterial
} from '@prisma/client'

import { extractWeaponMaterial, WeaponMaterialSchema } from './weaponMaterial'

export const WeaponSchema = z.object({
  id: z.number().int(),
  nameKey: z.string(),
  material: WeaponMaterialSchema,
  range: z.number(),
  slashDamage: z.number(),
  bluntDamage: z.number(),
  pierceDamage: z.number(),
  flameDamage: z.number(),
  thunderDamage: z.number(),
  darkDamage: z.number(),
  arcaneDamage: z.number(),
}).transform(weapon => ({
  ...weapon,
  __brand: 'weapon' as const,
}))

export type Weapon = z.TypeOf<typeof WeaponSchema>

export const extractWeapon = (src: DBWeapon & {
  material: DBWeaponMaterial,
}): Weapon => ({
  __brand: 'weapon',
  id: src.id,
  nameKey: src.nameKey,
  range: src.range,
  material: extractWeaponMaterial(src.material),
  slashDamage: src.slashDamage,
  bluntDamage: src.bluntDamage,
  pierceDamage: src.pierceDamage,
  flameDamage: src.flameDamage,
  thunderDamage: src.thunderDamage,
  darkDamage: src.darkDamage,
  arcaneDamage: src.arcaneDamage,
})
