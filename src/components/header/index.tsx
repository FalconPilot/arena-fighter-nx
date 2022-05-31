import * as React from 'react'

import { z } from 'zod'

import { useUser } from 'contexts'
import { hasResult } from 'types'
import { API } from 'utils/api'

import { HeaderView } from './view'

export const Header: React.FunctionComponent = () => {
  const [user, loadUser] = useUser()

  const logout = React.useCallback(() => {
    API.post('/api/users/logout', z.unknown())
      .execute()
      .then(loadUser)
      .catch(console.error)
  }, [loadUser])

  return (
    <HeaderView
      isLogged={hasResult(user)}
      canLogout={!user.isLoading}
      logout={logout}
    />
  )
}
