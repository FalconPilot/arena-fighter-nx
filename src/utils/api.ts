import * as qs from 'query-string'
import axios, { AxiosRequestConfig } from 'axios'
import { z } from 'zod'

import { ApiHandlerParams, ApiHandler } from '../types'

// API Handler
const apiHandler =
  (config: AxiosRequestConfig) =>
  <Output, Def, Input>(
      url: string,
      schema: z.Schema<Output, Def, Input>,
    ): ApiHandler<Output> =>
      ({
        withOptions: options => apiHandler({ ...config, ...options })(url, schema),
        withHeaders: headers =>
          apiHandler({
            ...config,
            headers: {
              ...config.headers,
              ...headers
            }
          })(url, schema),
        withBody: body => apiHandler({ ...config, data: body })(url, schema),
        withQS: params =>
          apiHandler({
            ...config,
            params,
            paramsSerializer: p => qs.stringify(p, { skipEmptyString: true })
          })(url, schema),
        execute: (handlerParams?: ApiHandlerParams<Output>) =>
        axios
          .request<unknown>({ ...config, url })
          .then(res => {
            if (handlerParams?.debug) {
              console.log(res)
            }
            return res
          })
          .then(res => res.data)
          .then(schema.parse)
      } as const)

// API methods
export const API = {
  delete: apiHandler({ method: 'DELETE' }),
  get: apiHandler({ method: 'GET' }),
  patch: apiHandler({ method: 'PATCH' }),
  post: apiHandler({ method: 'POST' }),
  put: apiHandler({ method: 'PUT' }),
}
