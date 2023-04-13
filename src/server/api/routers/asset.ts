import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

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
});
