
import { z } from 'zod'
import { WeaponMaterial as DBWeaponMaterial } from '@prisma/client'

export const WeaponMaterialSchema = z.object({
  id: z.number().int(),
  nameKey: z.string(),
})

export type WeaponMaterial = z.TypeOf<typeof WeaponMaterialSchema>

export const extractWeaponMaterial = (src: DBWeaponMaterial): WeaponMaterial => ({
  id: src.id,
  nameKey: src.nameKey,
})
