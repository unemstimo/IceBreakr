import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { api } from "~/utils/api";
import { useState } from "react";
import Link from "next/link";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  UserProfile,
} from "@clerk/nextjs";


const MyPlaylists = () => {
  const privatePlaylistQuery = api.playlist.getPlaylistsByUserId.useQuery();
  const myPlaylists = privatePlaylistQuery.data ?? [];


  const handlePlaylistClick = (playlistId: number) => {
    console.log("Playlist ",playlistId,"clicked");
  };

  const handleShowMorePopupPlaylist = (playlistId: number) => {
    setShowMorePopupPlaylist({
      visible: !showMorePopupPlaylist?.visible,
      playlistId,
    });
  };
  const [showMorePopupPlaylist, setShowMorePopupPlaylist] = useState<{
    visible: boolean;
    playlistId: number;
  } | null>({
    visible: false,
    playlistId: 0,
  });

  const handleDeletePlaylist = (playlistId: number) => {
    console.log("Delete playlist ",playlistId);
    
  }

  return (
    <div className="mb-0 hidden md:flex h-full w-full flex-col justify-start rounded-2xl bg-neutral-900  align-middle">
      <div className="flex flex-row items-baseline justify-between align-baseline">
        <h2 className="text-2xl font-bold ">Mine Lekelister</h2>
        <SignedIn>
          <Link href="/createPlaylist">
          <button
            className="text-rg text-neutral-500 hover:underline"
          >
            Lag ny
          </button>
          </Link>
        </SignedIn>
        
      </div>
      <ul className=" mt-5 w-full">
        {myPlaylists?.map((list) => (
          <li key={list.playlistId} className="relative mb-2 flex h-16">
            <button
              className="flex h-full w-full items-center justify-between gap-4 rounded-xl border border-neutral-800 p-4 align-middle hover:bg-neutral-700"
              onClick={() => handlePlaylistClick(list.playlistId)}
            >
              <div className="flex h-full w-full items-center justify-start gap-4 align-middle">
                <PlayCircleOutlineRoundedIcon />
                <div className="flex flex-col items-start justify-start align-middle text-nowrap  text-md">
                  <p className="-mb-2">{list.name}</p>
                  <p className="font-normal text-neutral-400">
                    {list.GameInPlaylist.length} leker 
                  </p>
                </div>
              </div>
              <button
                className="w-12 h-full align-middle items-center -mt-2"
                onClick={() => handleShowMorePopupPlaylist(list.playlistId)}
              >
                <MoreHorizRoundedIcon />
              </button>
              {showMorePopupPlaylist?.visible &&
                showMorePopupPlaylist?.playlistId === list.playlistId && (
                  <div className="text-rg absolute flex -ml-4 z-10 w-full align-middle items-center justify-between px-4 h-full bg-background rounded-xl">
                    {/* Popup content here */}
                    <p>{list.name}</p>
                    <button
                      onClick={() => handleDeletePlaylist(list.playlistId)}
                      className="rounded-lg bg-red-500 h-12 px-4 py-1 hover:bg-red-400 active:bg-red-600"
                    >
                      {" "}
                      Slett
                    </button>
                    <button
                      onClick={() =>
                        handleShowMorePopupPlaylist(list.playlistId)
                      }
                    >
                      <p className="absolute right-2 inset-y-4 text-neutral-400 hover:underline">
                        <CloseRoundedIcon />
                      </p>
                    </button>
                  </div>
                )}
            </button>
          </li>
        ))}
      </ul>

      {myPlaylists.length === 0 && (
        <div className="font-normal text-rg text-neutral-400">
          <p>Ingen lekelister enda 🧐</p>
          <div className="flex gap-1">
            <p>Fiks det ved å</p>
            <SignedOut>
            <SignInButton>
              <button
                className="font-bold text-violet-400 hover:text-violet-300"
              >
                logge inn
              </button>
            </SignInButton>
            </SignedOut>
            <SignedIn> 
            <Link href="/createPlaylist">
            <button
              onClick={() => console.log("TODO: handleAddPlaylist")}
              className="font-bold text-violet-400 hover:text-violet-300"
            >
              lage en lekeliste
            </button>
            </Link>
          </SignedIn>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPlaylists;
