import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { api } from "~/utils/api";
import { type Dispatch, type SetStateAction, useState } from "react";
import Link from "next/link";
import { useToast } from "./ui/use-toast";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import PlaylistPlayRoundedIcon from '@mui/icons-material/PlaylistPlayRounded';

type PlaylistPickerProps = {
  gameid: number;
  setShowPlaylistPicker: Dispatch<SetStateAction<{ visible: boolean }>>;
};

const PlaylistPicker = ({
  gameid,
  setShowPlaylistPicker,
}: PlaylistPickerProps) => {
  const privatePlaylistQuery = api.playlist.getPlaylistsByUserId.useQuery();
  const myPlaylists = privatePlaylistQuery.data ?? [];
  const usePlaylistRelationMutation =
    api.playlist.addGameToPlaylist.useMutation();
  const { toast } = useToast();

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

  const handleDeletePlaylist = () => {
    console.log("Delete playlist");
    api.playlist.delete.useMutation();
  };

  const handleAddPlaylist = async (playlistId: number) => {
    if (!gameid) return;

    console.log("Adding game to playlist", gameid, playlistId);
    try {
      await usePlaylistRelationMutation.mutateAsync({
        gameId: gameid,
        playlistId: playlistId,
      });
      await privatePlaylistQuery.refetch();
      setShowPlaylistPicker({ visible: false });
      toast({
        description: "Lek er lagt til i lekeliste"
      });
    } catch (error) {
      toast({
        description:  + "Lek er allerede i listen!",
      });
    }

    // invalidate myplaylists query
  };

  return (
    <Card>
      <CardHeader className="flex -mb-6 flex-row align-middle items-center justify-start gap-2">
        <h2 className="text-2xl font-bold ">Mine Lekelister</h2>
        <SignedIn>
          <Link href="/createPlaylist">
            <Button className="flex align-middle items-center m-0 p-2 h-auto rounded-full bg-transparent">
              <p className=" flex font-normal text-rg hover:underline">
                <AddCircleOutlineRoundedIcon/>
              </p>
            </Button>
          </Link>
        </SignedIn>
      </CardHeader>
      <CardContent>
      <ul className="relative w-full">
        {myPlaylists?.map((list) => (
          <li key={list.playlistId} className="mb-2 flex h-16">
            <Button
              className="flex h-full bg-neutral-900 w-full items-center justify-between gap-4 rounded-xl border border-neutral-700 p-4 align-middle hover:bg-neutral-700"
              onClick={() => handleAddPlaylist(list.playlistId)}
            >
              <div className="flex h-full w-full items-center justify-start gap-4 align-middle">
                <PlaylistPlayRoundedIcon />
                <div className="flex flex-col items-start justify-start text-nowrap align-middle  text-md">
                  <p className="-mb-2">{list.name}</p>
                  <p className="font-normal text-neutral-400">
                    {list.GameInPlaylist.length} leker
                  </p>
                </div>
              </div>
              {showMorePopupPlaylist?.visible &&
                showMorePopupPlaylist?.playlistId === list.playlistId && (
                  <div className="absolute right-0 top-0 flex w-48 flex-col items-center justify-center gap-4 rounded-xl bg-neutral-800 px-6 py-4 align-middle">
                    {/* Popup content here */}
                    <p>{list.name}</p>
                    <button
                      onClick={handleDeletePlaylist}
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
            </Button>
          </li>
        ))}
      </ul>
      </CardContent>
      

      {myPlaylists.length === 0 && (
        <div className="font-normal text-neutral-400">
          <p>Ingen lekelister enda 🧐</p>
          <div className="flex gap-1">
            <p>Fiks det ved å</p>
            <SignedIn>
              <button
                onClick={() => console.log("TODO: handleAddPlaylist")}
                className="font-bold text-violet-400 hover:text-violet-300"
              >
                lage en lekeliste
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
    </Card>
  );
};

export default PlaylistPicker;
