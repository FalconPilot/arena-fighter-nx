import { checkSession } from 'api/auth'
import * as React from 'react'

import { User } from 'types'

type UserContextData = [
  User | null,
  (user: User | null) => void,
]

const UserContext = React.createContext<UserContextData>([
  null,
  user => {},
])
UserContext.displayName = 'UserContext'

export const UserProvider: React.FC<{
  children: React.ReactNode,
}> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null)

  React.useEffect(() => {
    checkSession().then(setUser)
  }, [])

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = (): UserContextData => {
  const context = React.useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUser must be used withint a UserContext provider')
  }

  return React.useMemo(() => context, [context])
}

export const setUser = (user: User | null): void => {
  UserContext
}
