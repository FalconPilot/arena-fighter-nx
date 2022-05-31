import * as React from 'react'

import { styled } from '@stitches/react'

import { useTranslations } from 'contexts'

const HeaderContainer = styled('header', {
  backgroundColor: '#a52f2f'
})

const Title = styled('h1', {
  margin: 0,
  padding: '16px',
})

const HeaderControls = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
})

const HeaderButton = styled('button', {
  margin: '8px',
})

export const HeaderView: React.FC<{
  isLogged: boolean,
  canLogout: boolean,
  logout: () => void,
}> = ({
  isLogged,
  canLogout,
  logout,
}) => {
  const [t, switchLanguage] = useTranslations()

  return (
    <HeaderContainer>
      <Title>Arena Fighter NX</Title>
      <HeaderControls>
        <HeaderButton onClick={() => { switchLanguage('en') }}>EN</HeaderButton>
        <HeaderButton onClick={() => { switchLanguage('fr') }}>FR</HeaderButton>
        {isLogged && (
          <HeaderButton
            type='button'
            onClick={logout}
            disabled={!canLogout}
          >
            {t('logout')}
          </HeaderButton>
        )}
      </HeaderControls>
    </HeaderContainer>
  )
}
