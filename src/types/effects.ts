export interface LoadingState<T> {
  isLoading: boolean
  result: T | Error | null
}

export const hasResult = <T>(state: LoadingState<T>): state is {
  isLoading: boolean,
  result: T,
} =>
  state.result !== null && !(state.result instanceof Error)
