import Head from "next/head";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { v4 as uuid } from "uuid";
import CreateGame from "~/components/CreateGame";
import Advertisement from "~/components/advertisement";
import { useUser } from "@clerk/nextjs";

import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import SearchIcon from "@mui/icons-material/Search";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PlayListCard, { type Playlist } from "~/components/playListCard";
import PageWrapper from "~/components/pageWrapper";
import NavigationBar from "~/components/navigationBar";

type Friend = {
  id: string;
  name: string;
};

export default function Dashboard() {
  const user = useUser();
  const [searchTerm, setSearchTerm] = useState("");

  const [friendsList, setFriendsList] = useState<Friend[]>([]);

  const [showMorePopup, setShowMorePopup] = useState({
    visible: false,
    friendId: null,
  });

  const handleShowMorePopup = (friendId: string | null) => {
    setShowMorePopup({ visible: !showMorePopup.visible, friendId: null });
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

  const [showCreateGame, setShowCreateGame] = useState({ visible: false });

  const handleCreateGameShow = () => {
    setShowCreateGame({ visible: !showCreateGame.visible });
  };

  const handleCancelCreateGame = () => {
    setShowCreateGame({ visible: false });
  };

  // TODO: Replace with actual data from the backend
  const publicPlaylists: Playlist[] = [
    {
      id: "1",
      name: "Lekeliste 1",
      numberOfGames: 3,
      author: "Ola Nordmann",
      description: "En lekeliste med 3 leker",
    },
    {
      id: "2",
      name: "Lekeliste 2",
      numberOfGames: 5,
      author: "Kari Nordmann",
      description: "En lekeliste med 5 leker",
    },
  ];

  return (
    <div>
      <Head>
        <title>Dashboard | IceBreakr</title>
        <meta
          name="dashboard"
          content="Learn more about what IceBreakr offers."
        />
      </Head>

      {/* <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 font-darker text-lg font-bold text-white">
        <div className="max-w-screen-l relative flex h-screen w-full max-w-[1440px] rounded-3xl bg-neutral-950"> */}
      {/* Left section */}
      <PageWrapper>
        <NavigationBar>
          <div className="mb-0 flex h-full w-full flex-col justify-start rounded-2xl bg-neutral-900 p-4 align-middle">
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

        {/* Middle section */}
        <section className="flex h-full w-full min-w-[420px] flex-col justify-start rounded-2xl bg-neutral-900 p-4 align-middle">
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
                Utforsk
              </button>
            </Link>
          </div>
          {/* Content section */}
          <div className="mt-4 h-full w-full">
            <h3>Lekelister for {user.user?.username}</h3>
            <div className="flex gap-6">
              {publicPlaylists.map((playlist) => {
                return <PlayListCard key={playlist.id} playlist={playlist} />;
              })}
            </div>
          </div>
          {/* Ad section */}
          <p className="mt-4 font-normal text-neutral-500">Annonse</p>
          <div className="flex min-h-60 w-full items-center justify-center overflow-hidden rounded-xl bg-neutral-800">
            <Advertisement />
          </div>
        </section>

        {/* Right section */}
        <section className="m-2 flex w-1/4 min-w-72 flex-col justify-start rounded-2xl align-middle">
          <div className="flex h-fit w-full flex-col justify-center rounded-2xl bg-neutral-900 p-4 align-middle">
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
        {/* </div>
      </main> */}
      </PageWrapper>
    </div>
  );
}
