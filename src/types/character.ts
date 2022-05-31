import { z } from 'zod'
import {
  Character as DBCharacter,
  Weapon as DBWeapon,
} from '@prisma/client'
import { WeaponCodec } from './weapon'

export const CharacterCodec = z.object({
  id: z.number().int(),
  firstName: z.string(),
  lastName: z.string(),
  stageName: z.nullable(z.string()),
  weapon: z.nullable(WeaponCodec),
  secondaryWeapon: z.nullable(WeaponCodec),
})

export type Character = z.TypeOf<typeof CharacterCodec>

export const extractCharacter = (src: DBCharacter & {
  weapon: DBWeapon | null,
  secondaryWeapon: DBWeapon | null,
}): Character => ({
  id: src.id,
  firstName: src.firstName,
  lastName: src.lastName,
  stageName: src.stageName,
  weapon: src.weapon,
  secondaryWeapon: src.secondaryWeapon,
})

export const CharacterPayloadCodec = z.object({
  firstName: z.string(),
  lastName: z.string(),
  stageName: z.nullable(z.string()),
})

export type CharacterPayload = z.TypeOf<typeof CharacterPayloadCodec>
