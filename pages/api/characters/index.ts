import { maxCharacters } from 'gamedata/constants'
import { prisma } from 'prisma'
import { errorHandler, forbiddenMethod } from 'utils/errors'
import { getSessionUser, withSessionRoute } from 'utils/session'

import {
  APIError,
  APIHandler,
  Character,
  CharacterPayloadCodec,
  extractCharacter
} from 'types'

const handlePost: APIHandler<Character> = async (req, res) => {
  return getSessionUser(req)
    .then(user => [user, CharacterPayloadCodec.parse(req.body)] as const)
    .then(([user, payload]) =>
      prisma.character.findMany({
        where: {
          userId: user.id
        }
      })
        // Check if user already has a character
        .then(char => {
          if (char.length >= maxCharacters) {
            throw new APIError(401, 'Cannot have more than one character currently')
          }
        })
        .then(() => prisma.character.create({
          data: {
            ...payload,
            userId: user.id,
          },
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
    case 'POST':
      return handlePost(req, res)
    default:
      return forbiddenMethod(req, res)
  }
}

export default withSessionRoute(handler)
