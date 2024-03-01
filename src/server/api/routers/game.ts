import {
  type inferProcedureInput,
  type inferProcedureOutput,
} from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { type AppRouter } from "../root";

export type CreateGame = inferProcedureInput<AppRouter["gameRouter"]["create"]>;
export type Game = inferProcedureOutput<AppRouter["gameRouter"]["create"]>;
export type GetGameById = inferProcedureInput<
  AppRouter["gameRouter"]["getGameById"]
>;
export type FetchGames = inferProcedureOutput<
  AppRouter["gameRouter"]["getAll"]
>;

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
    return ctx.db.game.findMany({
      include: {
        GameInCategory: {
          include: {
            category: true,
          },
        },
      },
    });
  }),

  getGameById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.game.findFirst({
        where: { gameId: input.id },
        include: {
          GameInCategory: {
            include: {
              category: true,
            },
          },
        },
      });
    }),

  getGameByUserId: privateProcedure.query(({ ctx }) => {
    return ctx.db.game.findMany({
      where: { userId: ctx.userId },
    });
  }),
});
