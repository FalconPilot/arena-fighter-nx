import { prisma } from 'prisma'
import { APIError, APIHandler, extractUser, LoginPayloadSchema, User } from 'types'
import { errorHandler, forbiddenMethod } from 'utils/errors'
import { compare } from 'utils/password'
import { withSessionRoute } from 'utils/session'

const handleLogin: APIHandler<User> = async (req, res) => {
  return Promise.resolve(req.body)
    .then(LoginPayloadSchema.parse)
    .then(({ password, email }) => Promise.all([
      password,
      prisma.user.findUnique({
        where: { email }
      })
    ]))
    .then(([password, user]) => {
      if (!user) {
        throw new APIError(404, 'User does not exist')
      }

      return compare(password)(user.password)
        .then(res => {
          if (!res) {
            throw new APIError(403, 'Incorrect password')
          }

          return user
        })
    })
    .then(extractUser)
    .then(async user => {
      req.session.user = {
        id: user.id,
      }
      await req.session.save()
      return res.status(200).json(user)
    })
    .catch(errorHandler(res))
}

const handler: APIHandler<User> = (req, res) => {
  switch (req.method) {
    case 'POST':
      return handleLogin(req, res)
    default:
      return forbiddenMethod(req, res)
  }
}

export default withSessionRoute(handler)
