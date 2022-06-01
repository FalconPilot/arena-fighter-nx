import { z } from 'zod'
import {
  Character as DBCharacter,
  Weapon as DBWeapon,
  WeaponMaterial as DBWeaponMaterial,
} from '@prisma/client'

import { extractWeapon, WeaponSchema } from './weapon'

export const CharacterSchema = z.object({
  id: z.number().int(),
  firstName: z.string(),
  lastName: z.string(),
  stageName: z.nullable(z.string()),
  weapon: z.nullable(WeaponSchema),
  secondaryWeapon: z.nullable(WeaponSchema),
})

export type Character = z.TypeOf<typeof CharacterSchema>

export const extractCharacter = (src: DBCharacter & {
  weapon: DBWeapon & { material: DBWeaponMaterial } | null,
  secondaryWeapon: DBWeapon & { material: DBWeaponMaterial } | null,
}): Character => ({
  id: src.id,
  firstName: src.firstName,
  lastName: src.lastName,
  stageName: src.stageName,
  weapon: src.weapon && extractWeapon(src.weapon),
  secondaryWeapon: src.secondaryWeapon && extractWeapon(src.secondaryWeapon),
})

export const CharacterPayloadSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  stageName: z.nullable(z.string()),
})

export type CharacterPayload = z.TypeOf<typeof CharacterPayloadSchema>
