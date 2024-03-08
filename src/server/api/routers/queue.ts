import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

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
