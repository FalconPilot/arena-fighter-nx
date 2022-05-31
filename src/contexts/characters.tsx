import * as React from 'react'

import { z } from 'zod'

import { useLoadingState } from 'hooks'
import { API } from 'utils/api'
import { noOp } from 'utils/function'

import {
  Character,
  CharacterCodec,
  CharacterPayload,
  hasResult,
  LoadingState
} from 'types'

type CharactersContextData = [
  {
    characters: LoadingState<Character[]>,
    selectedCharacter: Character | null,
  },
  {
    loadCharacters: () => void,
    updateCharacter: (
      id: number,
      payload: Partial<CharacterPayload>
    ) => void,
    selectCharacter: (id: number | null) => void,
  },
]

const CharactersContext = React.createContext<CharactersContextData>([
  {
    characters: {
      result: null,
      isLoading: true,
    },
    selectedCharacter: null,
  },
  {
    loadCharacters: noOp,
    updateCharacter: noOp,
    selectCharacter: noOp,
  },
])
CharactersContext.displayName = 'CharactersContext'

export const CharactersProvider: React.FC<{
  children: React.ReactNode,
}> = ({ children }) => {
  const [characters, charactersFunctions] = useLoadingState<Character[]>({ isLoading: true })
  const [selectedCharacter, setSelectedCharacter] = React.useState<Character | null>(null)

  // Load all characters
  const loadCharacters = React.useCallback(() => {
    charactersFunctions.startLoading()

    API.get('/api/users/characters', z.array(CharacterCodec))
      .execute()
      .then(charactersFunctions.finishLoading)
      .catch(charactersFunctions.handleError)
  }, [charactersFunctions])

  // Select a character
  const selectCharacter = React.useCallback((id: number | null): void => {
    if (id === null) {
      return setSelectedCharacter(null)
    }

    const char = hasResult(characters) && characters.result.find(c => c.id === id)
    if (!char) {
      return console.warn('Character selection failed because it was not found!')
    }
    setSelectedCharacter(char)
  }, [characters, setSelectedCharacter])

  // Update a single character
  const updateCharacter = React.useCallback((
    id: number,
    payload: Partial<CharacterPayload>
  ) => {
    charactersFunctions.startLoading()

    API.put(`/api/characters/${id}`, CharacterCodec)
      .withBody(payload)
      .execute()
      .then(character => {
        const list = Array.isArray(characters.result)
          ? characters.result.filter(char => char.id !== character.id)
          : []
        charactersFunctions.finishLoading(list.concat([character]))
      })
      .catch(charactersFunctions.handleError)
  }, [characters, charactersFunctions])

  React.useEffect(() => {
    loadCharacters()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CharactersContext.Provider value={[{
      characters,
      selectedCharacter,
    }, {
      loadCharacters,
      updateCharacter,
      selectCharacter,
    }]}>
      {children}
    </CharactersContext.Provider>
  )
}

export const useCharacters = (): CharactersContextData => {
  const context = React.useContext(CharactersContext)

  if (context === undefined) {
    throw new Error('useCharacters must be used within a CharactersContext provider')
  }

  return React.useMemo(() => context, [context])
}
