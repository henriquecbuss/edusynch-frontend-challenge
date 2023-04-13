import { z } from 'zod'
import { request } from './request'

type Period = '1DAY'

type OhlcvOptions = {
  period?: Period
  limit?: number
}

export const ohlcv = (
  exchange: string,
  base: string,
  quote: string,
  options?: OhlcvOptions
) => {
  const parameters = new URLSearchParams({
    period_id: options?.period ?? '1DAY',
  })

  if (options?.limit) {
    parameters.append('limit', options.limit.toString())
  }

  return request(
    `/ohlcv/${exchange}_SPOT_${base}_${quote}/latest?${parameters.toString()}`,
    z.array(
      z.object({
        price_open: z.number(),
        price_close: z.number(),
      })
    )
  )
}
