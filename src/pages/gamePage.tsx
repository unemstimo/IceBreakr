import Head from "next/head";
import { useState, type FormEvent } from "react";
import { v4 as uuid } from "uuid";
import CreateGame from "~/components/CreateGame";
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
import { type Playlist } from "~/components/playListCard";
import PageWrapper from "~/components/pageWrapper";
import NavigationBar from "~/components/navigationBar";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Link from "next/link";
import router from "next/router";
import Placeholder from "~/assets/images/placeholder.png";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

type Friend = {
  id: string;
  name: string;
};

export default function GamePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { name, playtime, category, players, rules, description, rating } = router.query;

  const [friendsList, setFriendsList] = useState<Friend[]>([]);

  const [comments, setComments] = useState([
    {id: uuid(), author: "Trond", comment: "Dette var en kul lek!", rating: 4},
    {id: uuid(), author: "Mats", comment: "Dette var en DRITT lek!", rating: 1}
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

  const handleAddPlaylist = () => {
    const newID = uuid();
    console.log("Add Playlist");
    const newPlaylist = {
      id: newID,
      name: "Lekeliste " + newID.slice(0, 4),
      numberOfGames: 0,
      author: "Meg",
    };
    setPlaylists([...playlists, newPlaylist]);
  };

  const handleRemovePlaylist = (playlistId: string) => {
    console.log("Remove Playlist" + playlistId);
    const newPlaylists = playlists.filter((list) => list.id !== playlistId);
    setPlaylists(newPlaylists);
    handleShowMorePopupPlaylist(null);
  };

  const handlePlaylistClick = () => {
    console.log("Playlist clicked");
  };

  const [showCreateGame, setShowCreateGame] = useState({ visible: false });

  const handleCreateGameShow = () => {
    setShowCreateGame({ visible: !showCreateGame.visible });
  };

  const handleCancelCreateGame = () => {
    setShowCreateGame({ visible: false });
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
        {/* <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 font-darker text-lg font-bold text-white">
        <div className="max-w-screen-l relative flex h-screen w-full max-w-[1440px] rounded-3xl bg-neutral-950"> */}
        <div className="ml-2 flex flex-col h-auto">
        <NavigationBar>
          <div className="flex h-full w-full flex-col justify-start rounded-2xl bg-neutral-900 p-2 align-middle">
            <div className="flex flex-row items-baseline justify-between align-baseline">
              <h2 className="text-2xl font-bold ">Mine Lekelister</h2>
              <button
                className="text-l text-neutral-500 hover:underline"
                onClick={handleAddPlaylist}
              >
                Lag ny
              </button>
            </div>
            <ul className="relative mt-5 w-full">
              {playlists.map((list) => (
                <li key={list.id} className="mb-2 flex h-16">
                  <button
                    className="flex h-full w-full items-center justify-between gap-4 rounded-xl border border-neutral-800 p-2 align-middle hover:bg-neutral-700"
                    onClick={handlePlaylistClick}
                  >
                    <div className="flex items-center justify-start gap-4 align-middle">
                      <PlayCircleOutlineRoundedIcon />
                      <div className="flex flex-col items-start justify-start align-middle">
                        <p className="-mb-2">{list.name}</p>
                        <p className="font-normal text-neutral-400">
                          {list.numberOfGames} leker • {list.author}
                        </p>
                      </div>
                    </div>
                    <button
                      className="w-12"
                      onClick={() => handleShowMorePopupPlaylist(list.id)}
                    >
                      <MoreHorizRoundedIcon />
                    </button>
                    {showMorePopupPlaylist.visible &&
                      showMorePopupPlaylist.playlistId === list.id && (
                        <div className="absolute right-0 top-0 flex w-48 flex-col items-center justify-center gap-4 rounded-xl bg-neutral-800 px-6 py-4 align-middle">
                          {/* Popup content here */}
                          <p>{list.name}</p>
                          <button
                            onClick={() => handleRemovePlaylist(list.id)}
                            className="rounded-lg bg-red-500 px-4 py-1 hover:bg-red-400 active:bg-red-600"
                          >
                            {" "}
                            Slett
                          </button>
                          <button
                            onClick={() => handleShowMorePopupPlaylist(list.id)}
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
            {playlists.length === 0 && (
              <div className="font-normal text-neutral-400">
                <p>Ingen lekelister enda 🧐</p>
                <div className="flex gap-1">
                  <p>Fiks det ved å</p>
                  <button
                    onClick={handleAddPlaylist}
                    className="font-bold text-violet-400 hover:text-violet-300"
                  >
                    lage en lekeliste
                  </button>
                </div>
              </div>
            )}
          </div>
        </NavigationBar>
        </div>
        <SignedOut>
          <div className="flex grow items-center justify-center">
            <SignInButton>Logg inn eller opprett en bruker.</SignInButton>
          </div>
        </SignedOut>
        <SignedIn>
          {/* Middle section */}
          <section className=" flex h-full w-full min-w-[420px] flex-col justify-start max-h-screen overflow-y-auto rounded-2xl bg-neutral-900 p-4 align-middle">
            <div className="flex justify-between">
              <div className="flex gap-2 justify-start align-middle items-center">
                <Link href="/browse"><ArrowBackRoundedIcon/></Link>
                <h2 className="text-2xl font-bold ">{name}</h2>
              </div>
              <div className="flex items-center gap-2">
                <button>
                  <SignOutButton>logg ut</SignOutButton>
                </button>
                <button onClick={handleManageAccount}>
                  <ManageAccountsRoundedIcon />
                </button>
              </div>
            </div>
            {/* Title, image section */}
            <div className="relative mt-4 flex-col flex h-full w-full items-start justify-start rounded-xl bg-neutral-800 p-4">
              <div className="flex min-h-48 w-full h-full items-start">
                <div className="w-full h-full max-w-60">
                  <Image
                  className="h-auto w-full rounded-lg"
                  src={Placeholder}
                  alt="Game Image"
                  width={200}
                  height={200}
                  />
                </div>
                <div className="mb-4 ml-4">
                  <h1 className="text-6xl">{name}</h1>
                  <h2 className="text-neutral-400">{category} • {players} spillere • {playtime}</h2>
                  <p className="font-normal text-neutral-200">{description}</p>
                </div>
              </div>
              <button className="absolute right-4 top-4 flex min-w-16 items-center justify-center rounded-full bg-violet-500 align-middle">
                <StarRoundedIcon />
                {rating}
              </button>
            </div>
            {/* Rules */}
            <div className="mt-4 py-2 flex h-full w-full items-center justify-start rounded-xl bg-neutral-800">
              <div className="mb-4 ml-4 w-full h-full">
                <h1 className="text-4xl">Regler</h1>
                <p className="font-normal text-neutral-400">{rules}</p>
              </div> 
            </div>
            {/* Rating section */}
            <div className="mt-4 py-2 flex h-full w-full items-center justify-start rounded-xl">
              <div className="mb-4 ml-0 mr-0 w-full">
                <h1 className="text-4xl mb-2 text-neutral-500">Kommentarer</h1>
                <div>
                  <form
                    onSubmit={handleCommentSubmit}
                    className="flex w-full h-full items-center justify-start gap-4 align-middle mb-4"
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
                      className="rounded-full h-full bg-violet-500 px-4 py-1 hover:bg-violet-400 active:bg-violet-600"
                    >
                      Post
                    </button>
                  </form>
                </div>
                <ul className="flex w-full flex-col gap-4 items-center align-middle justify-start">
                  {comments.map((comment) => (
                    // eslint-disable-next-line react/jsx-key
                    <li className="relative rounded-lg bg-neutral-800 flex h-full w-full gap-4 p-4 justify-between align-middle items-center">
                        <div className="flex items-center gap-4 h-full">
                          <UserButton/>
                          <div className="px-3 py-0 flex items-center justify-center bg-violet-500 rounded-full">
                          <StarRoundedIcon />
                          {comment.rating}
                        </div>
                          <div className="flex flex-col items-start justify-start">
                            <h2 className="-mb-1">{comment.author}</h2>
                            <p className="-mt-1 font-normal text-neutral-400">{comment.comment}</p>
                          </div>
                        </div>
                        <button onClick={() => handleMoreCommentButton(comment.id)}><MoreHorizRoundedIcon/></button>
                        {showMorePopupComment.visible &&
                      showMorePopupComment.commentID === comment.id && (
                        <div className="absolute right-0 top-0 flex w-full h-full flex-row items-center justify-center gap-4 rounded-xl bg-neutral-700 px-6 py-4 align-middle">
                          {/* Popup content here */}
                          <p>{comment.author}</p>
                          <button
                            onClick={() => handleRemovePlaylist(comment.id)}
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
        </SignedIn>

        {showCreateGame.visible && (
          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-neutral-900 bg-opacity-90 align-middle">
            <CreateGame />
            <button
              className="text-l mt-2 text-neutral-300 hover:underline"
              onClick={handleCancelCreateGame}
            >
              Avbryt
            </button>
          </div>
        )}
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
