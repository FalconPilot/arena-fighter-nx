import { prisma } from 'prisma'
import { APIError, APIHandler, Character, CharacterPayloadCodec, extractCharacter } from 'types'
import { errorHandler, forbiddenMethod } from 'utils/errors'
import { queryId } from 'utils/query'
import { getSessionUser, withSessionRoute } from 'utils/session'

const handlePut: APIHandler<Character> = async (req, res) => {

  return getSessionUser(req)
    .then(user => [
      user,
      CharacterPayloadCodec.parse(req.body)
    ] as const)
    .then(([user, payload]) =>
      Promise.resolve(queryId(req.query.id))
        .then(id => (
          prisma.character.findFirst({
            where: { id, userId: user.id },
          })
        ))
        // Check if character belongs to logged user
        .then(char => {
          if (!char) {
            throw new APIError(401, 'Character does not belong to authorized user')
          }
          return char
        })
        .then(char => prisma.character.update({
          where: { id: char.id },
          data: payload,
          include: {
            weapon: true,
            secondaryWeapon: true,
          }
        }))
    )
    .then(extractCharacter)
    .then(character => {
      return res.status(200).json(character)
    })
    .catch(errorHandler(res))
}

const handler: APIHandler<Character> = (req, res) => {
  switch (req.method) {
    case 'PUT':
      return handlePut(req, res)
    default:
      return forbiddenMethod(req, res)
  }
}

export default withSessionRoute(handler)
