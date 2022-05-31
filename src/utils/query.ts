import { APIError } from 'types'

export const queryId = (id: string | string[]): number => {
  if (Array.isArray(id)) {
    throw new APIError(400, 'ID cannot be an array')
  }

  const parsedId = parseInt(id, 10)

  if (isNaN(parsedId)) {
    throw new APIError(400, 'Invalid ID')
  }

  return parsedId
}
