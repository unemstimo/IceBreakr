import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { api } from "~/utils/api";
import { useState } from "react";

const MyPlaylists = () => {
  const privatePlaylistQuery = api.playlist.getPlaylistsByUserId.useQuery();
  const myPlaylists = privatePlaylistQuery.data ?? [];

  const handlePlaylistClick = () => {
    console.log("Playlist clicked");
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

  return (
    <div className="mb-0 flex h-full w-full flex-col justify-start rounded-2xl bg-neutral-900 p-2 align-middle">
      <div className="flex flex-row items-baseline justify-between align-baseline">
        <h2 className="text-2xl font-bold ">Mine Lekelister</h2>
        <button
          className="text-l text-neutral-500 hover:underline"
          onClick={() => "TODO: handleAddPlaylist"}
        >
          Lag ny
        </button>
      </div>
      <ul className="relative mt-5 w-full">
        {myPlaylists?.map((list) => (
          <li key={list.playlistId} className="mb-2 flex h-16">
            <button
              className="flex h-full w-full items-center justify-between gap-4 rounded-xl border border-neutral-800 p-2 align-middle hover:bg-neutral-700"
              onClick={handlePlaylistClick}
            >
              <div className="flex items-center justify-start gap-4 align-middle">
                <PlayCircleOutlineRoundedIcon />
                <div className="flex flex-col items-start justify-start align-middle">
                  <p className="-mb-2">{list.name}</p>
                  <p className="font-normal text-neutral-400">
                    {list.GameInPlaylist.length} leker •{list.user?.username}
                  </p>
                </div>
              </div>
              <button
                className="w-12"
                onClick={() => handleShowMorePopupPlaylist(list.playlistId)}
              >
                <MoreHorizRoundedIcon />
              </button>
              {showMorePopupPlaylist?.visible &&
                showMorePopupPlaylist?.playlistId === list.playlistId && (
                  <div className="absolute right-0 top-0 flex w-48 flex-col items-center justify-center gap-4 rounded-xl bg-neutral-800 px-6 py-4 align-middle">
                    {/* Popup content here */}
                    <p>{list.name}</p>
                    <button
                      onClick={() => console.log("TODO: handleEditPlaylist")}
                      className="rounded-lg bg-red-500 px-4 py-1 hover:bg-red-400 active:bg-red-600"
                    >
                      {" "}
                      Slett
                    </button>
                    <button
                      onClick={() =>
                        handleShowMorePopupPlaylist(list.playlistId)
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

      {myPlaylists.length === 0 && (
        <div className="font-normal text-neutral-400">
          <p>Ingen lekelister enda 🧐</p>
          <div className="flex gap-1">
            <p>Fiks det ved å</p>
            <button
              onClick={() => console.log("TODO: handleAddPlaylist")}
              className="font-bold text-violet-400 hover:text-violet-300"
            >
              lage en lekeliste
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPlaylists;
