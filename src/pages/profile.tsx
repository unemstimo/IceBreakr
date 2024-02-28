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
import MyFriendsBar from "~/components/myFriendsBar";

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
          <section className=" flex h-full w-full min-w-[300px] flex-col justify-start rounded-2xl bg-neutral-900 p-4 align-middle">
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
          <MyFriendsBar/>
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
