import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import SearchIcon from "@mui/icons-material/Search";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Head from "next/head";
import { useState, type FormEvent } from "react";
import { v4 as uuid } from "uuid";
import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';

import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { api } from "~/utils/api";

type Friend = {
  id: string;
  name: string;
};



const MyFriendsBar = () => {
  const [friendsList, setFriendsList] = useState<Friend[]>([]);
  const currentPath = usePathname();

  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const [showMorePopup, setShowMorePopup] = useState({
    visible: false,
    friendId: null,
  });

  const handleShowMorePopup = (friendId: string | null) => {
    setShowMorePopup({ visible: !showMorePopup.visible, friendId: null });
  };

  const handleAddFriend = () => {
    if (!SignedIn) {
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

  return (
    <>
      <section className="flex w-1/4 xl:min-w-72 flex-col justify-start rounded-2xl align-middle">
          <div className="flex h-fit w-full flex-col justify-center rounded-2xl bg-background p-4 align-middle">
            <div className="flex xl:flex-row w-full px-6  flex-col xl:items-baseline items-center justify-between xl:align-baseline align-middle">
              <h2 className="text-2xl xl:block hidden font-bold ">Venner</h2>
              <div className="h-full w-full flex align-middle items-center justify-center xl:hidden"><PeopleAltRoundedIcon/></div>
              <button
                className="text-rg text-neutral-500 hover:underline xl:w-auto w-full mt-2 "
                onClick={handleAddFriend}
              >
                <p className="xl:block hidden">Legg til</p>
              </button>
            </div>
            <ul className="relative mt-2 w-full text-rg xl:block hidden">
              {friendsList.map((friend) => (
                <li key={friend.id} className="flex h-16">
                  <button
                    className="flex h-full w-full items-center justify-between gap-4 rounded-xl px-4 align-middle hover:bg-foreground"
                    onClick={handleFriendsButton}
                  >
                    <div className="flex items-center justify-start gap-4 align-middle">
                      <FaceRoundedIcon /> {friend.name}
                    </div>
                    <button
                      className=""
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
              <div className="text-rg font-normal text-neutral-400">
                <p className="xl:block hidden">Ingen venner enda 😭</p>
                <div className="flex gap-1 xl:w-auto w-full">
                  <p className="xl:block hidden">Fiks det ved å</p>
                  <button
                    onClick={handleAddFriend}
                    className="font-bold text-violet-400 hover:text-violet-300 xl:w-auto w-full xl:mt-0 mt-4"
                  >
                    <p className="xl:block hidden">legge til en venn</p>
                    <p className="xl:hidden block text-xxl">😭</p>
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="mt-2">
          <button
                className="xl:hidden block relative text-rg text-neutral-500 hover:bg-green-600 hover:text-white rounded-xl bg-background w-full h-12 mt-2 "
                onClick={handleAddFriend}
              >
                <AddCircleOutlineRoundedIcon/>
          </button>
          </div>
          
          <ul className="relative mt-4 w-full text-rg xl:hidden block rounded-xl bg-background">
              {friendsList.map((friend) => (
                <li key={friend.id} className="flex h-16 w-full justify-center align-middle items-center">
                  <button
                    className="flex px-4 h-full w-full items-center justify-start gap-4 rounded-xl align-middle hover:bg-foreground"
                    onClick={handleFriendsButton}
                  >
                    <div className="flex items-center justify-start gap-4 align-middle">
                      <FaceRoundedIcon />{friend.name.split(" ")[1]}
                    </div>
                    
                  </button>
                </li>
              ))}
            </ul>
        </section>
    </>
  );
};

export default MyFriendsBar;
