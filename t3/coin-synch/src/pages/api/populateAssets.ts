import { prisma } from "@/server/db";
import { assetsWithBrlRates } from "@/utils/coinapi";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // We should have some more security (maybe by using a secret key in the request)
  const latestAssetSync = await prisma.assetSync.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  const ONE_HOUR = 1000 * 60 * 60;
  if (
    latestAssetSync &&
    Date.now() - latestAssetSync.createdAt.getTime() < 23 * ONE_HOUR
  ) {
    return response.status(200).json({
      body: "Already synced",
      query: request.query,
      cookies: request.cookies,
    });
  }

  const assets = await assetsWithBrlRates();

  await prisma.asset.createMany({
    data: assets,
    skipDuplicates: true,
  });

  await prisma.assetSync.create({
    data: {},
  });

  await response.revalidate("/");

  response.status(200).json({
    body: assets,
    query: request.query,
    cookies: request.cookies,
  });
}
