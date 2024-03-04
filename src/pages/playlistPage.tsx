import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import Advertisement from "~/components/advertisement";
import GameCardHorizontal from "~/components/GameCardHorizontal";
import PageWrapper from "~/components/pageWrapper";
import NavigationBar from "~/components/navigationBar";
import { api } from "~/utils/api";
import MyFriendsBar from "~/components/myFriendsBar";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import PitBull from "~/assets/images/pitbull.jpeg";
import { useUser } from "@clerk/nextjs";
import GameCard from "~/components/gameCard";

export default function ListPage() {
  const router = useRouter();
  const { playlistId } = router.query;
  const currentUser = useUser();

  // Fetch data based on playlistId using useQuery
  const playlistQuery = api.playlist.getPlaylistById.useQuery(
    { id: Number(playlistId ?? 1) },
    { enabled: playlistId !== undefined },
  );
  const name = playlistQuery.data?.name ?? "";
  const description = playlistQuery.data?.description ?? "";
  const username = playlistQuery.data?.user?.username ?? "";

  const gameInPlaylistData = playlistQuery.data?.GameInPlaylist ?? [];
  const games = gameInPlaylistData;
  const amountOfGames = games.length;

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
        {/* Left section */}
        <NavigationBar>
          <button
            // onClick={handleCreateGameShow}
            className="flex h-12 w-12 items-center justify-center gap-2 rounded-xl p-2 align-middle hover:bg-neutral-600 active:bg-violet-500 md:hidden"
          >
            <FilterAltRoundedIcon />
          </button>

          {/* Ad space */}
          <p className="font-normal text-neutral-500">Annonse</p>
          <div className="flex h-auto w-full items-center justify-center overflow-hidden rounded-xl bg-neutral-800">
            <div className="h-full w-full">
              <Advertisement />
            </div>
          </div>
        </NavigationBar>

        {/* Middle section */}
        <section className="flex h-full w-full flex-col">
          <section className="-mb-4 flex h-full w-full  flex-col justify-start rounded-t-2xl border-b-2 bg-gradient-to-b from-violet-900 to-[#1b181f] p-4 align-middle">
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
                    <p className="mt-6 text-md font-normal text-neutral-200">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="flex h-full w-full flex-col  justify-start rounded-b-2xl bg-gradient-to-b from-[#1b181f] to-neutral-900 p-4 align-middle">
            <div className="flex flex-col items-center justify-center">
              {/* make the div 4 columns wide */}
              <div className="grid h-full w-full gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
                {/* Map through the filteredGames array to render GameCard components */}
                {Array.isArray(games) &&
                  games.map((game) => (
                    <GameCard
                      key={game?.gameId} // Optional chaining used here
                      name={game?.name ?? ""}
                      duration={game?.duration ?? ""}
                      numberOfPlayers={game?.numberOfPlayers ?? ""}
                      rules={game?.rules ?? ""}
                      description={game?.description ?? ""}
                      rating={game?.averageRating ?? 0}
                      gameId={game?.gameId ?? 0} // Assuming gameId is a number, provide a default value if necessary
                      userId={game?.userId ?? ""}
                    />
                  ))}
              </div>
            </div>
          </section>
        </section>
        <MyFriendsBar />

        {/* </div>
      </main> */}
      </PageWrapper>
    </div>
  );
}
