import * as React from 'react'

import useCookie from 'react-use-cookie'

import { translations } from 'gamedata/locales'
import { isLocale, Locale } from 'types'

type LocaleContextData = [
  (key: keyof typeof translations) => string,
  (lang: Locale) => void,
]

const LocaleContext = React.createContext<LocaleContextData>([
  (_) => '',
  () => {},
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

  const switchLanguage = React.useCallback((lang: Locale): void => {
    setLocaleCookie(lang)
  }, [setLocaleCookie])

  return (
    <LocaleContext.Provider value={[getTranslation, switchLanguage]}>
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
