import * as React from 'react'

import { Character } from 'types'
import { getCharacterName } from 'utils/character'

export const CharacterHubView: React.FC<{
  character: Character,
  goBack: () => void,
}> = ({
  character,
  goBack,
}) => {
  return (
    <div>
      <h2>
        <button onClick={goBack}>{'<='}</button>
        {getCharacterName(character)}
      </h2>
    </div>
  )
}
