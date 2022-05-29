import { z } from 'zod'
import { API } from 'utils/api'

export const checkSession = () =>
  API.get('/api/users/session', z.number())
    .execute()
