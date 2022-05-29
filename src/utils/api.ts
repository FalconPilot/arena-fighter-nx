import { z } from 'zod'
import * as qs from 'query-string'
import axios, { AxiosRequestConfig } from 'axios'

import { ApiHandlerParams, ApiHandler } from '../types'

// API Handler
const apiHandler =
  (config: AxiosRequestConfig) =>
  <T>(
      url: string,
      codec: z.Schema<T>,
    ): ApiHandler<T> =>
      ({
        withOptions: options => apiHandler({ ...config, ...options })(url, codec),
        withHeaders: headers =>
          apiHandler({
            ...config,
            headers: {
              ...config.headers,
              ...headers
            }
          })(url, codec),
        withBody: body => apiHandler({ ...config, data: body })(url, codec),
        withQS: params =>
          apiHandler({
            ...config,
            params,
            paramsSerializer: p => qs.stringify(p, { skipEmptyString: true })
          })(url, codec),
        execute: (handlerParams?: ApiHandlerParams<T>) =>
        axios
          .request<unknown>({ ...config, url })
          .then(res => {
            if (handlerParams?.debug) {
              console.log(res)
            }
            return res
          })
          .then(res => res.data)
          .then(codec.parse)
      } as const)

// API methods
export const API = {
  delete: apiHandler({ method: 'DELETE' }),
  get: apiHandler({ method: 'GET' }),
  patch: apiHandler({ method: 'PATCH' }),
  post: apiHandler({ method: 'POST' }),
  put: apiHandler({ method: 'PUT' }),
}
