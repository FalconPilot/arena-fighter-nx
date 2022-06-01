import * as React from 'react'

import { useTranslations } from 'contexts'

import { CommonProps, LoginForm } from './types'
import { AuthContainer, AuthField, Form } from './styled'

export const LoginView: React.FunctionComponent<CommonProps & {
  form: LoginForm,
  onSubmit: React.FormEventHandler<HTMLFormElement>
}> = ({ form, onSubmit, switchForm }) => {
  const [{ t }] = useTranslations()

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
        <button type='submit'>{t('login')}</button>
      </Form>
      <button onClick={switchForm('signup')}>{t('signup')}</button>
    </AuthContainer>
  )
}
