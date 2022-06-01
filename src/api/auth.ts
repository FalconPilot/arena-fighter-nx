import { API } from 'utils/api'
import { UserSchema } from 'types'

export const checkSession = () =>
  API.get('/api/users', UserSchema)
    .execute()
