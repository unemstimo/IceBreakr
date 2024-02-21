import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const gameRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        rules: z.string().min(1),
        duration: z.string(),
        numberOfPlayers: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.game.create({
        data: {
          name: input.name,
          description: input.description,
          userId: ctx.userId,
          rules: input.rules,
          duration: input.duration,
          numberOfPlayers: input.numberOfPlayers,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.game.findMany();
  }),

  getGameById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.game.findFirst({
        where: { gameId: input.id },
      });
    }),

  getGameByUserId: privateProcedure.query(({ ctx }) => {
    return ctx.db.game.findMany({
      where: { userId: ctx.userId },
    });
  }),
});
