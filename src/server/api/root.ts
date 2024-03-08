import { createCallerFactory } from "@trpc/server";
import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { gameRouter } from "./routers/game";
import { categoryRouter } from "./routers/category";
import { playlistRouter } from "./routers/playlist";
import { ratingRouter } from "./routers/rating";
import { queueRouter } from "./routers/queue";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  gameRouter: gameRouter,
  category: categoryRouter,
  playlist: playlistRouter,
  rating: ratingRouter,
  queue: queueRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createFactory = createCallerFactory();
// export const createCaller = createCallerFactory(appRouter);
