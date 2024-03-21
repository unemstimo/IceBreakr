import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const reportRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        ratingId: z.number(),
        reason: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.userReportedRating.create({
        data: {
          userId: ctx.userId,
          ratingId: input.ratingId,
          reason: input.reason,
        },
      });
    }),

  getAll: privateProcedure.query(({ ctx }) => {
    return ctx.db.userReportedRating.findMany({
      include: {
        rating: true,
        user: true,
      },
    });
  }),
});
