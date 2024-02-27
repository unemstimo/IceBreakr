import Head from "next/head";
import { useState, useEffect, type FormEvent } from "react";

import SearchIcon from "@mui/icons-material/Search";

import Advertisement from "~/components/advertisement";
import GameCard from "~/components/gameCard";
import PageWrapper from "~/components/pageWrapper";
import NavigationBar from "~/components/navigationBar";
import { api } from "~/utils/api";
import { type FetchGames } from "~/server/api/routers/game";
import { Checkbox } from "~/components/ui/checkbox";
import { type Category } from "~/server/api/routers/category";

export default function Browse() {
  const [searchTerm, setSearchTerm] = useState("");
  const [numberOfPlayers, setNumberOfPlayers] = useState("");
  const [duration, setDuration] = useState("");
  const [filteredGames, setFilteredGames] = useState<FetchGames>([]);
  const [gameCategories, setGameCategories] = useState<Record<string, boolean>>(
    {},
  );

  const categoryQuery = api.category.getAll.useQuery();
  const gameQuery = api.gameRouter.getAll.useQuery();
  const games = gameQuery.data ?? [];

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Search Term:", searchTerm);
  };

  const filterGames = () => {
    const filtered = games.filter((game) => {
      if (numberOfPlayers && game.numberOfPlayers !== numberOfPlayers) {
        return false;
      }
      //Duration
      if (Object.values(gameCategories).some((value) => value)) {
        const categories = Object.keys(gameCategories).filter(
          (category) => gameCategories[category],
        );
        if (
          !game.GameInCategory.some((g) => categories.includes(g.category.name))
        ) {
          return false;
        }
      }

      if (searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        if (!game.name.toLowerCase().includes(searchTermLower)) {
          return false;
        }
      }

      return true;
    });

    const sorted = filtered.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    setFilteredGames(sorted);
  };

  useEffect(() => {
    filterGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfPlayers, gameCategories, duration, games, searchTerm]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setNumberOfPlayers("");
    setGameCategories({});
    setDuration("");
  };

  const handlePlayersSelection = (players: string) => {
    if (numberOfPlayers === players) {
      setNumberOfPlayers("");
    } else {
      setNumberOfPlayers(players);
    }
  };

  const handleDurationSelection = (selectedDuration: string) => {
    if (selectedDuration === duration) {
      setDuration("");
    } else {
      setDuration(selectedDuration);
    }
  };

  const handleCategorySelection = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setGameCategories({
      ...gameCategories,
      [event.target.name]: event.target.checked,
    });
  };
  const handleCategorySelection22 = (category: Category) => {
    setGameCategories({
      ...gameCategories,
      [category.name]: !gameCategories[category.name],
    });
    console.log(gameCategories);
  };

  const playerButtons = ["2", "3", "4", "5", "6", "7+"];
  const durationButtons = ["10 min", "20 min", "30 min", "40 min+"];

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
        <div className="ml-2 flex h-auto flex-col">
          <NavigationBar>
            {/* Filters */}
            <div className="mb-2 flex h-fit w-full flex-col justify-start rounded-2xl bg-neutral-900 p-2 align-middle">
              <div className="flex flex-row items-baseline justify-between align-baseline">
                <h2 className="text-2xl font-bold ">Filtere</h2>
                <button
                  className="text-l text-neutral-500 hover:underline"
                  onClick={handleClearFilters}
                >
                  Tøm
                </button>
              </div>

              {/* Number of player buttons */}
              <div className="-m-2 mb-2 mt-2 rounded-xl bg-neutral-800 p-2">
                <p className="-mt-1 mb-1">Antall Spillere:</p>
                {playerButtons.map((players) => (
                  <button
                    key={players}
                    className={`ml-1 mr-0 rounded-full px-3 py-1 text-sm text-white shadow-lg hover:bg-violet-500 active:bg-violet-800 ${
                      numberOfPlayers === players
                        ? "bg-violet-600"
                        : "bg-neutral-700"
                    }`}
                    onClick={() => handlePlayersSelection(players)}
                  >
                    {players}
                  </button>
                ))}
              </div>
              {/* Category checkboxes */}
              <div className="-m-2 mb-2 mt-2 rounded-xl bg-neutral-800 p-2">
                <p>Spillkategorier:</p>
                <div className="flex flex-col gap-2 p-2">
                  {categoryQuery.data?.map((category) => (
                    // Label
                    <label
                      key={category.categoryId}
                      htmlFor="terms1"
                      className="flex items-center gap-2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <Checkbox
                        onCheckedChange={(checkedState) => {
                          const checked = checkedState.valueOf();

                          console.log("checked", checked);
                          handleCategorySelection22(category);
                        }}
                        name={category.name}
                        checked={gameCategories[category.name] ?? false}
                      />
                      <p>{category.name}</p>
                    </label>
                  )) ?? null}
                </div>
              </div>

              {/* Duration buttons */}
              <div className="-m-2 mt-2 rounded-xl bg-neutral-800 p-2">
                <p className="-mt-1 mb-1">Varighet:</p>
                {durationButtons.map((durationOption) => (
                  <button
                    key={durationOption}
                    className={`ml-0 mr-1 rounded-full px-2 py-1 text-sm text-white shadow-lg hover:bg-violet-500 active:bg-violet-800 ${
                      durationOption === duration
                        ? "bg-violet-600"
                        : "bg-neutral-700"
                    }`}
                    onClick={() => handleDurationSelection(durationOption)}
                  >
                    {durationOption}
                  </button>
                ))}
              </div>
            </div>

            {/* Ad space */}
            <p className="font-normal text-neutral-500">Annonse</p>
            <div className="flex h-auto w-full items-center justify-center overflow-hidden rounded-xl bg-neutral-800">
              <div className="h-full w-full">
                <Advertisement />
              </div>
            </div>
          </NavigationBar>
        </div>
        {/* Middle section */}
        <section className="flex h-full w-full">
          <section className="mr-2 flex h-full w-full min-w-[1100px] grow flex-col justify-start rounded-2xl bg-neutral-900 p-4 align-middle">
            <div className="flex items-center justify-center">
              {/* make the div 4 columns wide */}
              <div className="mt-4 grid grid-cols-4 gap-4 overflow-y-auto rounded-xl bg-neutral-900">
                <div className="col-span-4">
                  {/* Search section */}
                  <div className="flex w-full flex-row items-center justify-between align-middle">
                    <form
                      onSubmit={handleSearchSubmit}
                      className="flex items-center overflow-hidden rounded-full bg-neutral-800 p-1 align-middle font-normal text-neutral-600"
                    >
                      <button type="submit" className="p-2">
                        <SearchIcon className="text-neutral-500" />
                      </button>
                      <input
                        className="w-full bg-neutral-800 py-2 pl-2 pr-2 text-white focus:outline-none"
                        type="search" // Changed to search to improve semantics
                        placeholder="Søk..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </form>
                    <div className="flex items-center justify-start gap-2 align-middle">
                      <p className="mr-2 font-bold text-neutral-500">
                        Sorter:{" "}
                      </p>
                      <button className=" rounded-full bg-violet-600 px-4 py-2 text-white shadow-lg hover:bg-violet-500 active:bg-violet-800">
                        Populære
                      </button>
                      <button className=" rounded-full bg-violet-600 px-4 py-2 text-white shadow-lg hover:bg-violet-500 active:bg-violet-800">
                        Nyeste
                      </button>
                      <button className=" rounded-full bg-violet-600 px-4 py-2 text-white shadow-lg hover:bg-violet-500 active:bg-violet-800">
                        Navn
                      </button>
                    </div>
                  </div>
                  {/* Content section */}
                  <div className="-mb-2 mt-4 flex w-full justify-start">
                    <p className="font-normal text-neutral-500">
                      Viser 0 av 999 leker • Navn A til Æ
                    </p>
                  </div>
                </div>
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

        {/* </div>
      </main> */}
      </PageWrapper>
    </div>
  );
}
