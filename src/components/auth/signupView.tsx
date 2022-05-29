import * as React from 'react'

import { useTranslations } from 'hooks'

import { CommonProps, SignupForm } from './types'
import { AuthContainer, AuthField, Form } from './styled'

export const SignupView: React.FunctionComponent<CommonProps & {
  form: SignupForm,
  onSubmit: React.FormEventHandler<HTMLFormElement>
}> = ({ form, onSubmit, switchForm }) => {
  const [t] = useTranslations()

  const onInputChange = React.useCallback(
    (onChange: (v: string) => void) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    onChange(evt.currentTarget.value)
  }, [])

  return (
    <AuthContainer>
      <Form onSubmit={onSubmit}>
        <form.Field name='email'>
          {({ value, onChange }) => (
            <AuthField
              placeholder={t('email')}
              type='text'
              value={value}
              onChange={onInputChange(onChange)}
            />
          )}
        </form.Field>
        <form.Field name='name'>
          {({ value, onChange }) => (
            <AuthField
              placeholder={t('username')}
              type='text'
              value={value}
              onChange={onInputChange(onChange)}
            />
          )}
        </form.Field>
        <form.Field name='password'>
          {({ value, onChange }) => (
            <AuthField
              placeholder={t('password')}
              type='password'
              value={value}
              onChange={onInputChange(onChange)}
            />
          )}
        </form.Field>
        <form.Field name='passwordCheck'>
          {({ value, onChange }) => (
            <AuthField
              placeholder={t('passwordConfirmation')}
              type='password'
              value={value}
              onChange={onInputChange(onChange)}
            />
          )}
        </form.Field>
        <button type='submit'>{t('signup')}</button>
      </Form>
      <button onClick={switchForm('login')}>{t('login')}</button>
    </AuthContainer>
  )
}
