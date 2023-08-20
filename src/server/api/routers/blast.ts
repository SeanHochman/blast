import { date, z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const blastRouter = createTRPCRouter({
  infiniteFeed: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
      })
    )
    .query(async ({ input: { limit = 10, cursor }, ctx }) => {
      const currentUserId = ctx.session?.user?.id;
      const data = await ctx.prisma.blast.findMany({
        take: limit + 1,
        cursor: cursor ? { createdAt_id: cursor } : undefined,
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        select: {
          id: true,
          content: true,
          createdAt: true,
          _count: { select: { likes: true } },
          likes: !currentUserId ? false : { where: { userId: currentUserId } },
          user: { select: { name: true, id: true, image: true } },
        },
      });

      let nextCursor: typeof cursor | undefined;

      if (data.length > limit) {
        const nextItem = data.pop();
        if (!!nextItem) {
          nextCursor = { id: nextItem.id, createdAt: nextItem.createdAt };
        }
      }
      return {
        blasts: data.map((blast) => {
          return {
            id: blast.id,
            content: blast.content,
            createdAt: blast.createdAt,
            likeCount: blast._count.likes,
            likedByMe: !!blast.likes.length,
            user: blast.user,
          };
        }),
        nextCursor,
      };
    }),
  create: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input: { content }, ctx }) => {
      const blast = await ctx.prisma.blast.create({
        data: { content, userId: ctx.session.user.id },
      });

      return blast;
    }),
});
