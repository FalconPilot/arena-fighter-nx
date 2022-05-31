import { prisma } from 'prisma'
import { APIHandler, Character, extractCharacter } from 'types'
import { errorHandler, forbiddenMethod } from 'utils/errors'
import { getSessionUser, withSessionRoute } from 'utils/session'

const handleGet: APIHandler<Character[]> = async (req, res) => {
  return getSessionUser(req)
    .then(user => prisma.character.findMany({
      where: { userId: user.id },
      include: {
        weapon: true,
        secondaryWeapon: true,
      }
    }))
    .then(results => results.map(extractCharacter))
    .then(characters => {
      return res.status(200).json(characters)
    })
    .catch(errorHandler(res))
}

const handler: APIHandler<Character[]> = (req, res) => {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res)
    default:
      return forbiddenMethod(req, res)
  }
}

export default withSessionRoute(handler)
