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

export type CreateCategory = inferProcedureInput<
  AppRouter["category"]["create"]
>;

export type Category = inferProcedureOutput<AppRouter["category"]["create"]>;

export const categoryRouter = createTRPCRouter({
  create: privateProcedure
    .input(z.object({ categoryId: z.number().min(1), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.category.create({
        data: {
          categoryId: input.categoryId,
          name: input.name,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.category.findMany();
  }),

  delete: privateProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.category.delete({
        where: { categoryId: input.id },
      });
    }),

  createCategoryRelation: privateProcedure
    .input(
      z.object({ categoryId: z.number().min(1), gameId: z.number().min(1) }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.gameInCategory.create({
        data: {
          categoryId: input.categoryId,
          gameId: input.gameId,
        },
      });
    }),
});
