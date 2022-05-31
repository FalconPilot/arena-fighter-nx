import * as React from 'react'

import { styled } from '@stitches/react'

import { CharactersList } from 'components/characters-list'
import { CharacterHub } from 'components/character-hub'
import { useCharacters } from 'contexts'

const MainContainer = styled('main', {
  flex: '1',
  backgroundColor: '#555',
  boxShadow: '0 0 160px #222 inset',
  overflow: 'auto',
})

export const MainView: React.FunctionComponent = () => {
  const [{ selectedCharacter }] = useCharacters()

  return (
    <MainContainer>
      {selectedCharacter
        ? <CharacterHub character={selectedCharacter} />
        : <CharactersList />
      }
    </MainContainer>
  )
}
