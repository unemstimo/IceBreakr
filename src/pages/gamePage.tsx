import Head from "next/head";
import { useState, type FormEvent } from "react";
import { v4 as uuid } from "uuid";
import Image from "next/image";

import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  UserProfile,
} from "@clerk/nextjs";

import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import PageWrapper from "~/components/pageWrapper";
import NavigationBar from "~/components/navigationBar";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Link from "next/link";
import { useRouter } from "next/router";
import Placeholder from "~/assets/images/placeholder.png";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { api } from "~/utils/api";
import { Badge } from "~/components/ui/badge";
import { Playlist } from "~/server/api/routers/playlist";
import MyPlaylists from "~/components/myPlaylists";
import PlaylistPicker from "~/components/playlistPicker";

type Friend = {
  id: string;
  name: string;
};
// type Game = inferProcedureOutput<AppRouter["gameRouter"]["getGameById"]>;

export default function GamePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { gameId } = router.query;
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  const gameQuery = api.gameRouter.getGameById.useQuery(
    { id: Number(gameId ?? 1) },
    { enabled: gameId !== undefined },
  );
  console.log(gameQuery.data);

  const name = gameQuery.data?.name ?? "";
  const numberOfPlayers = gameQuery.data?.numberOfPlayers ?? "";
  const duration = gameQuery.data?.duration ?? "";
  const description = gameQuery.data?.description ?? "";
  const rules = gameQuery.data?.rules ?? "";
  // TODO add ratings and categories to game via relations
  const category = "Kortspill";
  const rating = Math.floor(Math.random() * 5) + 1;

  const [friendsList, setFriendsList] = useState<Friend[]>([]);

  const [comments, setComments] = useState([
    {
      id: uuid(),
      author: "Trond",
      comment: "Dette var en kul lek!",
      rating: 4,
    },
    {
      id: uuid(),
      author: "Mats",
      comment: "Dette var en DRITT lek!",
      rating: 1,
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const [showMorePopup, setShowMorePopup] = useState<{
    visible: boolean;
    friendId: string | null;
  }>({ visible: false, friendId: null });

  const [showMorePopupComment, setShowMorePopupComment] = useState<{
    visible: boolean;
    commentID: string | null;
  }>({ visible: false, commentID: null });

  const handleShowMorePopup = (friendId: string | null) => {
    setShowMorePopup({ visible: !showMorePopup.visible, friendId });
  };

  const handleAddFriend = () => {
    const newID = uuid();
    console.log("Add Friend");
    const newFriend = { id: newID, name: "Friend " + newID.slice(0, 4) };
    setFriendsList([...friendsList, newFriend]);
  };

  const handleRemoveFriend = (friendId: string) => {
    console.log("Remove Friend");
    const newFriendsList = friendsList.filter(
      (friend) => friend.id !== friendId,
    );
    setFriendsList(newFriendsList);
    handleShowMorePopup(null);
  };

  const handleFriendsButton = () => {
    console.log("Friend clicked");
  };

  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const [showMorePopupPlaylist, setShowMorePopupPlaylist] = useState<{
    visible: boolean;
    playlistId: string | null;
  }>({
    visible: false,
    playlistId: null,
  });

  const handleShowMorePopupPlaylist = (playlistId: string | null) => {
    setShowMorePopupPlaylist({
      playlistId,
      visible: !showMorePopupPlaylist.visible,
    });
  };

  const [showManageAccount, setShowManageAccount] = useState({
    visible: false,
  });

  const handleManageAccount = () => {
    setShowManageAccount({ visible: !showManageAccount.visible });
  };

  const handleMoreCommentButton = (commentID: string | null) => {
    setShowMorePopupComment({
      commentID,
      visible: !showMorePopupComment.visible,
    });
  };

  function handleCommentSubmit(_event: FormEvent<HTMLFormElement>): void {
    console.log("Comment submitted: " + newComment);
  }

  const [showPlaylistPicker, setShowPlaylistPicker] = useState({
    visible: false,
  });

  const handleShowPlaylistPicker = () => {
    setShowPlaylistPicker({ visible: !showPlaylistPicker.visible });
  }

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
        <div className="ml-2 flex h-auto flex-col">
          <NavigationBar>
            <MyPlaylists />
          </NavigationBar>
        </div>
        {/* Middle section */}
        <section className="flex h-full max-h-screen w-full min-w-[420px] flex-col justify-start overflow-y-auto rounded-2xl bg-neutral-900 p-4 align-middle">
          <div className="flex justify-between">
            <div className="flex items-center justify-start gap-2 align-middle">
              <Link href="/browse">
                <ArrowBackRoundedIcon />
              </Link>
              <h2 className="text-2xl font-bold ">{name}</h2>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-neutral-500 hover:underline text-rg">
                <SignOutButton>logg ut</SignOutButton>
              </button>
              <button className="text-neutral-500" onClick={handleManageAccount}>
                <ManageAccountsRoundedIcon />
              </button>
            </div>
          </div>
          {/* Title, image section */}
          <div className="relative mt-4 flex h-full w-full flex-col items-start justify-start rounded-xl bg-neutral-800 p-4">
            <div className=" flex h-full min-h-48 w-full items-start">
              <div className="h-full w-full max-w-60">
                <Image
                  className="h-auto w-full rounded-lg"
                  src={Placeholder}
                  alt="Game Image"
                  width={200}
                  height={200}
                />
              </div>
              <div className=" flex h-full w-full">
                <div className="mb-4 ml-4 flex h-full flex-col justify-between">
                  <div>
                    <h1 className="text-xxl">{name}</h1>
                    <h2 className="text-neutral-400 font-normal">
                      {numberOfPlayers} spillere • {duration}
                    </h2>
                    <p className="mt-6 font-normal text-md text-neutral-200">
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
              {rating}
            </button>
            <button
            onClick={handleShowPlaylistPicker}
            className="absolute text-rg right-4 bottom-4 px-4 py-2 flex min-w-16 items-center justify-center rounded-full bg-violet-500 align-middle">
              Legg til i lekeliste
            </button>
          </div>
          {/* Rules */}
          <div className="mt-4 flex h-full w-full items-center justify-start rounded-xl bg-neutral-800 py-2">
            <div className="mb-4 ml-4 h-full w-full">
              <h1 className="text-4xl">Regler</h1>
              <p className="font-normal text-rg text-neutral-400">{rules}</p>
            </div>
          </div>
          {/* Rating section */}
          <div className="mt-4 flex h-full w-full items-center justify-start rounded-xl py-2">
            <div className="mb-4 ml-0 mr-0 w-full">
              <h1 className="text-4xl mb-2 text-neutral-500">Kommentarer</h1>
              <div>
                <form
                  onSubmit={handleCommentSubmit}
                  className="mb-4 font-normal text-rg flex h-full w-full items-center justify-start gap-4 align-middle"
                >
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Skriv din kommentar her..."
                    className="w-full rounded-full bg-neutral-800 py-2 pl-3 pr-3 text-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="h-full font-bold rounded-full bg-violet-500 px-4 py-1 hover:bg-violet-400 active:bg-violet-600"
                  >
                    Post
                  </button>
                </form>
              </div>
              <ul className="flex w-full flex-col items-center justify-start gap-4 align-middle">
                {comments.map((comment) => (
                  // eslint-disable-next-line react/jsx-key
                  <li className="relative flex h-full w-full items-center justify-between gap-4 rounded-lg bg-neutral-800 p-4 align-middle">
                    <div className="flex h-full items-center gap-4">
                      <UserButton />
                      <div className="flex items-center justify-center rounded-full bg-violet-500 px-3 py-0">
                        <StarRoundedIcon />
                        {comment.rating}
                      </div>
                      <div className="flex flex-col items-start justify-start">
                        <h2 className="-mb-1">{comment.author}</h2>
                        <p className="-mt-1 font-normal text-neutral-400">
                          {comment.comment}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => handleMoreCommentButton(comment.id)}>
                      <MoreHorizRoundedIcon />
                    </button>
                    {showMorePopupComment.visible &&
                      showMorePopupComment.commentID === comment.id && (
                        <div className="absolute right-0 top-0 flex h-full w-full flex-row items-center justify-center gap-4 rounded-xl bg-neutral-700 px-6 py-4 align-middle">
                          {/* Popup content here */}
                          <p>{comment.author}</p>
                          <button
                            onClick={() => 1}
                            className="rounded-lg bg-red-500 px-4 py-1 hover:bg-red-400 active:bg-red-600"
                          >
                            {" "}
                            Rapporter
                          </button>
                          <button
                            onClick={() => handleMoreCommentButton(comment.id)}
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

        {/* Right section */}
        <section className="mr-2 flex w-1/4 min-w-72 flex-col justify-start rounded-2xl align-middle">
          <div className="mb-2 flex h-fit w-full flex-col justify-center rounded-2xl bg-neutral-900 p-4 align-middle">
            <div className="flex flex-row items-baseline justify-between align-baseline">
              <h2 className="text-2xl font-bold ">Venner</h2>
              <button
                className="text-l text-neutral-500 hover:underline"
                onClick={handleAddFriend}
              >
                Legg til
              </button>
            </div>
            <ul className="relative mt-5 w-full">
              {friendsList.map((friend) => (
                <li key={friend.id} className="flex h-16">
                  <button
                    className="flex h-full w-full items-center justify-between gap-4 rounded-xl p-2 align-middle hover:bg-neutral-700"
                    onClick={handleFriendsButton}
                  >
                    <div className="flex items-center justify-start gap-4 align-middle">
                      <FaceRoundedIcon /> {friend.name}
                    </div>
                    <button
                      className="w-12"
                      onClick={() => handleShowMorePopup(friend.id)}
                    >
                      <MoreHorizRoundedIcon />
                    </button>
                    {showMorePopup.visible &&
                      showMorePopup.friendId === friend.id && (
                        <div className="absolute right-0 top-0 flex w-48 flex-col items-center justify-center gap-4 rounded-xl bg-neutral-800 px-6 py-4 align-middle">
                          {/* Popup content here */}
                          <p>{friend.name}</p>
                          <button
                            onClick={() => handleRemoveFriend(friend.id)}
                            className="rounded-lg bg-red-500 px-4 py-1 hover:bg-red-400 active:bg-red-600"
                          >
                            {" "}
                            Fjern
                          </button>
                          <button
                            onClick={() => handleShowMorePopup(friend.id)}
                          >
                            <p className="absolute right-2 top-1 text-neutral-400 hover:underline">
                              <CloseRoundedIcon />
                            </p>
                          </button>
                        </div>
                      )}
                  </button>
                </li>
              ))}
            </ul>
            {friendsList.length === 0 && (
              <div className="font-normal text-neutral-400">
                <p>Ingen venner enda 😭</p>
                <div className="flex gap-1">
                  <p>Fiks det ved å</p>
                  <button
                    onClick={handleAddFriend}
                    className="font-bold text-violet-400 hover:text-violet-300"
                  >
                    legge til en venn
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

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
        {showPlaylistPicker.visible && (
          <div onClick={()=>{setShowPlaylistPicker({visible: false})}}
          className="absolute flex justify-center bg-neutral-950/90 items-center h-screen w-screen">
            <div className="flex-col justify-center items-center align-middle">
              <PlaylistPicker />
            </div>
          </div>
        )}
      </PageWrapper>
    </div>
  );
}
