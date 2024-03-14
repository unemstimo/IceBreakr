import { useEffect, useState } from "react";
import Image from "next/image";
import Placeholder from "~/assets/images/gameplaceholder.png";
import {
  SignOutButton,
  SignedIn as SignedIn,
  UserProfile,
} from "@clerk/nextjs";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useRouter } from "next/router";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { api } from "~/utils/api";
import { Badge } from "~/components/ui/badge";
import PlaylistPicker from "~/components/playlistPicker";
import MyPlaylists from "~/components/myPlaylists";
import { Button } from "~/components/ui/button";
import Layout from "~/components/layout";
import { useToast } from "~/components/ui/use-toast";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded";
import CollectionsBookmarkRoundedIcon from "@mui/icons-material/CollectionsBookmarkRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Tooltip } from "@nextui-org/react";
import CommentSection, { CommentForm } from "~/components/commentSection";

export default function GamePage() {
  const router = useRouter();
  const { gameId: gameIdQuery } = router.query;
  const gameId = Number(gameIdQuery ?? 1);
  const queueQuery = api.queue.getQueue.useQuery();
  const queue = queueQuery.data;
  const gameQuery = api.gameRouter.getGameById.useQuery(
    { id: gameId },
    { enabled: gameId !== undefined },
  );
  const [isFavorite, setIsFavorite] = useState(false);
  const favoriteQuery = api.favorite.getUserFavoriteGames.useQuery();

  const name = gameQuery.data?.name ?? "";
  const numberOfPlayers = gameQuery.data?.numberOfPlayers ?? "";
  const duration = gameQuery.data?.duration ?? "";
  const description = gameQuery.data?.description ?? "";
  const rules = gameQuery.data?.rules ?? "";

  useEffect(() => {
    if (favoriteQuery.data && gameId) {
      const isGameFavorite = favoriteQuery.data.find(
        (game) => game.gameId === Number(gameId),
      );
      setIsFavorite(!!isGameFavorite);
    }
  }, [favoriteQuery.data, gameId]);

  const [showPlaylistPicker, setShowPlaylistPicker] = useState({
    visible: false,
  });

  const handleShowPlaylistPicker = () => {
    setShowPlaylistPicker({ visible: !showPlaylistPicker.visible });
  };
  const handleGoBack = () => {
    router.back();
  };

  const AddToFavoriteMutation = api.favorite.addGame.useMutation();
  const RemoveFromFavoriteMutation = api.favorite.removeGame.useMutation();
  const { toast } = useToast();

  const ratingQuery = api.rating.getRatingsByGameId.useQuery(
    {
      gameId: gameQuery.data?.gameId ?? -1,
    },
    {
      enabled: gameQuery.data?.gameId !== undefined,
    },
  );

  // if the game query does not return a game, rerout to dashboard
  useEffect(() => {
    if (!gameQuery.data && !gameQuery.isLoading) {
      void router.push("/browse");
    }
  }, [gameQuery.data, gameQuery.isLoading, router]);

  const ratingCalculated = !!ratingQuery.data?.length
    ? ratingQuery.data?.reduce((acc, curr) => acc + curr.starRating, 0) /
      (ratingQuery.data?.length ?? 1)
    : 0;

  const [showManageAccount, setShowManageAccount] = useState({
    visible: false,
  });

  const handleManageAccount = () => {
    setShowManageAccount({ visible: !showManageAccount.visible });
  };

  const useQueueMutation = api.queue.create.useMutation();
  const utils = api.useUtils();

  const handleAddToQueue = async () => {
    if (!gameId || !gameQuery.data) return;
    try {
      await useQueueMutation.mutateAsync({ gameId });
      await utils.queue.getQueue.invalidate();
      handleAddToQueueToast(name);
    } catch {
      toast({
        title: "Obs!",
        description: "kunne ikke legge til i kø",
      });
    }
  };

  const handleFavoritePressed = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (!isFavorite) {
        await AddToFavoriteMutation.mutateAsync({
          gameId: Number(gameId),
        });
        toast({
          title: "Lagt til i favoritter",
          description: "Lek er nå lagt til i dine favoritter",
        });
      } else {
        await RemoveFromFavoriteMutation.mutateAsync({
          gameId: Number(gameId),
        });
        toast({
          title: "Fjernet fra favoritter",
          description: "Lek er nå fjernet fra dine favoritter",
        });
      }
      void gameQuery.refetch();
      void favoriteQuery.refetch();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleAddToQueueToast = (name: string) => {
    toast({
      title: "Lagt til i kø",
      description: name + " er nå lagt til i kø",
    });
  };

  return (
    <>
      <Layout navbarChildren={<MyPlaylists />}>
        <section className="flex h-full max-h-screen w-full min-w-[420px] flex-col justify-start overflow-y-auto rounded-2xl bg-neutral-900 p-4 align-middle">
          <div className="flex justify-between">
            <div className="flex items-center justify-start gap-2 align-middle">
              <button onClick={handleGoBack}>
                <ArrowBackRoundedIcon />
              </button>
              <h2 className="text-2xl font-bold ">{name}</h2>
            </div>
            <SignedIn>
              <div className="flex items-center gap-2">
                {/* <button className="text-rg text-neutral-500 hover:underline"> */}
                <SignOutButton>logg ut</SignOutButton>
                {/* </button> */}
                <button
                  className="text-neutral-500"
                  onClick={handleManageAccount}
                >
                  <ManageAccountsRoundedIcon />
                </button>
              </div>
            </SignedIn>
          </div>

          {/* Title, image section */}
          <div className="relative mt-4 flex h-full w-full flex-col items-start justify-start rounded-xl bg-neutral-800 p-4">
            <div className=" flex h-full min-h-48 w-full items-start">
              <div className="h-full w-full max-w-60">
                <Image
                  className="h-auto w-full rounded-lg"
                  src={Placeholder}
                  placeholder="blur"
                  alt="Game Image"
                  width={200}
                  height={200}
                />
              </div>
              <div className=" flex h-full w-full">
                <div className="mb-4 ml-4 flex h-full flex-col justify-between">
                  <div>
                    <h1 className="text-xxl">{name}</h1>
                    <h2 className="flex items-center align-middle font-normal text-neutral-400">
                      {numberOfPlayers} spillere • {duration} min •{" "}
                      {Number(ratingQuery.data?.length) > 0 ? (
                        <p className="ml-1 flex items-center align-middle">
                          <StarRoundedIcon
                            sx={{ fontSize: 24, marginTop: 0.4 }}
                          />{" "}
                          {parseFloat(ratingCalculated.toFixed(1))}
                        </p>
                      ) : (
                        "Ingen vurderinger"
                      )}
                    </h2>
                    {gameQuery.data?.GameInCategory.map((category) => (
                      <Badge key={category.categoryId}>
                        {category.category.name}
                      </Badge>
                    ))}
                    <h2 className="mt-4 text-rg font-bold text-neutral-500">
                      Beskrivelse
                    </h2>
                    <p className="text-rg font-normal leading-4 text-neutral-300">
                      {description}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2"></div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <div>
                <Tooltip
                  className="rounded-full border border-neutral-700 bg-neutral-900 text-sm text-neutral-300"
                  content="Legg til i lekeliste"
                >
                  <Button
                    onClick={handleShowPlaylistPicker}
                    className="bg-neutral-600 hover:bg-neutral-500"
                  >
                    {showPlaylistPicker.visible ? (
                      <CloseRoundedIcon sx={{ fontsize: 28 }} />
                    ) : (
                      <CollectionsBookmarkRoundedIcon sx={{ fontSize: 26 }} />
                    )}
                  </Button>
                </Tooltip>
              </div>
              <Tooltip
                className="rounded-full border border-neutral-700 bg-neutral-900 text-sm text-neutral-300"
                content="Legg til i kø"
              >
                {queue?.find(
                  (queueItem) => queueItem.game.gameId === gameId,
                ) ? (
                  <Button
                    className="bg-primary hover:bg-violet-500"
                    onClick={handleAddToQueue}
                  >
                    <PlaylistAddCheckRoundedIcon sx={{ fontSize: 28 }} />
                  </Button>
                ) : (
                  <Button
                    className="bg-neutral-600 hover:bg-neutral-500"
                    onClick={handleAddToQueue}
                  >
                    <PlaylistAddRoundedIcon sx={{ fontSize: 28 }} />
                  </Button>
                )}
              </Tooltip>
              <Tooltip
                className="rounded-full border border-neutral-700 bg-neutral-900 text-sm text-neutral-300"
                content="Legg til i favoritter"
              >
                {isFavorite ? (
                  <Button onClick={handleFavoritePressed}>
                    <FavoriteRoundedIcon sx={{ fontSize: 28 }} />
                  </Button>
                ) : (
                  <Button
                    onClick={handleFavoritePressed}
                    className="bg-neutral-600 hover:bg-neutral-500"
                  >
                    <FavoriteRoundedIcon sx={{ fontSize: 28 }} />
                  </Button>
                )}
              </Tooltip>
            </div>
            {showPlaylistPicker.visible && (
              <div className="relative z-10 mt-2 h-auto w-full max-w-[400px]">
                <div className="h-full w-full">
                  <PlaylistPicker
                    gameid={gameQuery.data?.gameId ?? 0}
                    setShowPlaylistPicker={setShowPlaylistPicker}
                  />
                </div>
              </div>
            )}
          </div>
          {/* Rules */}
          <div className="mt-4 flex h-full w-full items-center justify-start rounded-xl bg-neutral-800 py-2">
            <div className="mb-4 ml-4 h-full w-full">
              <h1 className="text-4xl">Regler</h1>
              <p className="text-rg font-normal text-neutral-400">{rules}</p>
            </div>
          </div>
          {/* Rating section */}
          <div className="mt-4 flex h-full w-full items-center justify-start rounded-xl py-2">
            <div className="mb-4 ml-0 mr-0 flex w-full flex-col gap-4">
              <h1 className="text-4xl mb-2 text-neutral-500">Kommentarer</h1>
              {gameId && (
                <CommentForm gameId={gameId} refetch={ratingQuery.refetch} />
              )}
              {gameId && <CommentSection gameId={gameId} />}
            </div>
          </div>
        </section>
      </Layout>

      {showManageAccount.visible && (
        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-neutral-900 bg-opacity-90 p-24 align-middle">
          <UserProfile />
          <button
            className="text-l mt-2 text-neutral-300 hover:underline"
            onClick={handleManageAccount}
          >
            Lukk
          </button>
        </div>
      )}
    </>
  );
}
