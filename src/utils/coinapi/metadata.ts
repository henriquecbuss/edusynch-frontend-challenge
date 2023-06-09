import { z } from "zod";
import { type RequestResult, request } from "./request";

const assetSchema = z.object({
  asset_id: z.string(),
  name: z.string(),
  type_is_crypto: z.number(),
  price_usd: z.number().optional(),
});

export type Asset = z.infer<typeof assetSchema>;

export const assets = (
  filterAssetIds?: string[]
): Promise<RequestResult<Asset[]>> => {
  const searchParams = new URLSearchParams();

  if (filterAssetIds !== undefined && filterAssetIds.length > 0) {
    searchParams.append("filter_asset_id", filterAssetIds.join(";"));
  }

  return request(
    `/assets${filterAssetIds ? `?${searchParams.toString()}` : ""}`,
    z.array(assetSchema)
  );
};

const iconSchema = z.object({
  asset_id: z.string(),
  url: z.string(),
});

export type Icon = z.infer<typeof iconSchema>;

export const icons = (size: number) => {
  return request(`/assets/icons/${size}`, z.array(iconSchema));
};

export const rate = (baseId: string, quoteId: string) => {
  return request(
    `/exchangerate/${baseId}/${quoteId}/history?limit=1&period_id=1DAY`,
    z.tuple([
      z.object({
        rate_open: z.number(),
        rate_close: z.number(),
      }),
    ])
  );
};

export const exchanges = () => {
  return request(
    "/exchanges",
    z.array(
      z.object({
        exchange_id: z.string(),
        name: z.string(),
        data_symbols_count: z.number(),
      })
    )
  );
};
