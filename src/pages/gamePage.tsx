import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import Placeholder from "~/assets/images/placeholder.png";
import {
  SignOutButton,
  SignedIn as SignedIn,
  UserButton,
  UserProfile,
  useUser,
} from "@clerk/nextjs";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import PageWrapper from "~/components/pageWrapper";
import NavigationBar from "~/components/navigationBar";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useRouter } from "next/router";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { api } from "~/utils/api";
import { Badge } from "~/components/ui/badge";
import PlaylistPicker from "~/components/playlistPicker";
import MyFriendsBar from "~/components/myFriendsBar";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import MyPlaylists from "~/components/myPlaylists";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "~/components/ui/button";

export default function GamePage() {
  const router = useRouter();
  const { gameId } = router.query;
  const userId = useUser().user?.id;
  const gameQuery = api.gameRouter.getGameById.useQuery(
    { id: Number(gameId ?? 1) },
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

  const [showManageAccount, setShowManageAccount] = useState({
    visible: false,
  });

  const handleManageAccount = () => {
    setShowManageAccount({ visible: !showManageAccount.visible });
  };

  const handleMoreCommentButton = (commentID: number | null) => {
    setShowMorePopupComment({
      commentID,
      visible: !showMorePopupComment.visible,
    });
  };

  const [showPlaylistPicker, setShowPlaylistPicker] = useState({
    visible: false,
  });

  const handleShowPlaylistPicker = () => {
    setShowPlaylistPicker({ visible: !showPlaylistPicker.visible });
  };
  const handleGoBack = () => {
    router.back();
  };

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number>();
  const useRating = api.rating.create.useMutation();
  const useDeleteRating = api.rating.delete.useMutation();

  const ratingQuery = api.rating.getRatingsByGameId.useQuery(
    {
      gameId: gameQuery.data?.gameId ?? -1,
    },
    {
      enabled: gameQuery.data?.gameId !== undefined,
    },
  );

  const ratingRandom = !!ratingQuery.data?.length
    ? ratingQuery.data?.reduce((acc, curr) => acc + curr.starRating, 0) /
      (ratingQuery.data?.length ?? 1)
    : 0;

  const handleCommentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (comment === "" || !rating || !gameQuery.data?.gameId) {
      return;
    }

    try {
      await useRating.mutateAsync({
        gameId: gameQuery.data?.gameId,
        starRating: rating,
        description: comment,
      });
      setComment("");
      setRating(undefined);
      await ratingQuery.refetch();
    } catch (e) {
      console.error("Error submitting rating: ", e);
    }
  };

  const handleDeleteComment = async (ratingId: number) => {
    try {
      await useDeleteRating.mutateAsync({ ratingId });
      await ratingQuery.refetch();
    } catch (e) {
      console.error("Error deleting rating: ", e);
    }
  };

  return (
    <div>
      <Head>
        <title>Dashboard | IceBreakr</title>
        <meta
          name="dashboard"
          content="Learn more about what IceBreakr offers."
        />
      </Head>

      <PageWrapper>
        <NavigationBar>
          <MyPlaylists />
        </NavigationBar>
        {/* Middle section */}
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
                      {numberOfPlayers} spillere • {duration}
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
              {ratingRandom}
            </button>
            <div className="relative">
              <button
                onClick={handleShowPlaylistPicker}
                className="mt-4 flex min-w-16 items-center justify-center rounded-full bg-violet-500 px-4 py-2 align-middle text-rg"
              >
                Legg til i lekeliste
              </button>
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
            <div className="mb-4 ml-0 mr-0 w-full">
              <h1 className="text-4xl mb-2 text-neutral-500">Kommentarer</h1>
              <div>
                <form
                  onSubmit={handleCommentSubmit}
                  className="mb-4 flex h-full w-full items-center justify-start gap-4 align-middle text-rg font-normal"
                >
                  <Input
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                  />
                  <Select
                    value={rating ? String(rating) : undefined}
                    onValueChange={(val) => {
                      setRating(Number(val));
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((_, i) => (
                        <SelectItem key={i} value={String(i + 1)}>
                          <div key={i} className="ietms-center flex gap-2">
                            <p>{i + 1}</p>
                            <StarIcon className="text-white" />
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button type="submit">Post</Button>
                </form>
              </div>
              <ul className="flex w-full flex-col items-center justify-start gap-4 align-middle text-rg">
                {ratingQuery.data?.map((comment) => (
                  // eslint-disable-next-line react/jsx-key
                  <li
                    key={comment.ratingId}
                    className="relative flex h-full w-full items-center justify-between gap-4 rounded-lg bg-neutral-800 p-4 align-middle"
                  >
                    <div className="flex h-full items-center gap-4">
                      <UserButton />
                      <div className="flex items-center justify-center rounded-full bg-violet-500 px-3 py-0">
                        <StarRoundedIcon />
                        {comment.starRating}
                      </div>
                      <div className="flex flex-col items-start justify-start">
                        <h2 className="-mb-1">{comment.user.username}</h2>
                        <p className="-mt-1 font-normal text-neutral-400">
                          {comment.description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleMoreCommentButton(comment.ratingId)}
                    >
                      <MoreHorizRoundedIcon />
                    </button>
                    {showMorePopupComment.visible &&
                      showMorePopupComment.commentID === comment.ratingId && (
                        <div className="absolute right-0 top-0 flex h-full w-full flex-row items-center justify-center gap-4 rounded-xl bg-neutral-700 px-6 py-4 align-middle">
                          {/* Popup content here */}
                          <p>{comment.user.username}</p>
                          <button
                            onClick={() => 1}
                            className="rounded-lg bg-red-500 px-4 py-1 hover:bg-red-400 active:bg-red-600"
                          >
                            Rapporter
                          </button>
                          {userId === comment.user.userId && (
                            <Button
                              onClick={() =>
                                handleDeleteComment(comment.ratingId)
                              }
                              variant={"destructive"}
                            >
                              Slett
                            </Button>
                          )}
                          <button
                            onClick={() => {
                              if (comment.ratingId) {
                                handleMoreCommentButton(comment.ratingId);
                              }
                            }}
                          >
                            <p className="absolute right-2 top-1 text-neutral-400 hover:underline">
                              <CloseRoundedIcon />
                            </p>
                          </button>
                        </div>
                      )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <MyFriendsBar />

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
      </PageWrapper>
    </div>
  );
}
