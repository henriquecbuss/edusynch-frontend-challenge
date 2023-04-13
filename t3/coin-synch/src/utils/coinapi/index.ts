import { Asset } from "@prisma/client";
import { findAndRemove } from "../findAndRemove";
import * as marketData from "./marketData";
import * as metadata from "./metadata";
import { unsafeResult } from "./request";

const hydrateAsset = (
  asset: metadata.Asset,
  icons: metadata.Icon[]
): undefined | { id: string; name: string; icon: string; priceUsd: number } => {
  if (asset.price_usd === undefined) {
    return undefined;
  }

  if (asset.type_is_crypto !== 1) {
    return undefined;
  }

  const icon = findAndRemove(icons, (icon) => icon.asset_id === asset.asset_id);

  if (icon === undefined) {
    return undefined;
  }

  return {
    id: asset.asset_id,
    name: asset.name,
    icon: icon.url,
    priceUsd: asset.price_usd,
  };
};

export const assetsWithBrlRates = async (): Promise<Asset[]> => {
  // let assets: Asset[] = [
  //   {
  //     id: "BIT",
  //     name: "BITCOIN",
  //     icon: "/logo.svg",
  //     priceUsd: 4.67,
  //     priceBrl: 23.62,
  //     brlRateChangeAbsolute: 7.082,
  //     brlRateChangePercentage: 0.1,
  //   },
  //   {
  //     id: "DOG",
  //     name: "DOGECOIN",
  //     icon: "/logo.svg",
  //     priceUsd: 4.67,
  //     priceBrl: 23.62,
  //     brlRateChangeAbsolute: -5.23,
  //     brlRateChangePercentage: -0.35,
  //   },
  //   {
  //     id: "ETH",
  //     name: "ETHEREUM",
  //     icon: "/logo.svg",
  //     priceUsd: 4.67,
  //     priceBrl: 23.62,
  //     brlRateChangeAbsolute: 7.082,
  //     brlRateChangePercentage: 0.1,
  //   },
  //   {
  //     id: "BIT2",
  //     name: "BITCOIN",
  //     icon: "/logo.svg",
  //     priceUsd: 4.67,
  //     priceBrl: 23.62,
  //     brlRateChangeAbsolute: 7.082,
  //     brlRateChangePercentage: 0.1,
  //   },
  //   {
  //     id: "DOG2",
  //     name: "DOGECOIN",
  //     icon: "/logo.svg",
  //     priceUsd: 4.67,
  //     priceBrl: 23.62,
  //     brlRateChangeAbsolute: -5.23,
  //     brlRateChangePercentage: -0.35,
  //   },
  //   {
  //     id: "ETH2",
  //     name: "ETHEREUM",
  //     icon: "/logo.svg",
  //     priceUsd: 4.67,
  //     priceBrl: 23.62,
  //     brlRateChangeAbsolute: 7.082,
  //     brlRateChangePercentage: 0.1,
  //   },
  //   {
  //     id: "BIT3",
  //     name: "BITCOIN",
  //     icon: "/logo.svg",
  //     priceUsd: 4.67,
  //     priceBrl: 23.62,
  //     brlRateChangeAbsolute: 7.082,
  //     brlRateChangePercentage: 0.1,
  //   },
  //   {
  //     id: "DOG3",
  //     name: "DOGECOIN",
  //     icon: "/logo.svg",
  //     priceUsd: 4.67,
  //     priceBrl: 23.62,
  //     brlRateChangeAbsolute: -5.23,
  //     brlRateChangePercentage: -0.35,
  //   },
  //   {
  //     id: "ETH3",
  //     name: "ETHEREUM",
  //     icon: "/logo.svg",
  //     priceUsd: 4.67,
  //     priceBrl: 23.62,
  //     brlRateChangeAbsolute: 7.082,
  //     brlRateChangePercentage: 0.1,
  //   },
  //   {
  //     id: "BIT4",
  //     name: "BITCOIN",
  //     icon: "/logo.svg",
  //     priceUsd: 4.67,
  //     priceBrl: 23.62,
  //     brlRateChangeAbsolute: 7.082,
  //     brlRateChangePercentage: 0.1,
  //   },
  // ];

  // return assets;
  // // TODO - Bring this back
  console.log("STARTING");
  const [icons, assets] = await Promise.all([
    unsafeResult(metadata.icons(32)),
    unsafeResult(metadata.assets()),
  ]);

  console.log("GOT ICONS AND ASSETS");

  const hydratedAssets = assets.slice(0, 20).flatMap((asset) => {
    const hydratedAsset = hydrateAsset(asset, icons);

    if (hydratedAsset === undefined) {
      return [];
    }

    return [hydratedAsset];
  });

  console.log("HYDRATED ASSETS");

  const assetsWithBrlRates = await Promise.all(
    hydratedAssets.map(async (asset) => {
      const [{ rate_open, rate_close }] = await unsafeResult(
        metadata.rate(asset.id, "BRL")
      );

      return {
        ...asset,
        priceBrl: rate_close,
        brlRateChangeAbsolute: rate_close - rate_open,
        brlRateChangePercentage: (rate_close - rate_open) / rate_open,
      };
    })
  );

  console.log("INSERTED BRL RATES");

  return assetsWithBrlRates;
};

const api = {
  marketData,
  metadata,
};

export default api;
