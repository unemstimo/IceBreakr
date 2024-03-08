import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const favoriteRouter = createTRPCRouter({
  addGame: privateProcedure
    .input(
      z.object({
        gameId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.userFavoriteGame.create({
        data: {
          gameId: input.gameId,
          userId: ctx.userId,
        },
      });
    }),

  removeGame: privateProcedure
    .input(
      z.object({
        gameId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.userFavoriteGame.delete({
        where: {
          userId_gameId: {
            gameId: input.gameId,
            userId: ctx.userId,
          },
        },
      });
    }),

  addPlaylist: privateProcedure
    .input(
      z.object({
        playlistId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.userFavoritePlaylist.create({
        data: {
          playlistId: input.playlistId,
          userId: ctx.userId,
        },
      });
    }),

  removePlaylist: privateProcedure
    .input(
      z.object({
        playlistId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.userFavoritePlaylist.delete({
        where: {
          userId_playlistId: {
            playlistId: input.playlistId,
            userId: ctx.userId,
          },
        },
      });
    }),

  getUserFavoriteGames: privateProcedure.query(({ ctx }) => {
    return ctx.db.userFavoriteGame.findMany({
      where: {
        userId: ctx.userId,
      },
      include: {
        game: true,
      },
    });
  }),

  getUserFavoritePlaylists: privateProcedure.query(({ ctx }) => {
    return ctx.db.userFavoritePlaylist.findMany({
      where: {
        userId: ctx.userId,
      },
      include: {
        playlist: true,
      },
    });
  }),
});
