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
                    <div className='flex w-full h-full bg-neutral-800 rounded-xl mt-4 items-center justify-center'>
                        <p>Content</p>
                    </div>
                </section>
                {showCreateGame.visible && (
                    <div className='absolute flex flex-col top-0 left-0 w-full h-full bg-neutral-900 bg-opacity-90 justify-center align-middle items-center'>
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
