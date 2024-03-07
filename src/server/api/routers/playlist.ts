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
import { i } from "vitest/dist/reporters-1evA5lom";

export type CreatePlaylist = inferProcedureInput<
  AppRouter["playlist"]["create"]
>;
export type Playlist = inferProcedureOutput<AppRouter["playlist"]["create"]>;

export type PlaylistWithGamesAndUser = inferProcedureOutput<
  AppRouter["playlist"]["getPlaylistById"]
>;

export type MyPlaylists = inferProcedureOutput<
  AppRouter["playlist"]["getPlaylistsByUserId"]
>;

export type FetchPlaylists = inferProcedureOutput<
  AppRouter["playlist"]["getAll"]
>;

export const playlistRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.playlist.create({
        data: {
          name: input.name,
          userId: ctx.userId,
          description: input.description,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.playlist.findMany();
  }),

  getPlaylistById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.playlist
        .findFirst({
          where: { playlistId: input.id },
          include: {
            GameInPlaylist: {
              include: {
                game: {
                  include: {
                    ratings: true,
                  },
                },
              },
            },
            user: true,
          },
        })
        .then((playlist) => {
          const ratedGames = playlist?.GameInPlaylist.map((game) => {
            const totalScore = game.game.ratings.reduce(
              (acc, rating) => acc + rating.starRating,
              0,
            );
            const averageScore =
              game.game.ratings.length > 0
                ? totalScore / game.game.ratings.length
                : 0;
            delete (game.game as Partial<typeof game.game>).ratings;

            return {
              ...game.game,
              averageRating: averageScore,
            };
          });
          return {
            ...playlist,
            GameInPlaylist: ratedGames,
          };
        });
    }),

  getPlaylistsByUserId: privateProcedure.query(({ ctx }) => {
    return ctx.db.playlist.findMany({
      where: { userId: ctx.userId },
      include: {
        GameInPlaylist: {
          include: {
            game: true,
          },
        },
        user: true,
      },
    });
  }),

  delete: privateProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.playlist.delete({
        where: { playlistId: input.id },
      });
    }),

  addGameToPlaylist: privateProcedure
    .input(
      z.object({ playlistId: z.number().min(1), gameId: z.number().min(1) }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.gameInPlaylist.create({
        data: {
          playlistId: input.playlistId,
          gameId: input.gameId,
        },
      });
    }),

  removeGameFromPlaylist: privateProcedure
    .input(
      z.object({ playlistId: z.number().min(1), gameId: z.number().min(1) }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.gameInPlaylist.delete({
        where: {
          gameId_playlistId: {
            gameId: input.gameId,
            playlistId: input.playlistId,
          },
        },
      });
    }),

  getQueuePlaylist: privateProcedure.query(({ ctx }) => {
    return ctx.db.playlist.findMany({
      where: { userId: ctx.userId, isQueue: true },
    });
  }),

  createQueue: privateProcedure.mutation(async ({ ctx }) => {
    // check if queue playlist already exists
    const queuePlaylist = await ctx.db.playlist.findFirst({
      where: { userId: ctx.userId, isQueue: true },
    });
    if (queuePlaylist) {
      return queuePlaylist;
    }
    return ctx.db.playlist.create({
      data: {
        name: "Queue",
        userId: ctx.userId,
        isQueue: true,
      },
    });
  }),

  addGameToQueue: privateProcedure
    .input(z.object({ gameId: z.number().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const queuePlaylist = await ctx.db.playlist.findFirst({
        where: { userId: ctx.userId, isQueue: true },
      });
      if (!queuePlaylist) {
        return null;
      }
      return ctx.db.gameInPlaylist.create({
        data: {
          playlistId: queuePlaylist.playlistId,
          gameId: input.gameId,
        },
      });
    }),
});
