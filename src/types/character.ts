import { z } from 'zod'
import { Character as DBCharacter } from '@prisma/client'

// export const UserCodec = z.object({
//   id: z.number().int(),
//   createdAt: z.date(),
//   name: z.string(),
//   email: z.string().email(),
// })

// export type User = z.TypeOf<typeof UserCodec>

// export const UserPayloadCodec = z.object({
//   name: z.string(),
//   email: z.string().email(),
//   password: z.string().min(8),
//   passwordCheck: z.string(),
// })
//   .refine(user => user.password === user.passwordCheck)
//   .transform(({ passwordCheck, ...user }) => ({ ...user }))

// export type UserPayload = z.TypeOf<typeof UserPayloadCodec>

// export const extractUser = (src: DBUser): User => ({
//   id: src.id,
//   createdAt: src.createdAt,
//   name: src.name,
//   email: src.email,
// })

// export const LoginPayloadCodec = z.object({
//   email: z.string().email(),
//   password: z.string(),
// })

// export type LoginPayload = z.TypeOf<typeof LoginPayloadCodec>

export const CharacterCodec = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  firstName: z.string(),
  lastName: z.string(),
  stageName: z.nullable(z.string()),
})

export type Character = z.TypeOf<typeof CharacterCodec>

export const extractCharacter = (src: DBCharacter): Character => ({
  id: src.id,
  createdAt: src.createdAt,
  firstName: src.firstName,
  lastName: src.lastName,
  stageName: src.stageName,
})
