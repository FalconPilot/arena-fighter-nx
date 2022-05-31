import * as React from 'react'

import { styled } from '@stitches/react'

import { Header } from 'components/header'
import { Main } from 'components/main'
import { Loading } from 'components/loading'
import { Auth } from 'components/auth'
import { globalStyles } from 'styles/globals'
import { hasResult } from 'types'

import {
  CharactersProvider,
  LocaleProvider,
  UserProvider,
  useUser,
} from 'contexts'

const AppContainer = styled('div', {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
})

const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <LocaleProvider>
      <UserProvider>
        <CharactersProvider>
          {children}
        </CharactersProvider>
      </UserProvider>
    </LocaleProvider>
  )
}

const MainComponent: React.FC = () => {
  globalStyles()
  const [user] = useUser()

  // This trick is used to disable SSR for the core app
  const [canRender, setRender] = React.useState<boolean>(false)
  React.useEffect(() => {
    setRender(true)
  }, [])

  const isLogged = React.useMemo(() => (
    hasResult(user)
  ), [user])

  return !canRender ? null : (
    <AppContainer>
      <Header />
      <Loading isLoading={user.isLoading}>
        {isLogged
          ? <Main />
          : <Auth />
        }
      </Loading>
    </AppContainer>
  )
}

const MainApp: React.FC = () => {
  return (
    <Providers>
      <MainComponent />
    </Providers>
  )
}

export default MainApp
