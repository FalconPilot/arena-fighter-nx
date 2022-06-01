import getConfig from 'next/config'
import { NextApiRequest } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'

import { prisma } from 'prisma'
import { APIError, APIHandler, User } from 'types'

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number,
    }
  }
}

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

const sessionOptions = {
  password: serverRuntimeConfig.sessionPassword,
  cookieName: 'arenanx_session',
  cookieOptions: {
    secure: publicRuntimeConfig.NODE_ENV === 'production',
  },
}

export const withSessionRoute = <T>(handler: APIHandler<T>) => {
  return withIronSessionApiRoute(handler, sessionOptions)
}

export const getSessionUser = async (
  req: NextApiRequest,
): Promise<User> => {
  const userId = req.session.user?.id

  if (!userId) {
    throw new APIError(403, 'User must be logged in')
  }

  return prisma.user.findUnique({ where: { id: userId } })
    .then(user => {
      if (!user) {
        throw new APIError(404, 'Logged user does not exist')
      }

      return user
    })
}
