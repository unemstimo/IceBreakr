import Head from "next/head";
import Link from "next/link";
import { useState, FormEvent, useEffect } from "react";
import { v4 as uuid } from "uuid";
import CreateGame from '~/components/CreateGame';
import Advertisement from '~/components/advertisement';

import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Container } from "postcss";

<<<<<<< HEAD
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FaceRoundedIcon from '@mui/icons-material/FaceRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import SearchIcon from '@mui/icons-material/Search';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
=======
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import SearchIcon from "@mui/icons-material/Search";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
>>>>>>> ac01f305b425eade68dc45503ae4efb5223a20d3

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const [friendsList, setFriendsList] = useState([
    { id: uuid(), name: "Friend " + uuid().slice(0, 4) },
    { id: uuid(), name: "Friend " + uuid().slice(0, 4) },
    { id: uuid(), name: "Friend " + uuid().slice(0, 4) },
  ]);

<<<<<<< HEAD
    const [friendsList, setFriendsList] = useState([
    ]);
=======
  const [showMorePopup, setShowMorePopup] = useState<{
    visible: boolean;
    friendId: string | null;
  }>({ visible: false, friendId: null });
>>>>>>> ac01f305b425eade68dc45503ae4efb5223a20d3

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

<<<<<<< HEAD
    const handleRemoveFriend = (friendId) => {
        console.log("Remove Friend");
        const newFriendsList = friendsList.filter(friend => friend.id !== friendId);
        setFriendsList(newFriendsList);
        handleShowMorePopup(null);
    };

    const handleFriendsButton = () => {
        console.log("Friend clicked");
    };
    

    const [playlists, setPlaylists] = useState([
    ]);

    const [showMorePopupPlaylist, setShowMorePopupPlaylist] = useState({ visible: false, playlistId: null });

    const handleShowMorePopupPlaylist = (playlistId: string | null) => {
        setShowMorePopupPlaylist({ visible: !showMorePopupPlaylist.visible, playlistId});
    };

    const handleAddPlaylist = () => {
        const newID = uuid();
        console.log("Add Playlist");
        const newPlaylist = { id: newID, name: 'Lekeliste ' + newID.slice(0,4), numberOfGames: 0, author: 'Meg'};
        setPlaylists([...playlists, newPlaylist]);
    };

    const handleRemovePlaylist = (playlistId) => {
        console.log("Remove Playlist" + playlistId);
        const newPlaylists = playlists.filter(list => list.id !== playlistId);
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
=======
  const handlePlaylistClick = () => {
    console.log("Playlist clicked");
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Search Term:", searchTerm);
  };
>>>>>>> ac01f305b425eade68dc45503ae4efb5223a20d3

    const [showCreateGame, setShowCreateGame] = useState({ visible: false});

    const handleCreateGameShow = () => {
      setShowCreateGame({ visible: !showCreateGame.visible});
    };

    const handleCancelCreateGame = () => {
        setShowCreateGame({ visible: false});
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
<<<<<<< HEAD
            <div className='relative flex w-full max-w-screen-l max-w-[1440px] h-screen bg-neutral-950 rounded-3xl'>
                {/* Left section */}
                <section className='rounded-2xl flex-col w-1/4 min-w-72 h-full flex align-middle justify-start p-0 m-2'>
                    <div className='rounded-2xl w-full h-fit max-h-40 bg-neutral-900 flex flex-col align-middle justify-center p-4 mb-2'>
                        <Link href={"/profile"} className='w-full h-full'>
                          <button className='w-full h-full hover:bg-neutral-700 flex align-middle items-center justify-start gap-4 rounded-xl p-2'>
                            <UserButton/> Min Profil
                          </button>
                        </Link>
                        <Link href={"/dashboard"} className='w-full h-full'>
                          <button className='w-full h-full hover:bg-neutral-700 flex align-middle items-center justify-start gap-4 rounded-xl p-2'>
                            <HomeRoundedIcon />Hjem
                          </button>
                        </Link>
                    </div>
                    <button onClick={handleCreateGameShow} className='w-full h-20 min-h-20 bg-violet-600 hover:bg-violet-500 active:bg-violet-800 flex align-middle items-center justify-center gap-2 rounded-xl p-2 mb-2'>
                        OPPRETT LEK<AddCircleOutlineRoundedIcon/>
                    </button>
                    <div className='rounded-2xl flex-col w-full h-full bg-neutral-900 flex align-middle justify-start p-4 mb-2' >
                        <div className='flex flex-row justify-between align-baseline items-baseline'>
                            <h2 className='font-bold text-2xl '>Mine Lekelister</h2>
                            <button className='text-l text-neutral-500 hover:underline' onClick={handleAddPlaylist}>Lag ny</button>
                        </div>
                        <ul className='w-full mt-5 relative'>
                            {playlists.map(list => (
                                <li key={list.id} className='h-16 flex mb-2'>
                                    <button className='w-full h-full hover:bg-neutral-700 flex align-middle items-center justify-between gap-4 rounded-xl p-2 border border-neutral-800' onClick={handlePlaylistClick}>
                                        <div className='flex justify-start align-middle items-center gap-4'>
                                            <PlayCircleOutlineRoundedIcon/>
                                            <div className='flex flex-col justify-start align-middle items-start'>
                                                <p className='-mb-2'>{list.name}</p>
                                                <p className='text-neutral-400 font-normal'>{list.numberOfGames} leker • {list.author}</p>
                                            </div>
                                        </div>
                                        <button className='w-12' onClick={() => handleShowMorePopupPlaylist(list.id)}><MoreHorizRoundedIcon/></button>
                                        {showMorePopupPlaylist.visible && showMorePopupPlaylist.playlistId === list.id && (
                                            <div className='absolute right-0 top-0 flex flex-col py-4 px-6 w-48 justify-center bg-neutral-800 align-middle items-center rounded-xl gap-4'>
                                                {/* Popup content here */}
                                                <p>{list.name}</p>
                                                <button onClick={() => handleRemovePlaylist(list.id)} className='bg-red-500 hover:bg-red-400 active:bg-red-600 px-4 py-1 rounded-lg'> Slett</button>
                                                <button onClick={() => handleShowMorePopupPlaylist(list.id)}><p className='text-neutral-400 hover:underline absolute top-1 right-2'><CloseRoundedIcon/></p></button>
                                            </div>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        {playlists.length === 0 && (
                            <div className='text-neutral-400 font-normal'>
                                <p>Ingen lekelister enda 🧐</p>
                                <div className='flex gap-1'><p>Fiks det ved å</p><button onClick={handleAddPlaylist} className='font-bold text-violet-400 hover:text-violet-300'>lage en lekeliste</button></div>
=======
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
>>>>>>> ac01f305b425eade68dc45503ae4efb5223a20d3
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

<<<<<<< HEAD
                {/* Middle section */}
                <section className='rounded-2xl w-full min-w-[420px] h-full flex flex-col align-middle justify-start bg-neutral-900 p-4 my-2'>
                    {/* Search section */}
                    <div className='flex w-full flex-row justify-between align-middle items-center'>
                        <form onSubmit={handleSearchSubmit} className="flex align-middle w-2/3 items-center font-normal bg-neutral-800 text-neutral-600 rounded-full overflow-hidden p-1">
                            <button type="submit" className="p-2">
                                <SearchIcon className='text-neutral-500' />
                            </button>
                            <input 
                                className="pl-2 pr-2 py-2 w-full bg-neutral-800 text-white focus:outline-none" 
                                type="search" // Changed to search to improve semantics
                                placeholder="Søk..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </form>
                        <Link href="/browse">
                            <button className=" rounded-full bg-violet-600 hover:bg-violet-500 active:bg-violet-800 px-4 py-2 text-white shadow-lg">Bla Gjennom</button>
                        </Link>
                    </div>
                    <p className='mt-4 font-normal text-neutral-500'>Annonse</p>
                    {/* Ad section */}
                    <div className='flex overflow-hidden w-full min-h-60 bg-neutral-800 rounded-xl items-center justify-center'>
                        <Advertisement/>
                    </div>
                    {/* Content section */}
                    <div className='flex w-full h-full bg-neutral-800 rounded-xl mt-4 items-center justify-center'>
                        <p>Content</p>
                    </div>
                </section>
=======
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
>>>>>>> ac01f305b425eade68dc45503ae4efb5223a20d3

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
<<<<<<< HEAD
                </section>
                {showCreateGame.visible && (
                    <div className='absolute flex flex-col top-0 left-0 w-full h-full bg-neutral-900 bg-opacity-90 justify-center align-middle items-center'>
                        <CreateGame/>
                        <button className='text-l mt-2 text-neutral-300 hover:underline' onClick={handleCancelCreateGame}>Avbryt</button>
                    </div>
                )}
            </div>
=======
                  </div>
                )}
              </div>
              <button className="flex h-24 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 p-2 align-middle hover:bg-violet-500 active:bg-violet-800">
                OPPRETT LEK
                <AddCircleOutlineRoundedIcon />
              </button>
            </section>
          </div>
>>>>>>> ac01f305b425eade68dc45503ae4efb5223a20d3
        </SignedIn>
      </main>
    </div>
  );
}
