import * as React from 'react'

import useCookie from 'react-use-cookie'

import { translations } from 'gamedata/locales'
import { isLocale, Locale, Translation } from 'types'
import { noOp } from 'utils/function'

type LocaleContextData = [
  {
    t: (key: keyof typeof translations) => string,
    dt: (key: string) => string,
  },
  (lang: Locale) => void,
]

const LocaleContext = React.createContext<LocaleContextData>([
  {
    t: () => '',
    dt: () => '',
  },
  noOp,
])
LocaleContext.displayName = 'UserContext'

export const LocaleProvider: React.FC<{
  children: React.ReactNode,
}> = ({ children }) => {
  const defaultLang = React.useMemo(() => {
    const lang = typeof window === 'undefined'
      ? 'en'
      : window?.navigator?.language
        ?.split('-')
        ?.[0]

    return isLocale(lang) ? lang : 'en'
  }, [])

  const [localeCookie, setLocaleCookie] = useCookie('locale', defaultLang)

  const locale = React.useMemo(() => (
    isLocale(localeCookie) ? localeCookie : 'en'
  ), [localeCookie])

  const getTranslation = React.useCallback((key: keyof typeof translations): string => (
    translations[key][locale]
  ), [locale])

  const getDynamicTranslation = React.useCallback((key: string): string => (
    (translations as Record<string, Translation>)?.[key]?.[locale] ?? key
  ), [locale])

  const switchLanguage = React.useCallback((lang: Locale): void => {
    setLocaleCookie(lang)
  }, [setLocaleCookie])

  return (
    <LocaleContext.Provider value={[{
      t: getTranslation,
      dt: getDynamicTranslation,
    }, switchLanguage]}>
      {children}
    </LocaleContext.Provider>
  )
}

export const useTranslations = (): LocaleContextData => {
  const context = React.useContext(LocaleContext)

  if (context === undefined) {
    throw new Error('useTranslations must be used within a LocaleContext provider')
  }

  return React.useMemo(() => context, [context])
}
