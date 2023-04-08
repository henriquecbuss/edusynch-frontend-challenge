import { z } from 'zod'

const errorSchema = z
  .object({
    error: z.string(),
  })
  .or(
    z.object({
      message: z.string(),
    })
  )

export const unsafeResult = async <T>(
  futureResult: Promise<RequestResult<T>>
): Promise<T> => {
  const result = await futureResult

  // We should use some logging service like Sentry here instead
  if (result.ok) {
    return result.data
  }

  throw new Error(result.error)
}

export type RequestResult<T> =
  | { ok: false; error: string }
  | { ok: true; data: T }

export const request = async <T>(
  endpoint: `/${string}`,
  successSchema: z.Schema<T>,
  options?: RequestInit
): Promise<RequestResult<T>> => {
  const coinApiKey = process.env.COINAPI_KEY as string
  const coinApiUrl = process.env.COINAPI_URL as string

  const { headers, ...otherOptions } = options ?? {}

  const fetchResult = await fetch(`${coinApiUrl}${endpoint}`, {
    headers: {
      'X-CoinAPI-Key': coinApiKey,
      'Accept-Encoding': 'deflate, gzip',
      Accept: 'application/json',
      ...(headers ?? {}),
    },
    ...otherOptions,
  })

  const jsonResult = await fetchResult.json()

  try {
    const error = errorSchema.parse(jsonResult)
    if ('message' in error) {
      return { ok: false, error: error.message }
    }

    return { ok: false, error: error.error }
  } catch {}

  const data = successSchema.safeParse(jsonResult)

  if (data.success) {
    return { ok: true, data: data.data }
  }

  return { ok: false, error: data.error.toString() }
}
