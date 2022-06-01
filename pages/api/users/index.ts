import { prisma } from 'prisma'
import { APIHandler, User, UserPayloadSchema } from 'types'
import { errorHandler, forbiddenMethod } from 'utils/errors'
import { encrypt } from 'utils/password'
import { getSessionUser, withSessionRoute } from 'utils/session'

const handlePost: APIHandler<User> = async (req, res) => {
  return Promise.resolve(req.body)
    .then(UserPayloadSchema.parse)
    .then(data => Promise.all([
      data,
      encrypt(data.password),
    ]))
    .then(([data, password]) => ({ ...data, password }))
    .then(data => prisma.user.create({ data }))
    .then(user => res.status(200).json(user))
    .catch(errorHandler(res))
}

const handleGet: APIHandler<User> = async (req, res) => {
  return getSessionUser(req)
    .then(user => {
      return res.status(200).send(user)
    })
    .catch(errorHandler(res))
}

const handler: APIHandler<User> = (req, res) => {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res)
    case 'POST':
      return handlePost(req, res)
    default:
      return forbiddenMethod(req, res)
  }
}

export default withSessionRoute(handler)
