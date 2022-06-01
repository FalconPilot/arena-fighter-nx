import * as React from 'react'

import { useForm } from 'react-ux-form'

import { useCharacters, useTranslations } from 'contexts'
import { Loading } from 'components/loading'
import { CharacterSchema } from 'types'
import { API } from 'utils/api'

import { CharactersListView } from './view'
import { CharacterForm } from './types'

export const CharactersList: React.FC = () => {
  const [{ t }] = useTranslations()
  const [{ characters }, {
    loadCharacters,
    selectCharacter,
  }] = useCharacters()
  const [overlayOpened, setOverlay] = React.useState<boolean>(false)

  const checkLength = (v: string) => {
    if (v.length < 3) {
      return t('tooShort')
    }
  }

  const form: CharacterForm = useForm({
    firstName: {
      initialValue: '',
      validate: checkLength,
    },
    lastName: {
      initialValue: '',
      validate: checkLength,
    },
    stageName: {
      initialValue: '',
    },
  })

  const openOverlay = React.useCallback(() => {
    form.resetForm()
    setOverlay(true)
  }, [form, setOverlay])

  const closeOverlay = React.useCallback(() => {
    setOverlay(false)
  }, [setOverlay])

  const createCharacter: React.FormEventHandler<HTMLFormElement> = React.useCallback(evt => {
    evt.preventDefault()
    form.submitForm(values => {
      API.post('/api/characters', CharacterSchema)
        .withBody(values)
        .execute()
        .then(closeOverlay)
        .then(loadCharacters)
        .catch(console.error)
    }, console.error)
  }, [form, loadCharacters, closeOverlay])

  return (
    <Loading isLoading={characters.isLoading}>
      <CharactersListView
        characters={characters}
        overlayOpened={overlayOpened}
        form={form}
        openOverlay={openOverlay}
        closeOverlay={closeOverlay}
        onSubmit={createCharacter}
        selectCharacter={selectCharacter}
      />
    </Loading>
  )
}
