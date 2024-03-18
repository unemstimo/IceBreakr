import { useState, useEffect } from "react";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import Advertisement from "~/components/advertisement";
import GameCard from "~/components/gameCard";
import { api } from "~/utils/api";
import { type FetchGames } from "~/server/api/routers/game";
import { Checkbox } from "~/components/ui/checkbox";
import { type Category } from "~/server/api/routers/category";
import router from "next/router";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";
import Layout from "~/components/layout";
import categoryImages from "src/assets/images/Categories"



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

  const filterGames = () => {
    const filtered = [...games].filter((game) => {
      if (
        numberOfPlayers &&
        parseInt(game.numberOfPlayers) > parseInt(numberOfPlayers)
      ) {
        return false;
      }
      if (duration && parseInt(game.duration) > parseInt(duration)) {
        return false;
      }

      if (Object.values(gameCategories).some((value) => value)) {
        const categories = Object.keys(gameCategories).filter(
          (category) => gameCategories[category],
        );
        if (
          !categories.every((category) =>
            game.GameInCategory.some((g) => g.category.name === category),
          )
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
  }, [numberOfPlayers, gameCategories, duration, searchTerm, gameQuery.data]);

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

  const setCategoryPhoto = (category: Category) => {
    switch (category?.name) {
      case "Ballspill":
        return categoryImages.ballspill;
      case "Brettspill":
        return categoryImages.brettspill;
      case "Navnelek":
        return categoryImages.navnelek;
      case "Gjettelek":
        return categoryImages.gjettelek;
      case "Hagelek":
        return categoryImages.navnelek;
      case "Dans":
        return categoryImages.dans;
      case "Sang":
        return categoryImages.sang;
      case "Aktiv":
        return categoryImages.aktiv;
      case "Spørrelek":
        return categoryImages.spørrelek;
      case "Kortspill":
        return categoryImages.kortspill;
      case "Rollespill":
        return categoryImages.rollespill;  
      default:
        return categoryImages.default;
    }
  }

  const handleDurationSelection = (selectedDuration: string) => {
    if (selectedDuration === duration) {
      setDuration("");
    } else {
      setDuration(selectedDuration);
    }
  };

  const handleCategorySelection = (category: Category) => {
    setGameCategories({
      ...gameCategories,
      [category.name]: !gameCategories[category.name],
    });
    console.log(gameCategories);
  };

  const { toast } = useToast();

  return (
    <Layout
      navbarChildren={
        <>
          <button
            onClick={() => {
              console.log("toast");
              toast({
                title: "Scheduled: Catch up",
                description: "Friday, February 10, 2023 at 5:57 PM",
              });
            }}
          >
            use toast
          </button>
          <button
            // onClick={handleCreateGameShow}
            className="flex h-12 w-12 items-center justify-center gap-2 rounded-xl p-2 align-middle hover:bg-neutral-600 active:bg-violet-500 md:hidden"
          >
            <FilterAltRoundedIcon />
          </button>
          <div className="hidden md:block">
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
                <label htmlFor="time">
                  Max antall spillere: {numberOfPlayers}{" "}
                </label>
                <input
                  type="range"
                  value={numberOfPlayers}
                  id="time"
                  name="time"
                  min="1"
                  max="40"
                  step="1"
                  onChange={(e) => handlePlayersSelection(e.target.value)}
                  className="w-full rounded-lg bg-neutral-800 py-2 pl-2 pr-2 text-white focus:outline-none"
                />
              </div>
              {/* Category checkboxes */}
              <div className="-m-2 mb-2 mt-2 rounded-xl bg-neutral-800 p-2">
                <p>Spillkategorier:</p>
                <div className="flex flex-col gap-2 p-2 text-md font-normal">
                  {categoryQuery.data?.map((category) => (
                    <Checkbox
                      key={category.categoryId}
                      label={category.name}
                      onCheckedChange={(checkedState) => {
                        const checked = checkedState.valueOf();
                        console.log(checked);
                        handleCategorySelection(category);
                      }}
                      name={category.name}
                      checked={gameCategories[category.name] ?? false}
                    />
                  )) ?? null}
                </div>
              </div>

              {/* Duration buttons */}
              <div className="-m-2 mt-2 rounded-xl bg-neutral-800 p-2">
                <label htmlFor="time">Max varighet: {duration} min </label>
                <input
                  type="range"
                  value={duration}
                  id="time"
                  name="time"
                  min="1"
                  max="59"
                  step="1"
                  onChange={(e) => handleDurationSelection(e.target.value)}
                  className="w-full rounded-lg bg-neutral-800 py-2 pl-2 pr-2 text-white focus:outline-none"
                />
              </div>
            </div>
            {/* Ad space */}
            <p className="font-normal text-neutral-500">Annonse</p>
            <div className="flex h-auto w-full items-center justify-center overflow-hidden rounded-xl bg-neutral-800">
              <div className="h-full w-full">
                <Advertisement />
              </div>
            </div>
          </div>
        </>
      }
    >
      {/* Middle section */}
      <section className="flex h-full w-full">
        <section className="flex h-full w-full flex-col justify-start rounded-2xl bg-neutral-900 p-4 align-middle">
          <div className="flex flex-col justify-center gap-6">
            <div className="flex w-full items-center justify-start gap-2 align-middle">
              <button onClick={() => router.back()}>
                <ArrowBackRounded />
              </button>{" "}
              Utforsk alle leker
            </div>
            <div className="w-1/3">
              <Input
                className="w-full bg-neutral-800 text-md text-white focus:outline-none"
                type="search" // Changed to search to improve semantics
                placeholder="Søk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* make the div 4 columns wide */}
            <div className="grid h-full w-full gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
              {/* Map through the filteredGames array to render GameCard components */}
              {filteredGames.map((game) => (
                <GameCard
                  key={game.gameId}
                  name={game.name}
                  refetchGames={() => gameQuery.refetch()}
                  duration={game.duration}
                  numberOfPlayers={game.numberOfPlayers}
                  rules={game.rules}
                  description={game.description ?? ""}
                  rating={game.averageRating}
                  gameId={game.gameId}
                  userId={game.userId}
                  photo = {game.GameInCategory.length > 0 ? setCategoryPhoto(game.GameInCategory[0].category) : categoryImages.default}
                  isFavorite={game.UserFavouritedGame.length > 0}
                />
              ))}
            </div>
          </div>
        </section>
      </section>
    </Layout>
  );
}
