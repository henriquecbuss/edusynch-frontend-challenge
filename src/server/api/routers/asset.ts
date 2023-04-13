import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const assetRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        limit: z.number().positive().optional(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.asset.findMany({
        take: input.limit,
      });
    }),
  add: privateProcedure
    .input(
      z.object({
        assetId: z.string(),
        amount: z.number().positive(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const existingEntry = await ctx.prisma.walletEntry.findUnique({
        where: {
          userId_assetId: {
            assetId: input.assetId,
            userId: ctx.currentUserId,
          },
        },
      });

      console.log({ existingEntry });

      if (existingEntry) {
        await ctx.prisma.walletEntry.update({
          where: {
            userId_assetId: {
              assetId: input.assetId,
              userId: ctx.currentUserId,
            },
          },
          data: {
            amount: existingEntry.amount + input.amount,
          },
        });

        return;
      }

      await ctx.prisma.walletEntry.create({
        data: {
          assetId: input.assetId,
          userId: ctx.currentUserId,
          amount: input.amount,
        },
      });
    }),
});
