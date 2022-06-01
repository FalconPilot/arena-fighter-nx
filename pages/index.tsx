import * as React from 'react'

import { styled } from '@stitches/react'

import { Header } from 'components/header'
import { Main } from 'components/main'
import { globalStyles } from 'styles/globals'

import {
  CharactersProvider,
  LocaleProvider,
  OverlaysProvider,
  UserProvider,
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
          <OverlaysProvider>
            {children}
          </OverlaysProvider>
        </CharactersProvider>
      </UserProvider>
    </LocaleProvider>
  )
}

const MainComponent: React.FC = () => {
  globalStyles()

  // This trick is used to disable SSR for the core app
  const [canRender, setRender] = React.useState<boolean>(false)
  React.useEffect(() => {
    setRender(true)
  }, [])

  return !canRender ? null : (
    <AppContainer>
      <Header />
      <Main />
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
