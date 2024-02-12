import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({ authorId: z.string().min(1), content: z.string().min(1) }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          authorId: input.authorId,
          content: input.content,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany();
  }),
  // getAllRaw: publicProcedure.query

  getPostsByUserId: publicProcedure
    .input(z.object({ userId: z.string().min(1) })) // Define input schema
    .query(async ({ ctx, input }) => {
      return ctx.db.post.findMany({
        where: { authorId: input.userId },
      });
    }),

  // const userWithPosts = await prisma.user.findUnique({
  //   where: {
  //     id: 'user_id' // Replace 'user_id' with the actual user ID
  //   },
  //   include: {
  //     posts: true, // This tells Prisma to include the posts related to the user
  //   },
  // });

  // merk at dette er puclibProcedure. Det vil si at den er tilgjengelig selv om brukeren ikke er logget inn
  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
