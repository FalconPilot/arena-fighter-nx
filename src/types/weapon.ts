import { z } from 'zod'
import { Weapon as DBWeapon } from '@prisma/client'

export const WeaponCodec = z.object({
  id: z.number().int(),
  nameKey: z.string(),
  material: z.string(),
  range: z.number(),
  slashDamage: z.number(),
  bluntDamage: z.number(),
  pierceDamage: z.number(),
  flameDamage: z.number(),
  thunderDamage: z.number(),
  darkDamage: z.number(),
  arcaneDamage: z.number(),
})

export type Weapon = z.TypeOf<typeof WeaponCodec>

export const extractWeapon = (src: DBWeapon): Weapon => ({
  id: src.id,
  nameKey: src.nameKey,
  range: src.range,
  material: src.material,
  slashDamage: src.slashDamage,
  bluntDamage: src.bluntDamage,
  pierceDamage: src.pierceDamage,
  flameDamage: src.flameDamage,
  thunderDamage: src.thunderDamage,
  darkDamage: src.darkDamage,
  arcaneDamage: src.arcaneDamage,
})
