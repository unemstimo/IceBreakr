import {
  type inferProcedureOutput,
  type inferProcedureInput,
} from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { type AppRouter } from "../root";

export type CreateRating = inferProcedureInput<AppRouter["rating"]["create"]>;
export type Rating = inferProcedureOutput<AppRouter["rating"]["create"]>;

export const ratingRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        gameId: z.number(),
        starRating: z.number(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.gameRating.create({
        data: {
          userId: ctx.userId,
          gameId: input.gameId,
          starRating: input.starRating,
          description: input.description,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.gameRating.findMany();
  }),

  getRatingsByGameId: publicProcedure
    .input(z.object({ gameId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.gameRating.findMany({
        where: { gameId: input.gameId },
        include: { user: true },
      });
    }),

  delete: privateProcedure
    .input(z.object({ ratingId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.gameRating.delete({
        where: { ratingId: input.ratingId },
      });
    }),

  update: privateProcedure
    .input(
      z.object({
        ratingId: z.number(),
        starRating: z.number(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.gameRating.update({
        where: { ratingId: input.ratingId },
        data: {
          starRating: input.starRating,
          description: input.description,
        },
      });
    }),
});
