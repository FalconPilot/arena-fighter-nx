import * as React from 'react'

import { styled } from '@stitches/react'

import { useTranslations } from 'contexts'
import { maxCharacters } from 'gamedata/constants'
import { Character, hasResult, LoadingState } from 'types'
import { getCharacterName } from 'utils/character'

import { CharacterForm } from './types'

const PlusButton = styled('button', {
  width: '50px',
  height: '50px',
})

const Overlay = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 99,
  display: 'flex',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
})

export const CharactersListView: React.FC<{
  characters: LoadingState<Character[]>,
  form: CharacterForm
  overlayOpened: boolean,
  openOverlay: () => void,
  closeOverlay: () => void,
  onSubmit: React.FormEventHandler<HTMLFormElement>,
  selectCharacter: (id: number) => void,
}> = ({
  characters,
  form,
  overlayOpened,
  openOverlay,
  closeOverlay,
  onSubmit,
  selectCharacter,
}) => {
  const [{ t }] = useTranslations()

  const onInputChange = React.useCallback(
    (onChange: (v: string) => void) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    onChange(evt.currentTarget.value)
  }, [])

  return (
    <>
      {!hasResult(characters) ? null : (
        characters.result.map(character => (
          <div key={character.firstName}>
            <button onClick={() => { selectCharacter(character.id) }}>
              {getCharacterName(character)}
            </button>
          </div>
        ))
      )}
      {hasResult(characters) && characters.result.length < maxCharacters && (
        <PlusButton onClick={openOverlay}>+</PlusButton>
      )}
      {overlayOpened && (
        <Overlay>
          <PlusButton onClick={closeOverlay}>
            X
          </PlusButton>
          <form onSubmit={onSubmit}>
            <form.Field name='firstName'>
              {({ value, onChange }) => (
                <input
                  type='text'
                  value={value}
                  placeholder={t('firstName')}
                  onChange={onInputChange(onChange)}
                />
              )}
            </form.Field>
            <form.Field name='lastName'>
              {({ value, onChange }) => (
                <input
                  type='text'
                  value={value}
                  placeholder={t('lastName')}
                  onChange={onInputChange(onChange)}
                />
              )}
            </form.Field>
            <form.Field name='stageName'>
              {({ value, onChange }) => (
                <input
                  type='text'
                  value={value ?? ''}
                  placeholder={t('stageName')}
                  onChange={onInputChange(onChange)}
                />
              )}
            </form.Field>
            <button type='submit'>+</button>
          </form>
        </Overlay>
      )}
    </>
  )
}
