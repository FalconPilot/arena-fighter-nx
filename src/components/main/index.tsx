import * as React from 'react'

import { useUser } from 'contexts'
import { hasResult } from 'types'

import { MainView } from './view'

export const Main: React.FunctionComponent = () => {
  const [user] = useUser()

  const isLogged = React.useMemo(() => (
    hasResult(user)
  ), [user])

  return (
    <MainView
      isLoading={user.isLoading}
      isLogged={isLogged}
    />
  )
}
