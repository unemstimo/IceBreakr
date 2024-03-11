import { type inferProcedureOutput } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { type AppRouter } from "../root";

export type Queue = inferProcedureOutput<AppRouter["queue"]["getQueue"]>;
export type QueueItem = inferProcedureOutput<
  AppRouter["queue"]["getQueueItem"]
>;
export type UpdateQueue = inferProcedureOutput<
  AppRouter["queue"]["updateTimePlayed"]
>;

export const queueRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        gameId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.gameInUserQueue.create({
        data: {
          gameId: input.gameId,
          userId: ctx.userId,
        },
      });
    }),

  getQueue: privateProcedure.query(async ({ ctx }) => {
    return ctx.db.gameInUserQueue.findMany({
      where: {
        userId: ctx.userId,
      },
      orderBy: [
        {
          queuedAt: "asc",
        },
        // you you requeue, the updatedAt will be set to now and it will be first in queue.
        {
          updatedAt: "desc",
        },
      ],
      include: {
        game: true,
      },
    });
  }),

  getQueueItem: privateProcedure
    .input(z.object({ queuedId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.gameInUserQueue.findFirst({
        where: {
          queuedId: input.queuedId,
        },
        include: {
          game: true,
        },
      });
    }),

  updateTimePlayed: privateProcedure
    .input(
      z.object({
        queuedId: z.number(),
        timePlayed: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.gameInUserQueue.update({
        where: {
          queuedId: input.queuedId,
        },
        data: {
          timePlayed: input.timePlayed,
        },
      });
    }),

  dequeue: privateProcedure
    .input(
      z.object({
        queuedId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.gameInUserQueue.delete({
        where: {
          queuedId: input.queuedId,
        },
      });
    }),

  reQueue: privateProcedure
    .input(
      z.object({
        queuedId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // get time for frist in queue
      const firstInQueue = await ctx.db.gameInUserQueue.findFirst({
        where: {
          userId: ctx.userId,
        },
        orderBy: {
          queuedAt: "asc",
        },
      });

      const earliestTime = firstInQueue?.queuedAt;

      return ctx.db.gameInUserQueue.update({
        where: {
          queuedId: input.queuedId,
        },
        data: {
          queuedAt: earliestTime,
          updatedAt: new Date(),
        },
      });
    }),
});
