import Head from "next/head";
import Link from "next/link";
import { useState, FormEvent, useEffect } from "react";
import { v4 as uuid } from "uuid";

import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Container } from "postcss";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import SearchIcon from "@mui/icons-material/Search";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const [friendsList, setFriendsList] = useState([
    { id: uuid(), name: "Friend " + uuid().slice(0, 4) },
    { id: uuid(), name: "Friend " + uuid().slice(0, 4) },
    { id: uuid(), name: "Friend " + uuid().slice(0, 4) },
  ]);

  const [showMorePopup, setShowMorePopup] = useState<{
    visible: boolean;
    friendId: string | null;
  }>({ visible: false, friendId: null });

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

  const [playlists, setPlaylists] = useState([
    {
      id: uuid(),
      name: "Lekeliste " + uuid().slice(0, 4),
      numberOfGames: 5,
      author: "Meg ",
    },
    {
      id: uuid(),
      name: "Lekeliste " + uuid().slice(0, 4),
      numberOfGames: 12,
      author: "Venn " + uuid().slice(0, 4),
    },
    {
      id: uuid(),
      name: "Lekeliste " + uuid().slice(0, 4),
      numberOfGames: 512,
      author: "Venn " + uuid().slice(0, 4),
    },
  ]);

  const [showMorePopupPlaylist, setShowMorePopupPlaylist] = useState<{
    visible: boolean;
    playlistId: string | null;
  }>({
    visible: false,
    playlistId: null,
  });

  const handleShowMorePopupPlaylist = (playlistId: string | null) => {
    setShowMorePopupPlaylist({
      visible: !showMorePopupPlaylist.visible,
      playlistId,
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

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Search Term:", searchTerm);
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

      <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 font-darker text-lg font-bold text-white">
        <SignedOut>
          <SignInButton />
          <p>
            This content is public. Only signed out users can see the
            SignInButton above this text.
          </p>
        </SignedOut>
        <SignedIn>
          <div className="max-w-screen-l flex h-screen w-full rounded-3xl bg-neutral-950">
            {/* Left section */}
            <section className="m-2 flex h-full w-1/4 min-w-72 flex-col justify-start rounded-2xl p-0 align-middle">
              <div className="mb-2 flex h-full max-h-40 w-full flex-col justify-center rounded-2xl bg-neutral-900 p-4 align-middle">
                <button className="flex h-full w-full items-center justify-start gap-4 rounded-xl p-2 align-middle hover:bg-neutral-700">
                  {" "}
                  <UserButton /> Min Profil
                </button>
                <button className="flex h-full w-full items-center justify-start gap-4 rounded-xl p-2 align-middle hover:bg-neutral-700">
                  <HomeRoundedIcon />
                  Hjem
                </button>
              </div>
              <div className="mb-2 flex h-full w-full flex-col justify-start rounded-2xl bg-neutral-900 p-4 align-middle">
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
                    <li key={list.id} className="flex h-16">
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
                                onClick={() =>
                                  handleShowMorePopupPlaylist(list.id)
                                }
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
            </section>

            {/* Middle section */}
            <section className="my-2 flex h-full w-full min-w-[420px] flex-col justify-start rounded-2xl bg-neutral-900 p-4 align-middle">
              {/* Search section */}
              <div className="flex w-full flex-row items-center justify-between align-middle">
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex w-2/3 items-center overflow-hidden rounded-full bg-neutral-800 p-1 align-middle font-normal text-neutral-600"
                >
                  <button type="submit" className="p-2">
                    <SearchIcon className="text-neutral-500" />
                  </button>
                  <input
                    className="w-full bg-neutral-800 py-2 pl-2 pr-2 text-white focus:outline-none"
                    type="search" // Changed to search to improve semantics
                    placeholder="Søk..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </form>
                <Link href="/browse">
                  <button className=" rounded-full bg-violet-600 px-4 py-2 text-white shadow-lg hover:bg-violet-500 active:bg-violet-800">
                    Bla Gjennom
                  </button>
                </Link>
              </div>
              {/* Ad section */}
              <div className="mt-4 flex min-h-60 w-full items-center justify-center rounded-xl bg-neutral-800">
                <p>Ad Space</p>
              </div>
              {/* Content section */}
              <div className="mt-4 flex h-full w-full items-center justify-center rounded-xl bg-neutral-800">
                <p>Content</p>
              </div>
            </section>

            {/* Right section */}
            <section className="m-2 flex w-1/4 min-w-72 flex-col justify-start rounded-2xl align-middle">
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
              <button className="flex h-24 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 p-2 align-middle hover:bg-violet-500 active:bg-violet-800">
                OPPRETT LEK
                <AddCircleOutlineRoundedIcon />
              </button>
            </section>
          </div>
        </SignedIn>
      </main>
    </div>
  );
}
