import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";

export const walletEntryRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    // We don't have a lot of assets, so it's fine to return everything
    return ctx.prisma.walletEntry.findMany({
      where: {
        userId: ctx.currentUserId,
        amount: {
          gt: 0,
        },
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

  increase: privateProcedure
    .input(
      z.object({
        assetId: z.string(),
        amount: z.number().positive(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.walletEntry.update({
        where: {
          userId_assetId: {
            assetId: input.assetId,
            userId: ctx.currentUserId,
          },
        },
        data: {
          amount: {
            increment: input.amount,
          },
        },
      });
    }),

  decrease: privateProcedure
    .input(
      z.object({
        assetId: z.string(),
        amount: z.number().positive(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.walletEntry.update({
        where: {
          userId_assetId: {
            assetId: input.assetId,
            userId: ctx.currentUserId,
          },
        },
        data: {
          amount: {
            decrement: input.amount,
          },
        },
      });
    }),
});
