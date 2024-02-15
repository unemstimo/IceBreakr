import Head from 'next/head';
import Link from 'next/link';
import { useState, FormEvent, useEffect} from 'react';
import { v4 as uuid } from "uuid";
import CreateGame from '~/components/CreateGame';

import {
    SignInButton,
    SignOutButton,
    SignedIn,
    SignedOut,
    UserButton,
    useUser,
  } from "@clerk/nextjs";
import { Container } from 'postcss';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FaceRoundedIcon from '@mui/icons-material/FaceRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import SearchIcon from '@mui/icons-material/Search';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Advertisement from '~/components/advertisement';
import GameCard from '~/components/gameCard';

export default function Browse() {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Search Term:", searchTerm);
    };

    const handleClearFilters = () => {
        setSearchTerm('');
    }

    const [showCreateGame, setShowCreateGame] = useState({ visible: false});

    const handleCreateGameShow = () => {
      setShowCreateGame({ visible: !showCreateGame.visible});
    };

    const handleCancelCreateGame = () => {
        setShowCreateGame({ visible: false});
    };

    const [games, setGames] = useState([
      { id: uuid(), name: "Sura", playtime: "30 minutter", category: "Fysisk lek", players: "2-10", description: "En morsom fysisk lek.", rating: 4.5 },
      { id: uuid(), name: "Sisten", playtime: "1 time", category: "Fysisk lek", players: "4-20", description: "En spennende utendørs lek.", rating: 5 },
      { id: uuid(), name: "Vri åtter", playtime: "45 minutter", category: "Fysisk lek", players: "3-12", description: "En utfordrende lek for å strekke seg.", rating: 4 },
      { id: uuid(), name: "Boksen går", playtime: "20 minutter", category: "Fysisk lek", players: "5-15", description: "En klassisk lek for å øve på reaksjonsevne.", rating: 4.2 },
      { id: uuid(), name: "Ringleken", playtime: "40 minutter", category: "Fysisk lek", players: "4-12", description: "En morsom lek som innebærer å kaste ringer.", rating: 4.7 },
      { id: uuid(), name: "Kubb", playtime: "1 time", category: "Fysisk lek", players: "2-12", description: "Et strategisk spill som innebærer å kaste kubber.", rating: 4.3 },
      { id: uuid(), name: "Husker", playtime: "30 minutter", category: "Fysisk lek", players: "2-4", description: "En klassisk lek som utfordrer balanse.", rating: 4.8 },
      { id: uuid(), name: "Hoppe tau", playtime: "20 minutter", category: "Fysisk lek", players: "1-4", description: "En flott måte å trene kondisjon på.", rating: 4.6 },
      { id: uuid(), name: "Kongen befaler", playtime: "1 time", category: "Fysisk lek", players: "5-30", description: "En morsom lek hvor en person gir kommandoer.", rating: 4.4 },
      { id: uuid(), name: "Blindemann", playtime: "30 minutter", category: "Fysisk lek", players: "5-20", description: "En spennende lek som handler om å unngå å bli fanget.", rating: 4.9 },
      { id: uuid(), name: "Fotball", playtime: "1 time", category: "Fysisk lek", players: "6-22", description: "En populær sport som spilles over hele verden.", rating: 4.5 },
      { id: uuid(), name: "Stikkball", playtime: "45 minutter", category: "Fysisk lek", players: "4-16", description: "En morsom lek som involverer å kaste og fange baller.", rating: 4.3 },
      { id: uuid(), name: "Hesteskokasting", playtime: "30 minutter", category: "Fysisk lek", players: "2-8", description: "En tradisjonell lek som handler om å kaste hestesko på en pinne.", rating: 4.7 },
      { id: uuid(), name: "Tautrekking", playtime: "1 time", category: "Fysisk lek", players: "4-20", description: "En konkurransedyktig lek som tester styrke.", rating: 4.6 },
      { id: uuid(), name: "Potetløp", playtime: "20 minutter", category: "Fysisk lek", players: "3-10", description: "En morsom lek som innebærer å balansere poteter på skjeer.", rating: 4.4 },
      { id: uuid(), name: "Eggeløp", playtime: "30 minutter", category: "Fysisk lek", players: "3-12", description: "En utfordrende lek hvor man må bære et egg på en skje.", rating: 4.8 },
      { id: uuid(), name: "På staur", playtime: "40 minutter", category: "Fysisk lek", players: "5-15", description: "En morsom lek som handler om å hoppe over staur.", rating: 4.5 },
      { id: uuid(), name: "Flasketuten peker på", playtime: "1 time", category: "Fysisk lek", players: "4-20", description: "En klassisk lek som innebærer å kysse den flasken peker på.", rating: 4.3 },
      { id: uuid(), name: "Katt og mus", playtime: "30 minutter", category: "Fysisk lek", players: "6-30", description: "En morsom lek som handler om å unngå å bli fanget.", rating: 4.9 },
      { id: uuid(), name: "Stiv heks", playtime: "40 minutter", category: "Fysisk lek", players: "4-16", description: "En spennende lek hvor en person prøver å fange andre spillere.", rating: 4.7 },
      { id: uuid(), name: "Bytte plass", playtime: "1 time", category: "Fysisk lek", players: "8-40", description: "En morsom lek som innebærer å bytte plass raskt.", rating: 4.5 },
      { id: uuid(), name: "Kaste på boks", playtime: "30 minutter", category: "Fysisk lek", players: "4-12", description: "En utfordrende lek som handler om å kaste baller på en boks.", rating: 4.2 },
      { id: uuid(), name: "Potetkasting", playtime: "20 minutter", category: "Fysisk lek", players: "3-8", description: "En morsom lek hvor man kaster poteter på en målskive.", rating: 4.6 },
    ]);

  return (
    <div>
      <Head>
        <title>Dashboard | IceBreakr</title>
        <meta name="dashboard" content="Learn more about what IceBreakr offers." />
      </Head>

      <main className="flex font-darker text-lg font-bold min-h-screen flex-col items-center justify-center bg-neutral-950 text-white">
        <SignedOut>
          <SignInButton />
          <p>
            This content is public. Only signed out users can see the
            SignInButton above this text.
          </p>
        </SignedOut>
        <SignedIn>
            <div className='flex w-full max-w-screen-l max-w-[1440px] h-screen bg-neutral-950 rounded-3xl'>
                {/* Left section */}
                <section className='rounded-2xl flex-col w-1/4 min-w-72 max-w-96 h-full flex align-middle justify-start p-0 m-2'>
                    <div className='rounded-2xl w-full h-fit max-h-40 bg-neutral-900 flex flex-col align-middle justify-center p-4 mb-2'>
                        <Link href={"/profile"} className='w-full h-full'>
                          <button className='w-full h-full hover:bg-neutral-700 flex align-middle items-center justify-start gap-4 rounded-xl p-2'>
                            <UserButton/> Min Profil
                          </button>
                        </Link>
                        <Link href={"/dashboard"} className='w-full h-full'>
                          <button className='w-full h-full hover:bg-neutral-700 flex align-middle items-center justify-start gap-4 rounded-xl p-2'>
                            <HomeRoundedIcon />Hjem
                          </button>
                        </Link>
                    </div>
                    <button onClick={handleCreateGameShow} className='w-full h-20 min-h-20 bg-violet-600 hover:bg-violet-500 active:bg-violet-800 flex align-middle items-center justify-center gap-2 rounded-xl p-2 mb-2'>
                        OPPRETT LEK<AddCircleOutlineRoundedIcon/>
                    </button>
                    {/* Filters */}
                    <div className='rounded-2xl flex-col w-full h-fit bg-neutral-900 flex align-middle justify-start p-4 mb-2' >
                      <div className='flex flex-row justify-between align-baseline items-baseline'> 
                        <h2 className='font-bold text-2xl '>Filtere</h2>
                        <button className='text-l text-neutral-500 hover:underline' onClick={handleClearFilters}>Tøm</button>
                      </div>
                    </div>
                    {/* Ad space */}
                    <p className='font-normal text-neutral-500'>Annonse</p>
                    <div className='flex overflow-hidden w-full h-auto bg-neutral-800 rounded-xl items-center justify-center' >
                      <div className='w-full h-full'> 
                        <Advertisement/>
                      </div>
                    </div>
                </section>

                {/* Middle section */}
                <section className='rounded-2xl w-full min-w-[420px] h-full flex flex-col align-middle justify-start bg-neutral-900 p-4 my-2'>
                    {/* Search section */}
                    <div className='flex w-full flex-row justify-between align-middle items-center'>
                        <form onSubmit={handleSearchSubmit} className="flex align-middle w-2/3 items-center font-normal bg-neutral-800 text-neutral-600 rounded-full overflow-hidden p-1">
                            <button type="submit" className="p-2">
                                <SearchIcon className='text-neutral-500' />
                            </button>
                            <input 
                                className="pl-2 pr-2 py-2 w-full bg-neutral-800 text-white focus:outline-none" 
                                type="search" // Changed to search to improve semantics
                                placeholder="Søk..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </form>
                        <div className='flex gap-2 align-middle justify-start items-center'>
                            <p className="text-neutral-500 font-bold mr-2">Sorter: </p>
                            <button className=" rounded-full bg-violet-600 hover:bg-violet-500 active:bg-violet-800 px-4 py-2 text-white shadow-lg">Populære</button>
                            <button className=" rounded-full bg-violet-600 hover:bg-violet-500 active:bg-violet-800 px-4 py-2 text-white shadow-lg">Nyeste</button>
                            <button className=" rounded-full bg-violet-600 hover:bg-violet-500 active:bg-violet-800 px-4 py-2 text-white shadow-lg">Navn</button>
                        </div>
                    </div>
                    {/* Content section */}
                    <div className='mt-4 -mb-2 w-full flex justify-start'>
                      <p className='font-normal text-neutral-500'>Viser 0 av 999 leker • Navn A -> Æ</p>
                    </div>
                    <div className='flex w-full h-full bg-neutral-900 rounded-xl mt-4 justify-start flex-wrap gap-4 overflow-y-auto'>
                        {/* Map through the games array to render GameCard components */}
                        {games.map(game => (
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
                {showCreateGame.visible && (
                    <div className='absolute flex flex-col top-0 left-0 w-screen h-screen overflow-hidden bg-neutral-900 bg-opacity-90 justify-center align-middle items-center'>
                        <CreateGame/>
                        <button className='text-l mt-2 text-neutral-300 hover:underline' onClick={handleCancelCreateGame}>Avbryt</button>
                    </div>
                )}
            </div>


        </SignedIn>
      </main>
    </div>
  );
}
