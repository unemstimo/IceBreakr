import { useState } from "react";
import Image from "next/image";
import Placeholder from "~/assets/images/placeholder.png";
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
import CommentSection, { CommentForm } from "~/components/commentSection";

export default function GamePage() {
  const router = useRouter();
  const { gameId: gameIdQuery } = router.query;
  const gameId = Number(gameIdQuery ?? 1);
  const gameQuery = api.gameRouter.getGameById.useQuery(
    { id: gameId },
    { enabled: gameId !== undefined },
  );

  const name = gameQuery.data?.name ?? "";
  const numberOfPlayers = gameQuery.data?.numberOfPlayers ?? "";
  const duration = gameQuery.data?.duration ?? "";
  const description = gameQuery.data?.description ?? "";
  const rules = gameQuery.data?.rules ?? "";

  const [showMorePopupComment, setShowMorePopupComment] = useState<{
    visible: boolean;
    commentID: number | null;
  }>({ visible: false, commentID: null });

  const [showPlaylistPicker, setShowPlaylistPicker] = useState({
    visible: false,
  });

  const handleShowPlaylistPicker = () => {
    setShowPlaylistPicker({ visible: !showPlaylistPicker.visible });
  };
  const handleGoBack = () => {
    router.back();
  };

  const ratingQuery = api.rating.getRatingsByGameId.useQuery(
    {
      gameId: gameQuery.data?.gameId ?? -1,
    },
    {
      enabled: gameQuery.data?.gameId !== undefined,
    },
  );

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
  const { toast } = useToast();
  const utils = api.useUtils();

  const handleAddToQueue = async () => {
    if (!gameId) return;
    try {
      await useQueueMutation.mutateAsync({ gameId });
      await utils.queue.getQueue.invalidate();
    } catch {
      toast({
        title: "Obs!",
        description: "kunne ikke legge til i kø",
      });
    }
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
                    <h2 className="font-normal text-neutral-400">
                      {numberOfPlayers} spillere • {duration} minutter
                    </h2>
                    <p className="mt-6 text-md font-normal text-neutral-200">
                      {description}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    {gameQuery.data?.GameInCategory.map((category) => (
                      <Badge key={category.categoryId}>
                        {category.category.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <button className="absolute right-4 top-4 flex min-w-16 items-center justify-center rounded-full bg-violet-500 align-middle">
              <StarRoundedIcon />
              {ratingCalculated}
            </button>
            <div className="flex gap-4 pt-4">
              <div className="relative">
                <Button onClick={handleShowPlaylistPicker}>
                  Legg til i lekeliste
                </Button>
                {showPlaylistPicker.visible && (
                  <div className="absolute z-10 flex items-center justify-center rounded-3xl border-8 bg-neutral-800 p-4">
                    <div className="flex-col items-center justify-center align-middle">
                      <PlaylistPicker
                        gameid={gameQuery.data?.gameId ?? 0}
                        setShowPlaylistPicker={setShowPlaylistPicker}
                      />
                      <button
                        className="-mt-4 w-full align-middle text-rg text-neutral-500 hover:text-neutral-400 hover:underline"
                        onClick={() => {
                          setShowPlaylistPicker({ visible: false });
                        }}
                      >
                        Avbryt
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <Button onClick={handleAddToQueue}>Legg til i kø</Button>
            </div>
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
