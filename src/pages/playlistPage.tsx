import { useRouter } from "next/router";
import Image from "next/image";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import GameCardHorizontal from "~/components/GameCardHorizontal";
import { api } from "~/utils/api";
import PitBull from "~/assets/images/pitbull.jpeg";
import Link from "next/link";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useUser } from "@clerk/nextjs";
import Layout from "~/components/layout";

export default function ListPage() {
  const router = useRouter();
  const { playlistId } = router.query;
  const currentUser = useUser();

  const playlistIdNumber = parseInt(playlistId as string, 10);

  // Fetch data based on playlistId using useQuery
  const playlistQuery = api.playlist.getPlaylistById.useQuery(
    { id: playlistIdNumber ?? 1 },
    { enabled: playlistId !== undefined },
  );
  const name = playlistQuery.data?.name ?? "";
  const description = playlistQuery.data?.description ?? "";
  const username = playlistQuery.data?.user?.username ?? "";
  const userId = playlistQuery.data?.user?.userId ?? "";
  const usePlaylistRelationMutation =
    api.playlist.removeGameFromPlaylist.useMutation();

  const gameInPlaylistData = playlistQuery.data?.GameInPlaylist ?? [];
  const games = gameInPlaylistData;
  const amountOfGames = games.length;

  const handleDeleteFromPlaylist = async (gameId: number) => {
    console.log("Removing game from playlist", gameId, playlistIdNumber);
    try {
      await usePlaylistRelationMutation.mutateAsync({
        gameId: gameId,
        playlistId: playlistIdNumber,
      });
      await playlistQuery.refetch();
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <Layout>
      {/* Middle section */}
      <section className="flex h-full w-full flex-col">
        <section className=" flex h-full w-full  flex-col justify-start rounded-t-2xl bg-gradient-to-b from-violet-900 to-[#1b181f] p-4 align-middle">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-4 flex w-full items-center justify-start gap-2 align-middle">
              <button onClick={() => router.back()}>
                <ArrowBackRounded />
              </button>{" "}
              Tilbake
            </div>

            <div className=" flex h-full min-h-48 w-full items-start">
              <div className="mb-10 h-full w-full max-w-60">
                <Image
                  className="rounded-xl object-cover"
                  src={PitBull}
                  width={200}
                  alt="Eucalyptus Oil Ad"
                  objectFit="cover"
                />
              </div>

              <div className="mb-4 ml-4 flex h-full flex-col justify-between pb-10">
                <div>
                  <p className="mt-6 text-md font-normal text-neutral-200">
                    Spilleliste
                  </p>
                  <h1 className="text-xxl">{name}</h1>
                  <p className="font-normal text-neutral-400">
                    Laget av: {username} • {amountOfGames} leker
                  </p>
                  <p className="mt-6 text-md font-normal text-neutral-400">
                    {description}
                  </p>
                </div>
                <div>
                <Link href="/spinTheWheel"> 
                      <div className="flex h-20 w-30 flex-row justify-center rounded-lg p-6 text-white shadow-lg hover:bg-violet-500 active:bg-violet-800">
                        <p className="-mt-1 mr-4 text-md justify-center">
                          Spin The Wheel
                        </p>
                        
                      </div>
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* List section */}
        <section className="flex h-full w-full flex-col  justify-start rounded-b-2xl bg-gradient-to-b from-[#1b181f] to-neutral-900 p-4 align-middle">
          <div className="flex flex-col items-center justify-center">
            <div className="-mt-10 grid h-full w-full gap-4">
              {/* Header for game list */}
              <div className="relative flex h-10 w-full flex-row border-b-2 border-neutral-800 align-top">
                <div className="mr-10 flex-grow justify-normal">
                  <p className="ml-10 pt-1">Tittel på lek</p>
                </div>
                <div className="-mr-2 flex w-1/3 flex-col justify-center">
                  <p className="ml-16 leading-tight">Beskrivelse</p>
                </div>
                <div className="mr-12 flex w-1/3 flex-col justify-center">
                  <p className="text-right">Varighet</p>
                </div>
              </div>
              {/* Game list */}
              {Array.isArray(games) && games.length > 0 ? (
                games.map((game) => (
                  <GameCardHorizontal
                    key={game?.gameId} // Optional chaining used here
                    name={game?.name ?? ""}
                    duration={game?.duration ?? ""}
                    numberOfPlayers={game?.numberOfPlayers ?? ""}
                    rules={game?.rules ?? ""}
                    description={game?.description ?? ""}
                    rating={game?.averageRating ?? 0}
                    gameId={game?.gameId ?? 0} // Assuming gameId is a number, provide a default value if necessary
                    userId={game?.userId ?? ""}
                    playlistId={playlistIdNumber}
                    playlistUserId={userId}
                    onDelete={() => handleDeleteFromPlaylist(game?.gameId ?? 0)}
                  />
                ))
              ) : (
                <>
                  {currentUser.isSignedIn && currentUser.user.id === userId ? (
                    <Link href="/browse">
                      <div className="flex h-20 w-full flex-row justify-center rounded-lg p-6 hover:bg-neutral-800">
                        <p className="-mt-1 mr-4 justify-center">
                          Legg til spill i spilleliste
                        </p>
                        <AddCircleOutlineIcon />
                      </div>
                    </Link>
                  ) : (
                    <div className="flex h-20 w-full flex-row justify-center rounded-lg p-6">
                      <p className="-mt-1 mr-4 justify-center">
                        Ingen spill i spillelisten
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </section>
      {/* <MyFriendsBar /> */}

      {/* </div>
      </main> */}
    </Layout>
  );
}
