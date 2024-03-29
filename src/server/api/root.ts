import { createTRPCRouter } from "~/server/api/trpc";
import { blastRouter } from "~/server/api/routers/blast";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  blast: blastRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
