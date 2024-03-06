import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";

import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

type Friend = {
  id: string;
  name: string;
};

const MyFriendsBar = () => {
  const user = useUser();
  const [friendsList, setFriendsList] = useState<Friend[]>([]);

  const [showMorePopup, setShowMorePopup] = useState({
    visible: false,
    friendId: "",
  });

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  showLoginPopup.toString();

  const handleShowMorePopup = (friendId: string | null) => {
    setShowMorePopup({
      visible: !showMorePopup.visible,
      friendId: friendId ?? "",
    });
  };

  const handleAddFriend = () => {
    if (!user.isSignedIn) {
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
      <section className="flex w-20 flex-col justify-start rounded-2xl align-middle md:w-1/4 xl:min-w-72">
        <div className="flex h-fit w-full flex-col justify-center rounded-2xl bg-background p-4 align-middle">
          <div className="flex w-full flex-col items-center justify-between align-middle xl:flex-row xl:items-baseline xl:align-baseline">
            <h2 className="text-2xl hidden font-bold xl:block ">Venner</h2>
            <div className="flex h-full w-full items-center justify-center align-middle xl:hidden">
              <button className="flex h-12 w-12 items-center justify-center gap-4 rounded-xl p-2 align-middle hover:bg-neutral-700 md:h-full md:w-full lg:justify-start">
                <PeopleAltRoundedIcon />
                <p className="hidden md:flex">Venner</p>
              </button>
            </div>
            <SignedIn>
              <button
                className="mt-2 w-full text-rg text-neutral-500 hover:underline xl:w-auto "
                onClick={handleAddFriend}
              >
                <p className="hidden xl:block">Legg til</p>
              </button>
            </SignedIn>
          </div>
          <ul className="relative mt-2 hidden w-full text-rg xl:block">
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
                        <button onClick={() => handleShowMorePopup(friend.id)}>
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
              <p className="hidden xl:block">Ingen venner enda 😭</p>
              <div className="flex w-full gap-1 xl:w-auto">
                <p className="hidden xl:block">Fiks det ved å</p>
                <SignedIn>
                  <button
                    onClick={handleAddFriend}
                    className="mt-4 hidden w-full font-bold text-violet-400 hover:text-violet-300 xl:mt-0 xl:block xl:w-auto"
                  >
                    <p>legge til en venn</p>
                  </button>
                  <button
                    className="relative mt-2 flex h-12 w-12 items-center justify-center gap-2 rounded-xl bg-background align-middle text-rg text-neutral-500 hover:bg-green-600 hover:text-white md:w-full xl:hidden "
                    onClick={handleAddFriend}
                  >
                    <p className="hidden md:flex">Legg til</p>
                    <PersonAddRoundedIcon />
                  </button>
                </SignedIn>
                <SignedOut>
                  <SignInButton>
                    <button className="font-bold text-violet-400 hover:text-violet-300">
                      logge inn
                    </button>
                  </SignInButton>
                </SignedOut>
              </div>
            </div>
          )}
        </div>

        <ul className="relative mt-4 block w-full rounded-xl bg-background text-rg xl:hidden">
          {friendsList.map((friend) => (
            <li
              key={friend.id}
              className="flex h-16 w-full items-center justify-center align-middle"
            >
              <button
                className="flex h-full w-full items-center justify-center gap-4 rounded-xl px-4 align-middle hover:bg-foreground md:justify-start"
                onClick={handleFriendsButton}
              >
                <div className="flex items-center justify-center gap-4 align-middle md:justify-start">
                  <FaceRoundedIcon />
                  <p className="hidden md:flex ">{friend.name.split(" ")[1]}</p>
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
