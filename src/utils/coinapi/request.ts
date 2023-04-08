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
): Promise<{ ok: false; error: string } | { ok: true; data: T }> => {
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
