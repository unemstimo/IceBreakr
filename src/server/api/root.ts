import { createCallerFactory } from "@trpc/server";
import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  post: postRouter,
  // user:
  // user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createFactory = createCallerFactory();
// export const createCaller = createCallerFactory(appRouter);
