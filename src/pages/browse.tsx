import Head from "next/head";
import { useState, type FormEvent } from "react";
import { v4 as uuid } from "uuid";
import CreateGame from "~/components/CreateGame";
import SearchIcon from "@mui/icons-material/Search";

import Advertisement from "~/components/advertisement";
import GameCard from "~/components/gameCard";
import PageWrapper from "~/components/pageWrapper";
import NavigationBar from "~/components/navigationBar";

export default function Browse() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Search Term:", searchTerm);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
  };

  const [showCreateGame, setShowCreateGame] = useState({ visible: false });

  const handleCreateGameShow = () => {
    setShowCreateGame({ visible: !showCreateGame.visible });
  };

  const handleCancelCreateGame = () => {
    setShowCreateGame({ visible: false });
  };

  const [games, setGames] = useState([
    {
      rules: "Kast frisbeen til en medspiller i motstanderens målområde uten å bli tatt av motstanderen. Poeng scores når mottakeren fanger frisbeen i motstanderens målområde. Bytt besittelse av frisbeen ved feil eller turnover.",
      id: uuid(),
      name: "Ultimate Treningskamp",
      playtime: "Varierer",
      category: "Fysisk lek",
      players: "7-14",
      description: "En kombinasjon av fotball, rugby og Ultimate Frisbee.",
      rating: 4.7,
    },
    {
      rules: "En spiller som 'den som jakter' prøver å berøre andre spillere. Spillerne løper rundt for å unngå å bli fanget. Den siste som er igjen, blir den neste 'den som jakter'.",
      id: uuid(),
      name: "Sisten",
      playtime: "1 time",
      category: "Fysisk lek",
      players: "4-20",
      description: "En spennende utendørs lek.",
      rating: 5,
    },
    {
      rules: "Spillerne står i en sirkel og kaster en ball til hverandre. Målet er å ikke la ballen falle på bakken. Hvis ballen faller, må spilleren som kastet ballen, gå ut av sirkelen.",
      id: uuid(),
      name: "Vri åtter",
      playtime: "45 minutter",
      category: "Fysisk lek",
      players: "3-12",
      description: "En utfordrende lek for å strekke seg.",
      rating: 4,
    },
    {
      rules: "En klassisk lek hvor en person prøver å fange andre spillere. Hvis en spiller blir fanget, blir de med i jakten.",
      id: uuid(),
      name: "Boksen går",
      playtime: "20 minutter",
      category: "Fysisk lek",
      players: "5-15",
      description: "En klassisk lek for å øve på reaksjonsevne.",
      rating: 4.2,
    },
    {
      rules: "Spillerne kaster ringer mot en sylinder som står i en avstand. Poeng scores når en ring lander rundt sylinderen.",
      id: uuid(),
      name: "Ringleken",
      playtime: "40 minutter",
      category: "Fysisk lek",
      players: "4-12",
      description: "En morsom lek som innebærer å kaste ringer.",
      rating: 4.7,
    },
    {
      rules: "Kast en kubbe for å forsøke å treffe motstanderens kubber. Målet er å treffe alle kubbene og deretter kaste kongen for å vinne.",
      id: uuid(),
      name: "Kubb",
      playtime: "1 time",
      category: "Fysisk lek",
      players: "2-12",
      description: "Et strategisk spill som innebærer å kaste kubber.",
      rating: 4.3,
    },
    {
      rules: "Sitt på huskene og prøv å svinge så høyt som mulig. Vinneren er den som klarer å svinge høyest.",
      id: uuid(),
      name: "Husker",
      playtime: "30 minutter",
      category: "Fysisk lek",
      players: "2-4",
      description: "En klassisk lek som utfordrer balanse.",
      rating: 4.8,
    },
    {
      rules: "Hopp over et tau som blir svingt av en person på den ene siden til den andre. Prøv å unngå å bli truffet av tauet.",
      id: uuid(),
      name: "Hoppe tau",
      playtime: "20 minutter",
      category: "Fysisk lek",
      players: "1-4",
      description: "En flott måte å trene kondisjon på.",
      rating: 4.6,
    },
    {
      rules: "En person er 'kongen' og gir kommandoer til resten av gruppen. De andre spillerne må følge kommandoene.",
      id: uuid(),
      name: "Kongen befaler",
      playtime: "1 time",
      category: "Fysisk lek",
      players: "5-30",
      description: "En morsom lek hvor en person gir kommandoer.",
      rating: 4.4,
    },
    {
      rules: "En spiller er 'blindemann' og prøver å fange de andre spillerne mens de er blindfolded. Andre spillere må unngå å bli fanget.",
      id: uuid(),
      name: "Blindemann",
      playtime: "30 minutter",
      category: "Fysisk lek",
      players: "5-20",
      description: "En spennende lek som handler om å unngå å bli fanget.",
      rating: 4.9,
    },
    {
      rules: "To lag konkurrerer om å score mål ved å sparke en ball inn i motstanderens mål. Målet er å score flere mål enn motstanderlaget.",
      id: uuid(),
      name: "Fotball",
      playtime: "1 time",
      category: "Fysisk lek",
      players: "6-22",
      description: "En populær sport som spilles over hele verden.",
      rating: 4.5,
    },
    {
      rules: "Spillerne kaster baller på hverandre mens de prøver å unngå å bli truffet. Hvis en spiller blir truffet, er de ute.",
      id: uuid(),
      name: "Stikkball",
      playtime: "45 minutter",
      category: "Fysisk lek",
      players: "4-16",
      description: "En morsom lek som involverer å kaste og fange baller.",
      rating: 4.3,
    },
  ]);

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
        <div className="ml-2 flex flex-col h-auto">
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
        <section className="flex h-full ">
          <section className="mr-2 flex h-full w-full min-w-[420px] grow flex-col justify-start rounded-2xl bg-neutral-900 p-4 align-middle">
            {/* Search section */}
            <div className="flex w-full flex-row items-center justify-between align-middle">
              <form
                onSubmit={handleSearchSubmit}
                className="flex w-2/3 items-center overflow-hidden rounded-full bg-neutral-800 p-1 align-middle font-normal text-neutral-600"
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
                <p className="mr-2 font-bold text-neutral-500">Sorter: </p>
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
            <div className="mt-4 flex h-full w-full flex-wrap justify-start gap-4 overflow-y-auto rounded-xl bg-neutral-900">
              {/* Map through the games array to render GameCard components */}
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  name={game.name}
                  playtime={game.playtime}
                  category={game.category}
                  players={game.players}
                  rules={game.rules}
                  description={game.description}
                  rating={game.rating}
                />
              ))}
            </div>
          </section>
        </section>

        
        {/* </div>
      </main> */}
      
      </PageWrapper>
    </div>
  );
}
