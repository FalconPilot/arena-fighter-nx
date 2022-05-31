import * as React from 'react'

import { useCharacters } from 'contexts'
import { Character } from 'types'

import { CharacterHubView } from './view'

export const CharacterHub: React.FC<{
  character: Character,
}> = ({
  character,
}) => {
  const [_, { selectCharacter }] = useCharacters()

  const goBack = React.useCallback(() => {
    selectCharacter(null)
  }, [selectCharacter])
  return (
    <CharacterHubView
      character={character}
      goBack={goBack}
    />
  )
}
