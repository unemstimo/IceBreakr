import Head from "next/head";
import { useState, type FormEvent } from "react";
import { v4 as uuid } from "uuid";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserProfile,
} from "@clerk/nextjs";

import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import PageWrapper from "~/components/pageWrapper";
import NavigationBar from "~/components/navigationBar";
import MyPlaylists from "~/components/myPlaylists";
import { api } from "~/utils/api";

type Friend = {
  id: string;
  name: string;
};

export default function Profile() {
  const [searchTerm, setSearchTerm] = useState("");

  // TODO: implement this
  // const myPlaylistsQuery = api.playlist.getPlaylistsByUserId.useQuery();

  const [friendsList, setFriendsList] = useState<Friend[]>([]);

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

  const [showManageAccount, setShowManageAccount] = useState({
    visible: false,
  });

  const handleManageAccount = () => {
    setShowManageAccount({ visible: !showManageAccount.visible });
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
        <SignedOut>
          <div className="flex grow items-center justify-center">
            <SignInButton>Logg inn eller opprett en bruker.</SignInButton>
          </div>
        </SignedOut>
        <SignedIn>
          {/* Middle section */}
          <section className=" flex h-full w-full min-w-[420px] flex-col justify-start rounded-2xl bg-neutral-900 p-4 align-middle">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold ">Min Profil</h2>
              <div className="flex items-center gap-2">
                <button>
                  <SignOutButton>logg ut</SignOutButton>
                </button>
                <button onClick={handleManageAccount}>
                  <ManageAccountsRoundedIcon />
                </button>
              </div>
            </div>
            {/* My games section */}
            <div className="mt-4 flex h-full w-full items-center justify-center rounded-xl bg-neutral-800">
              <p>Mine leker</p>
            </div>
            {/* My Favourites section */}
            <div className="mt-4 flex h-full w-full items-center justify-center rounded-xl bg-neutral-800">
              <p>Mine favoritter</p>
            </div>
            {/* My recent section */}
            <div className="mt-4 flex h-full w-full items-center justify-center rounded-xl bg-neutral-800">
              <p>Nylig lekt</p>
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
