import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from 'next/image';
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import Advertisement from "~/components/advertisement";
import GameCardHorizontal from "~/components/GameCardHorizontal";
import PageWrapper from "~/components/pageWrapper";
import NavigationBar from "~/components/navigationBar";
import { api } from "~/utils/api";
import MyFriendsBar from "~/components/myFriendsBar";
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import Placeholder from "~/assets/images/placeholder.png";
import { Description } from "@radix-ui/react-dialog";
import PitBull from "~/assets/images/pitbull.jpeg";
import { SignedIn, useUser } from "@clerk/nextjs";
import AddIcon from '@mui/icons-material/Add';
import Link from "next/link";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function ListPage() {
  const router = useRouter();
  const { playlistId } = router.query;
  const currentUser = useUser();

  // Fetch data based on playlistId using useQuery
  const playlistQuery = api.playlist.getPlaylistById.useQuery(
    {id: Number(playlistId ?? 1)},
    { enabled: playlistId !== undefined },
  );
  console.log(playlistQuery.data);
  const name = playlistQuery.data?.name ?? "";
  const description = playlistQuery.data?.description ?? "";
  const username = playlistQuery.data?.user.username ?? "";
  const userId = playlistQuery.data?.user.userId ?? "";

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
          {/* Playlist Info section */}
          <section className="flex h-full w-full flex-col  justify-start rounded-t-2xl p-4  align-middle bg-gradient-to-b from-violet-900 to-[#1b181f]">
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
                    <p className="text-neutral-400 font-normal w-full flex">
                      Laget av: {username} • {amountOfGames} leker
                    </p>
                    <p className="text-neutral-400 mt-6 font-normal text-md text-neutral-200">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* List section */}
          <section className="flex h-full w-full flex-col  justify-start rounded-b-2xl p-4 align-middle bg-gradient-to-b from-[#1b181f] to-neutral-900">
            <div className="flex items-center flex-col justify-center">
              <div className="grid w-full h-full gap-4 -mt-10">
                {/* Header for game list */}
                <div className="relative h-10 align-top flex w-full flex-row border-b-2 border-neutral-800">
                  <div className="flex-grow justify-normal mr-10">
                    <p className="ml-10 pt-1">Tittel på lek</p>
                  </div>
                  <div className="flex flex-col justify-center mr-4 w-1/3">
                    <p className="ml-10 leading-tight">
                      Beskrivelse
                    </p>
                  </div>
                  <div className="flex flex-col justify-center mr-4 w-1/3">
                    <p className="text-right">Varighet</p>
                  </div>
                </div>
                {/* Game list */}
                {Array.isArray(games) && games.length > 0 ? (
                  games.map((game) => (
                    <GameCardHorizontal
                      key={game?.gameId}
                      name={game?.name ?? ""}
                      duration={game?.duration ?? ""}
                      numberOfPlayers={game?.numberOfPlayers ?? ""}
                      rules={game?.rules ?? ""}
                      description={game?.description ?? ""}
                      rating={Math.floor(Math.random() * 5) + 1}
                      gameId={game?.gameId ?? 0}
                      userId={game?.userId ?? ""}
                    />
                  ))
                ) : (
                  <>
                    {currentUser.isSignedIn && currentUser.user.id === userId ? (
                      <Link href="/browse">
                        <div className="flex flex-row justify-center hover:bg-neutral-800 w-full h-20 p-6 rounded-lg">
                          <p className="justify-center -mt-1 mr-4">Legg til spill til spilleliste</p>
                          <AddCircleOutlineIcon />
                        </div>
                      </Link>
                    ) : (
                      <div className="flex flex-row justify-center w-full h-20 p-6 rounded-lg">
                        <p className="justify-center -mt-1 mr-4">Ingen spill i spillelisten</p>
                      </div>
                    )}
                  </>
                )}
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
