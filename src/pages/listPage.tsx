import Head from "next/head";
import { useState, useEffect, type FormEvent } from "react";
import Image from 'next/image';

import SearchIcon from "@mui/icons-material/Search";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";

import Advertisement from "~/components/advertisement";
import GameCard from "~/components/gameCard";
import PageWrapper from "~/components/pageWrapper";
import NavigationBar from "~/components/navigationBar";
import { api } from "~/utils/api";
import { type FetchGames } from "~/server/api/routers/game";
import { Checkbox } from "~/components/ui/checkbox";
import { type Category } from "~/server/api/routers/category";
import router from "next/router";
import MyFriendsBar from "~/components/myFriendsBar";
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import Placeholder from "~/assets/images/placeholder.png";

export default function listPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [numberOfPlayers, setNumberOfPlayers] = useState("");
  const [duration, setDuration] = useState("");
  const [filteredGames, setFilteredGames] = useState<FetchGames>([]);
  const [gameCategories, setGameCategories] = useState<Record<string, boolean>>(
    {},
  );
  
  const { playlistId } = router.query;
  const playlistQuery = api.playlist.getPlaylistById.useQuery(
    { id: Number(playlistId ?? 1) },
    { enabled: playlistId !== undefined },
  );
  const name = playlistQuery.data?.name ?? "";
  const description = playlistQuery.data?.description ?? "";

  const categoryQuery = api.category.getAll.useQuery();
  const gameQuery = api.gameRouter.getAll.useQuery();
  const games = gameQuery.data ?? [];

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

            
          </NavigationBar>
        {/* Middle section */}
        <section className="flex h-full w-full">
          <section className="flex h-full w-full flex-col  justify-start rounded-2xl bg-neutral-900 p-4 align-middle">
            <div className="flex items-center flex-col justify-center">
              <div className="flex w-full justify-start mb-4 items-center align-middle gap-2">
                <button onClick={() => router.back()}>
                <ArrowBackRounded/>
                  </button> Tilbake
                </div>

                <div className=" flex h-full min-h-48 w-full items-start">
              <div className="h-full w-full max-w-60 mb-10">
                <Image
                  className="h-auto w-full rounded-lg"
                  src={Placeholder}
                  alt="Game Image"
                  width={200}
                  height={200}
                />
              </div>
              
              <div className="mb-4 ml-4 pb-10 flex h-full flex-col justify-between">
                <div>
                  <h1 className="text-xxl"></h1>
                  <h2 className="text-neutral-400 font-normal">
                    {numberOfPlayers} Antall leker {duration}
                  </h2>
                  <p className="mt-6 font-normal text-md text-neutral-200">
                    DESCRITION TODO
                  </p>
                </div>
              </div>
            </div>
              {/* make the div 4 columns wide */}
              <div className="grid w-full h-full xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-1 gap-4">
                {/* Map through the filteredGames array to render GameCard components */}
                  {filteredGames.map((game) => (
                    <GameCard
                      key={game.gameId}
                      name={game.name}
                      duration={game.duration}
                      // category={"kategori"}
                      numberOfPlayers={game.numberOfPlayers}
                      rules={game.rules}
                      description={game.description}
                      rating={Math.floor(Math.random() * 5) + 1}
                      gameId={game.gameId}
                      userId={game.userId}
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
