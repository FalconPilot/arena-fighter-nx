import * as React from 'react'

import { useForm } from 'react-ux-form'

import { useUser } from 'contexts'
import { API } from 'utils/api'
import { UserCodec } from 'types'

import { CommonProps, CurrentForm, LoginForm, SignupForm } from './types'

import { LoginView } from './loginView'
import { SignupView } from './signupView'

export const Auth: React.FunctionComponent = () => {
  const [user, loadUser] = useUser()
  const [currentForm, setCurrentForm] = React.useState<CurrentForm>('login')

  const switchForm = (formKey: CurrentForm) => (): void => {
    setCurrentForm(formKey)
  }

  const commonProps: CommonProps = {
    switchForm,
  }

  // Login
  const loginForm: LoginForm = useForm({
    email: {
      initialValue: ''
    },
    password: {
      initialValue: ''
    }
  })

  const submitLoginForm: React.FormEventHandler<HTMLFormElement> = React.useCallback(evt => {
    evt.preventDefault()
    loginForm.submitForm(values => {
      if (values.email) {
        API.post(`/api/users/login`, UserCodec)
          .withBody(values)
          .execute()
          .then(loadUser)
          .catch(console.error)
      }
    }, console.error)
  }, [loginForm, loadUser])

  // Signup
  const signupForm: SignupForm = useForm({
    name: {
      initialValue: ''
    },
    email: {
      initialValue: '',
    },
    password: {
      initialValue: ''
    },
    passwordCheck: {
      initialValue: ''
    }
  })

  const submitSignupForm: React.FormEventHandler<HTMLFormElement> = React.useCallback(evt => {
    evt.preventDefault()
    signupForm.submitForm(values => {
      API.post('/api/users', UserCodec)
        .withBody(values)
        .execute()
        .then(loadUser)
        .catch(console.error)
    }, console.error)
  }, [signupForm, loadUser])

  return {
    ['login']: (
      <LoginView
        {...commonProps}
        form={loginForm}
        onSubmit={submitLoginForm}
      />
    ),
    ['signup']: (
      <SignupView
        {...commonProps}
        form={signupForm}
        onSubmit={submitSignupForm}
      />
    )
  }[currentForm]
}
