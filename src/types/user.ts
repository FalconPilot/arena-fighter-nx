import { z } from 'zod'
import { User as DBUser } from '@prisma/client'

export const UserSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string().email(),
})

export type User = z.TypeOf<typeof UserSchema>

export const UserPayloadSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  passwordCheck: z.string(),
})
  .refine(user => user.password === user.passwordCheck)
  .transform(({ passwordCheck, ...user }) => ({ ...user }))

export type UserPayload = z.TypeOf<typeof UserPayloadSchema>

export const extractUser = (src: DBUser): User => ({
  id: src.id,
  name: src.name,
  email: src.email,
})

export const LoginPayloadSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type LoginPayload = z.TypeOf<typeof LoginPayloadSchema>
