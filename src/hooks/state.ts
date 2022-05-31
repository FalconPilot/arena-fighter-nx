import * as React from 'react'

import { LoadingState } from 'types'

export const useLoadingState = <T>(initialState: Partial<LoadingState<T>> = {}) => {
  const [state, setState] = React.useState<LoadingState<T>>({
    isLoading: false,
    result: null,
    ...initialState
  })

  const setData = React.useCallback((newState: LoadingState<T>): void => {
    setState(newState)
  }, [setState])

  const startLoading = React.useCallback((): void => {
    setState({ ...state, isLoading: true })
  }, [state, setState])

  const finishLoading = React.useCallback((result: T | Error | null): void => {
    setState({ result, isLoading: false })
  }, [setState])

  const handleError = React.useCallback((err: unknown): void => {
    const error = err instanceof Error
      ? err
      : new Error('Unknown error')

    finishLoading(error)
  }, [finishLoading])
  
  return [state, {
    setData,
    startLoading,
    finishLoading,
    handleError,
  }] as const
}
