import { createTRPCRouter, privateProcedure } from "../trpc";

export const walletEntryRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    // We don't have a lot of assets, so it's fine to return everything
    return ctx.prisma.walletEntry.findMany({
      where: {
        userId: ctx.currentUserId,
      },
      include: {
        asset: true,
      },
    });
  }),
  usdBalance: privateProcedure.query(async ({ ctx }) => {
    const priceAndAmounts = await ctx.prisma.walletEntry.findMany({
      select: {
        asset: {
          select: {
            priceUsd: true,
          },
        },
        amount: true,
      },
    });

    return priceAndAmounts.reduce(
      (acc, { amount, asset }) => acc + amount * asset.priceUsd,
      0
    );
  }),
});
