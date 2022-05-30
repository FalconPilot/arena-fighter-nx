import * as React from 'react'

import { Header } from 'components/header'
import { Main } from 'components/main'
import { UserProvider } from 'contexts'

const MainApp: React.FunctionComponent = () => {
  // This trick is used to disable SSR for the core app
  const [canRender, setRender] = React.useState<boolean>(false)
  React.useEffect(() => {
    setRender(true)
  }, [])

  return !canRender ? null : (
    <UserProvider>
      <Header />
      <Main />
    </UserProvider>
  )
}

export default MainApp
