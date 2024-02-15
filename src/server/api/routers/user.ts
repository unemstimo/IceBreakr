import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        username: z.string().min(1),
        mail: z.string().min(1),
        administrator: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({
        data: {
          userId: ctx.userId,
          username: input.username,
          mail: input.mail,
          administrator: input.administrator ?? false,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany();
  }),

  getCurrentUser: privateProcedure.query(({ ctx }) => {
    return ctx.db.user.findFirst({
      where: { userId: ctx.userId },
    });
  }),

  getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findFirst({
        where: { userId: input.id },
      });
    }),

  getUserByIdWithGames: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findFirst({
        where: { userId: input.id },
        include: {
          games: true,
        },
      });
    }),

  delete: privateProcedure.mutation(async ({ ctx }) => {
    return ctx.db.user.delete({
      where: { userId: ctx.userId },
    });
  }),
});
