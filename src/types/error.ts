import { z } from 'zod'

export const SerializedAPIErrorSchema = z.object({
  httpStatus: z.number(),
  message: z.string(),
  details: z.optional(z.object({
    validationErrors: z.optional(z.array(z.string()))
  }))
})

export type SerializedAPIError = z.TypeOf<typeof SerializedAPIErrorSchema>

export type APIErrorDetails = SerializedAPIError['details']

export class APIError extends Error {
  httpStatus: number
  details: APIErrorDetails

  constructor (status: number, message: string, details: APIErrorDetails = undefined) {
    super(message)
    this.httpStatus = status

    if (details) {
      this.details = details
    }
  }

  serialize (): SerializedAPIError {
    const details = this.details ?? {}

    return {
      httpStatus: this.httpStatus,
      message: this.message,
      ...details
    }
  }
}
