import * as React from 'react'

import { styled } from '@stitches/react'

import { Auth } from 'components/auth'
import { CharactersList } from 'components/characters-list'
import { CharacterHub } from 'components/character-hub'
import { Loading } from 'components/loading'
import { useCharacters } from 'contexts'

const MainContainer = styled('main', {
  position: 'relative',
  height: '100%',
  backgroundColor: '#555',
  boxShadow: '0 0 160px #222 inset',
  overflow: 'auto',
})

export const MainView: React.FunctionComponent<{
  isLoading: boolean,
  isLogged: boolean,
}> = ({
  isLoading,
  isLogged
}) => {
  const [{ selectedCharacter }] = useCharacters()

  if (!isLogged && !isLoading) {
    return (
      <MainContainer>
        <Auth />
      </MainContainer>
    )
  }

  return (
    <MainContainer>
      <Loading isLoading={isLoading}>
        {selectedCharacter
          ? <CharacterHub character={selectedCharacter} />
          : <CharactersList />
        }
      </Loading>
    </MainContainer>
  )
}
