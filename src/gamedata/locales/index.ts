import { materialLocales } from './materials'
import { weaponLocales } from './weapons'

export const locales = {
  fr: 'Français',
  en: 'English',
} as const

export const translations = {
  signup: {
    en: 'Create an account',
    fr: 'Créer un compte'
  },
  login: {
    en: 'Log in',
    fr: 'Se connecter'
  },
  logout: {
    en: 'Logout',
    fr: 'Se déconnecter',
  },
  loading: {
    en: 'Loading',
    fr: 'Chargement'
  },
  email: {
    en: 'Email address',
    fr: 'Adresse email',
  },
  password: {
    en: 'Password',
    fr: 'Mot de passe',
  },
  passwordConfirmation: {
    en: 'Password confirmation',
    fr: 'Confirmation du mot de passe',
  },
  username: {
    en: 'Username',
    fr: 'Pseudonyme',
  },
  tooShort: {
    en: 'Too short',
    fr: 'Trop court',
  },
  firstName: {
    en: 'First name',
    fr: 'Prénom',
  },
  lastName: {
    en: 'Last name',
    fr: 'Nom de famille',
  },
  stageName: {
    en: 'Stage name',
    fr: 'Surnom',
  },
  close: {
    en: 'Close',
    fr: 'Fermer',
  },
  material: {
    en: 'Material',
    fr: 'Matériau',
  },
  ...materialLocales,
  ...weaponLocales,
} as const
