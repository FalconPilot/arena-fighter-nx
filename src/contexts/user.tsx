import * as React from 'react'

import { checkSession } from 'api/auth'
import { useLoadingState } from 'hooks'
import { LoadingState, User } from 'types'

type UserContextData = [
  LoadingState<User>,
  () => void,
]

const UserContext = React.createContext<UserContextData>([
  {
    result: null,
    isLoading: true,
  },
  () => {},
])
UserContext.displayName = 'UserContext'

export const UserProvider: React.FC<{
  children: React.ReactNode,
}> = ({ children }) => {
  const [user, userFunctions] = useLoadingState<User>({ isLoading: true })

  const loadUser = React.useCallback(() => {
    userFunctions.startLoading()

    checkSession()
      .then(userFunctions.finishLoading)
      .catch(userFunctions.handleError)
  }, [userFunctions])

  React.useEffect(() => {
    loadUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <UserContext.Provider value={[user, loadUser]}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = (): UserContextData => {
  const context = React.useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUser must be used within a UserContext provider')
  }

  return React.useMemo(() => context, [context])
}
