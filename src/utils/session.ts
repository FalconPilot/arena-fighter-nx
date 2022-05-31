import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'prisma'
import { APIError, User } from 'types'

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number,
    }
  }
}

if (!process.env.SESSION_PWD) {
  throw new Error('SESSION_PWD is not defined in environment')
}

const sessionOptions = {
  password: process.env.SESSION_PWD,
  cookieName: 'arenanx_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

export const withSessionRoute = <T>(handler: NextApiHandler<T>) => {
  return withIronSessionApiRoute(handler, sessionOptions)
}

export const getSessionUser = async <T>(
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
