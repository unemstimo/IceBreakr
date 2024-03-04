import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from 'next/image';
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import Advertisement from "~/components/advertisement";
import GameCard from "~/components/gameCard";
import PageWrapper from "~/components/pageWrapper";
import NavigationBar from "~/components/navigationBar";
import { api } from "~/utils/api";
import MyFriendsBar from "~/components/myFriendsBar";
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import Placeholder from "~/assets/images/placeholder.png";
import { Description } from "@radix-ui/react-dialog";
import PitBull from "~/assets/images/pitbull.jpeg";
import { useUser } from "@clerk/nextjs";

export default function ListPage() {
  const router = useRouter();
  const { playlistId } = router.query;

  // Fetch data based on playlistId using useQuery
  const playlistQuery = api.playlist.getPlaylistById.useQuery(
    {id: Number(playlistId ?? 1)},
    { enabled: playlistId !== undefined },
  );
  console.log(playlistQuery.data);
  const name = playlistQuery.data?.name ?? "";
  const description = playlistQuery.data?.description ?? "";
  const username = playlistQuery.data?.user.username ?? "";

  const gameInPlaylistData = playlistQuery.data?.GameInPlaylist ?? [];
  const games = [];
  for (let i = 0; i < gameInPlaylistData.length; i++) {
    games.push(gameInPlaylistData[i]?.game);
  }
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
            className="md:hidden flex h-12 w-12 items-center justify-center gap-2 rounded-xl p-2 align-middle hover:bg-neutral-600 active:bg-violet-500"
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
          <section className="flex h-full w-full flex-col  justify-start rounded-t-2xl p-4 -mb-4 align-middle border-b-2 bg-gradient-to-b from-violet-900 to-[#1b181f]">
            <div className="flex items-center flex-col justify-center">
              <div className="flex w-full justify-start mb-4 items-center align-middle gap-2">
                <button onClick={() => router.back()}>
                <ArrowBackRounded/>
                </button> Tilbake
              </div>

              <div className=" flex h-full min-h-48 w-full items-start">
                <div className="h-full w-full max-w-60 mb-10">
                  <Image
                    className="rounded-xl object-cover"
                    src={PitBull}
                    width={200}
                    alt="Eucalyptus Oil Ad"
                    objectFit="cover"
                  />
                </div>
              
                <div className="mb-4 ml-4 pb-10 flex h-full flex-col justify-between">
                  <div>
                    <p className="mt-6 font-normal text-md text-neutral-200">
                        Spilleliste
                    </p>
                    <h1 className="text-xxl">{name}</h1>
                    <p className="text-neutral-400 font-normal">
                      Laget av: {username} • {amountOfGames} leker
                    </p>
                    <p className="mt-6 font-normal text-md text-neutral-200">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="flex h-full w-full flex-col  justify-start rounded-b-2xl p-4 align-middle bg-gradient-to-b from-[#1b181f] to-neutral-900">
            <div className="flex items-center flex-col justify-center">
              {/* make the div 4 columns wide */}
              <div className="grid w-full h-full xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-1 gap-4">
                {/* Map through the filteredGames array to render GameCard components */}
                {Array.isArray(games) && games.map((game) => (
                  <GameCard
                    key={game?.gameId} // Optional chaining used here
                    name={game?.name ?? ""}
                    duration={game?.duration ?? ""}
                    numberOfPlayers={game?.numberOfPlayers ?? ""}
                    rules={game?.rules ?? ""}
                    description={game?.description ?? ""}
                    rating={Math.floor(Math.random() * 5) + 1}
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
