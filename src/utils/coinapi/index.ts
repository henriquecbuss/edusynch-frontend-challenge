import { findAndRemove } from '../findAndRemove'
import * as marketData from './marketData'
import * as metadata from './metadata'
import { unsafeResult } from './request'

export type Asset = {
  id: string
  name: string
  icon: string
  priceUsd: number
  priceBrl: number
  brlRateChangeAbsolute: number
  brlRateChangePercentage: number
}

const hydrateAsset = (
  asset: metadata.Asset,
  icons: metadata.Icon[]
): undefined | { id: string; name: string; icon: string; priceUsd: number } => {
  if (asset.price_usd === undefined) {
    return undefined
  }

  if (asset.type_is_crypto !== 1) {
    return undefined
  }

  const icon = findAndRemove(icons, (icon) => icon.asset_id === asset.asset_id)

  if (icon === undefined) {
    return undefined
  }

  return {
    id: asset.asset_id,
    name: asset.name,
    icon: icon.url,
    priceUsd: asset.price_usd,
  }
}

export const assetsWithBrlRates = async (): Promise<Asset[]> => {
  const [icons, assets] = await Promise.all([
    unsafeResult(metadata.icons(32)),
    unsafeResult(metadata.assets()),
  ])

  const hydratedAssets = assets.slice(0, 10).flatMap((asset) => {
    const hydratedAsset = hydrateAsset(asset, icons)

    if (hydratedAsset === undefined) {
      return []
    }

    return [hydratedAsset]
  })

  const assetsWithBrlRates = await Promise.all(
    hydratedAssets.map(async (asset) => {
      const { rate_open, rate_close } = await unsafeResult(
        metadata.rate(asset.id, 'BRL')
      )

      return {
        ...asset,
        priceBrl: rate_close,
        brlRateChangeAbsolute: rate_close - rate_open,
        brlRateChangePercentage: (rate_close - rate_open) / rate_open,
      }
    })
  )

  return assetsWithBrlRates
}

const api = {
  marketData,
  metadata,
}

export default api
