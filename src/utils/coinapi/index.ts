import { findAndRemove } from '../findAndRemove'
import * as marketData from './marketData'
import * as metadata from './metadata'
import { unsafeResult } from './request'

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

export const assetsWithBrlRates = async () => {
  const [icons, assets] = await Promise.all([
    unsafeResult(metadata.icons(32)),
    unsafeResult(metadata.assets()),
  ])

  const hydratedAssets = assets.flatMap((asset) => {
    const hydratedAsset = hydrateAsset(asset, icons)

    if (hydratedAsset === undefined) {
      return []
    }

    return [hydratedAsset]
  })

  const assetsWithBrlRates = await Promise.all(
    hydratedAssets.map(async (asset) => {
      const { rate } = await unsafeResult(metadata.rate(asset.id, 'BRL'))

      return {
        ...asset,
        brlRate: rate,
      }
    })
  )

  return assetsWithBrlRates.slice(0, 5)
  // return assetsWithBrlRates
}

const api = {
  marketData,
  metadata,
}

export default api
