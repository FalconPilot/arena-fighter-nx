import { API } from 'utils/api'
import { UserCodec } from 'types'

export const checkSession = () =>
  API.get('/api/users', UserCodec)
    .execute()
