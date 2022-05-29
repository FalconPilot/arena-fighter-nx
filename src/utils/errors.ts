import { NextApiRequest, NextApiResponse } from 'next'

import { APIError } from 'types'

export const errorResponse = <T>(
  res: NextApiResponse<T | APIError>,
  err: APIError,
): void => {
  return res.status(err.httpStatus).json(err)
}

export const errorHandler = <T>(
  res: NextApiResponse<T | APIError>,
) => (err: any): void => {
  console.error(err)
  if (err instanceof APIError) {
    return errorResponse(res, err)
  }


  const defaultErrorMessage = 'Unknown error'

  const msg = typeof err.message === 'string'
    ? err.message
    : defaultErrorMessage

  return errorResponse(res, new APIError(500, msg))
}

export const forbiddenMethod = <T>(
  req: NextApiRequest,
  res: NextApiResponse<T | APIError>,
): void => {
  return errorResponse(res, new APIError(405, `${req.method ?? 'Method'} is not allowed`))
}
