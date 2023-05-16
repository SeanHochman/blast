import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const blastRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input: { content }, ctx }) => {
      const blast = await ctx.prisma.blast.create({
        data: { content, userId: ctx.session.user.id },
      });

      return blast;
    }),
});
