import { Weapon } from '@prisma/client'
import { APIHandler } from 'types'
import { forbiddenMethod } from 'utils/errors'
import { withSessionRoute } from 'utils/session'

const handler: APIHandler<Weapon> = (req, res) => {
  switch (req.method) {
    default:
      return forbiddenMethod(req, res)
  }
}

export default withSessionRoute(handler)
