import { NextApiHandler } from 'next'

import { prisma } from 'prisma'
import { APIError, User, UserPayloadCodec } from 'types'
import { errorHandler, forbiddenMethod } from 'utils/errors'
import { encrypt } from 'utils/password'

const handlePost: NextApiHandler<User | APIError> = async (req, res) => {
  return Promise.resolve(req.body)
    .then(UserPayloadCodec.parse)
    .then(data => Promise.all([
      data,
      encrypt(data.password),
    ]))
    .then(([data, password]) => ({ ...data, password }))
    .then(data => prisma.user.create({ data }))
    .then(user => res.status(200).json(user))
    .catch(errorHandler(res))
}

const handler: NextApiHandler<User | APIError> = (req, res) => {
  switch (req.method) {
    case 'POST':
      return handlePost(req, res)
    default:
      return forbiddenMethod(req, res)
  }
}

export default handler
