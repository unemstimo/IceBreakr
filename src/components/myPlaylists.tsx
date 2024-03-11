import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { api } from "~/utils/api";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

const MyPlaylists = () => {
  const privatePlaylistQuery = api.playlist.getPlaylistsByUserId.useQuery();
  const myPlaylists = privatePlaylistQuery.data ?? [];
  const router = useRouter();
  const deletePlaylist = api.playlist.delete.useMutation();

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

  const handleDeletePlaylist = async (playlistId: number) => {
    console.log("Removing game from playlist", playlistId);
    try {
      await deletePlaylist.mutateAsync({
        id: playlistId,
      });
      await privatePlaylistQuery.refetch();
      /* setShowPlaylistPicker({ visible: false }); */
    } catch (error) {
      /* toast({
        description: "Error deleting game to playlist.",
      }); */
      console.log("Error");
    }
  };

  const handlePlaylistClick = async (playlistId: number) => {
    await router.push(`/playlistPage?playlistId=${playlistId}`);
  };

  return (
    <div className="mb-0 max-h-[472px] hidden h-full w-full flex-col justify-start rounded-2xl bg-neutral-900 align-middle  md:flex">
      <div className="flex flex-row items-baseline justify-between align-baseline">
        <h2 className="text-2xl font-bold ">Mine Lekelister</h2>
        <SignedIn>
          <Link href="/createPlaylist">
            <button className="text-rg text-neutral-500 hover:underline">
              Lag ny
            </button>
          </Link>
        </SignedIn>
      </div>
      <ul className=" mt-5 w-full overflow-y-scroll overflow-x-hidden">
        {myPlaylists?.map((list) => (
          <li key={list.playlistId} className="relative mb-2 flex h-16">
            <div className="flex h-full w-full max-w-[95%] items-center justify-between gap-4 rounded-xl border border-neutral-800 p-4 align-middle hover:bg-neutral-700">
              <button
                className="flex h-full w-full items-center justify-between p-4 align-middle hover:bg-neutral-700"
                onClick={() => handlePlaylistClick(list.playlistId)}
              >
                <div className="flex h-full w-full items-center justify-start gap-4 align-middle">
                  <PlayCircleOutlineRoundedIcon />
                  <div className="w-[70%] flex flex-col items-start justify-start align-middle text-md">
                    <p className="w-full -mb-2 truncate text-start">{list.name}</p>
                    <p className="font-normal text-neutral-400">
                      {list.GameInPlaylist.length} leker
                    </p>
                  </div>
                </div>
              </button>
              <button
                  className="-mt-2 h-full align-middle "
                  onClick={() => handleShowMorePopupPlaylist(list.playlistId)}
                >
                  <MoreHorizRoundedIcon />
                </button>
              {showMorePopupPlaylist?.visible &&
                showMorePopupPlaylist?.playlistId === list.playlistId && (
                  <div className="absolute z-10 -ml-4 flex h-full w-full items-center justify-between rounded-xl bg-background px-4 align-middle text-rg">
                    {/* Popup content here */}
                    <p>{list.name}</p>
                    <button
                      onClick={() => handleDeletePlaylist(list.playlistId)}
                      className="h-12 rounded-lg bg-red-500 px-4 py-1 hover:bg-red-400 active:bg-red-600"
                    >
                      {" "}
                      Slett
                    </button>
                    <button
                      onClick={() =>
                        handleShowMorePopupPlaylist(list.playlistId)
                      }
                    >
                      <p className="absolute inset-y-4 right-2 text-neutral-400 hover:underline">
                        <CloseRoundedIcon />
                      </p>
                    </button>
                  </div>
                )}
            </div>
          </li>
        ))}
      </ul>

      {myPlaylists.length === 0 && (
        <div className="text-rg font-normal text-neutral-400">
          <p>Ingen lekelister enda 🧐</p>
          <div className="flex gap-1">
            <p>Fiks det ved å</p>
            <SignedOut>
              <SignInButton>
                <button className="font-bold text-violet-400 hover:text-violet-300">
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
