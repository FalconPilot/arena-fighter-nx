import { APIHandler } from 'types'
import { forbiddenMethod } from 'utils/errors'
import { withSessionRoute } from 'utils/session'

const handleLogin: APIHandler<'OK'> = async (req, res) => {
  await req.session.destroy()
  return res.status(200).json('OK')
}

const handler: APIHandler<'OK'> = (req, res) => {
  switch (req.method) {
    case 'POST':
      return withSessionRoute(handleLogin)(req, res)
    default:
      return forbiddenMethod(req, res)
  }
}

export default handler
