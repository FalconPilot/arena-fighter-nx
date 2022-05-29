import { NextApiHandler } from 'next'

import { prisma } from 'prisma'
import { APIError, Character, extractCharacter } from 'types'
import { errorHandler, forbiddenMethod } from 'utils/errors'
import { getSessionUser, withSessionRoute } from 'utils/session'

const handleLogin: NextApiHandler<Character[] | APIError> = async (req, res) => {
  return getSessionUser(req, res)
    .then(user => prisma.character.findMany({
      where: {
        userId: user.id
      }
    }))
    .then(results => results.map(extractCharacter))
    .then(characters => {
      return res.status(200).json(characters)
    })
    .catch(errorHandler(res))
}

const handler: NextApiHandler<Character[] | APIError> = (req, res) => {
  switch (req.method) {
    case 'POST':
      return withSessionRoute(handleLogin)(req, res)
    default:
      return forbiddenMethod(req, res)
  }
}

export default handler
