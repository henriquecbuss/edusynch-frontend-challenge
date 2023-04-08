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

export const request = async <T>(
  endpoint: `/${string}`,
  successSchema: z.Schema<T>,
  options?: RequestInit
): Promise<{ error: string } | T> => {
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
      return { error: error.message }
    }

    return error
  } catch {}

  return successSchema.parse(jsonResult)
}
