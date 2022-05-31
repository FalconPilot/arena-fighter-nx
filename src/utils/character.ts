import { Character } from 'types'

export const getCharacterName = (character: Character): string => [
  character.firstName,
  character.lastName,
  character.stageName && `"${character.stageName}"`
].filter(x => x).join(' ')
