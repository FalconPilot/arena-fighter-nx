import { z } from 'zod'

import { locales } from 'gamedata/locales'

export type Locale = keyof typeof locales

export const TranslationSchema: z.Schema<{
  [k in Locale]: string
}> = z.object({
  fr: z.string(),
  en: z.string(),
})

export type Translation = z.TypeOf<typeof TranslationSchema>

export const isLocale = (x: unknown): x is Locale =>
  typeof x === 'string' && Object.keys(locales).includes(x)
