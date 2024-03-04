import Head from "next/head";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { v4 as uuid } from "uuid";
import Advertisement from "~/components/advertisement";
import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";

import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import SearchIcon from "@mui/icons-material/Search";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PlayListCard from "~/components/playListCard";
import PageWrapper from "~/components/pageWrapper";
import NavigationBar from "~/components/navigationBar";
import { api } from "~/utils/api";

import CreatePlaylistPage from "./createPlaylist";
import MyPlaylists from "~/components/myPlaylists";
import MyFriendsBar from "~/components/myFriendsBar";
import { Input } from "@nextui-org/react";
import { SignedIn } from "@clerk/nextjs";

type Friend = {
  id: string;
  name: string;
};

// TODO: Replace with actual data from the backend

export default function Dashboard() {
  const currentuser = currentUser;

  const user = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const { isSignedIn } = useUser();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const [friendsList, setFriendsList] = useState<Friend[]>([]);

  const [showMorePopup, setShowMorePopup] = useState({
    visible: false,
    friendId: null,
  });

  const publicPlaylistQuery = api.playlist.getAll.useQuery();
  const allPlaylists = publicPlaylistQuery.data ?? [];

  const handleShowMorePopup = (friendId: string | null) => {
    setShowMorePopup({ visible: !showMorePopup.visible, friendId: null });
  };

  const handleAddFriend = () => {
    if (!isSignedIn) {
      setShowLoginPopup(true);
    } else {
      const newID = uuid();
      console.log("Add Friend");
      const newFriend = { id: newID, name: "Friend " + newID.slice(0, 4) };
      setFriendsList([...friendsList, newFriend]);
    }
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

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Search Term:", searchTerm);
  };

  const [showCreateGame, setShowCreateGame] = useState({ visible: false });

  const handleCreateGameShow = () => {
    if (!isSignedIn) {
      setShowLoginPopup(true);
    } else {
      setShowCreateGame({ visible: !showCreateGame.visible });
    }
  };

  const handleCancelCreateGame = () => {
    setShowCreateGame({ visible: false });
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

      {/* <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 font-darker text-lg font-bold text-white">
        <div className="max-w-screen-l relative flex h-screen w-full max-w-[1440px] rounded-3xl bg-neutral-950"> */}
      {/* Left section */}

      {/* TODO: fjern CretaePlaylistPage herfra og lag den! */}
      <PageWrapper>
        <NavigationBar>
          <MyPlaylists />
        </NavigationBar>

        {/* Middle section */}
        <section className="flex h-full w-full  flex-col justify-start overflow-hidden rounded-2xl bg-neutral-900 p-4 pr-4 align-middle">
          {/* Search section */}
          <div className="flex w-full flex-row items-center justify-between align-middle">
            <form
              onSubmit={handleSearchSubmit}
              className="flex w-2/3 items-center overflow-hidden rounded-full bg-neutral-800 p-1 align-middle font-normal text-neutral-600"
            >
              <button type="submit" className="pl-2 pt-1 flex align-middle h-full justify-center items-center">
                <SearchIcon className="text-neutral-500" />
              </button>
              <Input
                className="w-full text-md bg-neutral-800 text-white focus:outline-none"
                type="search" // Changed to search to improve semantics
                placeholder="Søk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          {/* Content section */}
          <div className="mt-4 h-full w-full">
            <h3 className="mb-2">Mine lekelister</h3>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-4">
              {allPlaylists?.map((playlist) => (
                <div className="h-full w-full">
                  <PlayListCard playlist={playlist} />
                </div>
              ))}
            </div>
          </div>
          {/* Ad section */}
          <p className="mt-4 font-normal text-neutral-500">Annonse</p>
          <div className="flex max-h-60 min-h-48 w-full items-center justify-center overflow-hidden rounded-xl bg-neutral-800">
            <Advertisement />
          </div>
        </section>
        
        <MyFriendsBar/>
      </PageWrapper>
    </div>
  );
}
