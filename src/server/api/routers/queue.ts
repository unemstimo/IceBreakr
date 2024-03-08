import { type inferProcedureOutput } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { type AppRouter } from "../root";

// export type CreatePlaylist = inferProcedureInput<
//   AppRouter["playlist"]["create"]
// >;
export type Queue = inferProcedureOutput<AppRouter["queue"]["getQueue"]>;
export type QueueItem = inferProcedureOutput<
  AppRouter["queue"]["getQueueItem"]
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
      orderBy: {
        createdAt: "desc",
      },
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
          TimePlayed: input.timePlayed,
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
});
