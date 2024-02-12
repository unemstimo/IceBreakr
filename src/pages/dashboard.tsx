import Head from 'next/head';
import Link from 'next/link';
import { useState, FormEvent } from 'react';

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

export default function Dashboard() {

    const [searchTerm, setSearchTerm] = useState('');

    const friendsList = [
        { id: 1, name: 'Friend 1' },
        { id: 2, name: 'Friend 2' },
        { id: 3, name: 'Friend 3' },
      ];

    const handleSearchSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Search Term:", searchTerm);
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
            <div className='flex w-full max-w-screen-l h-screen bg-neutral-950 rounded-3xl'>
                {/* Left section */}
                <section className='rounded-2xl flex-col w-1/4 flex align-middle justify-start p-0 m-2'>
                    <div className='rounded-2xl w-full h-full max-h-40 bg-neutral-900 flex flex-col align-middle justify-center p-4 mb-2'>
                        <button className='w-full h-full hover:bg-neutral-700 flex align-middle items-center justify-start gap-4 rounded-xl p-2'> <UserButton/> Min Profil</button>
                        <button className='w-full h-full hover:bg-neutral-700 flex align-middle items-center justify-start gap-4 rounded-xl p-2'>
                        <HomeRoundedIcon />Hjem
                        </button>
                    </div>
                    <div className='rounded-2xl flex-col w-full h-full bg-neutral-900 flex align-middle justify-start p-4 mb-2' >
                        <div className='flex flex-row justify-between align-baseline items-baseline'>
                            <h2 className='font-bold text-2xl '>Mine Lekelister</h2>
                            <button className='text-l text-neutral-500'>Lag ny</button>
                        </div>
                    </div>
                </section>

                {/* Middle section */}
                <section className='rounded-2xl w-1/2 flex flex-col align-middle justify-start bg-neutral-900 p-8 mt-2 mb-2'>
                    <div className='flex w-full flex-row justify-between align-middle items-center'>
                        <form onSubmit={handleSearchSubmit} className="flex align-middle w-2/3 items-center font-normal bg-neutral-800 text-neutral-600 rounded-full overflow-hidden p-1">
                            <button type="submit" className="p-2">
                                <SearchIcon className='text-neutral-500' />
                            </button>
                            <input 
                                className="pl-2 pr-2 py-2 w-full bg-neutral-800 text-white focus:outline-none" 
                                type="search" // Changed to search to improve semantics
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </form>
                        <button className=" rounded-full bg-violet-600 hover:bg-violet-500 active:bg-violet-800 px-4 py-2 text-white shadow-lg">Bla Gjennom</button>
                    </div>
                </section>

                {/* Right section */}
                <section className='rounded-2xl w-1/4 flex flex-col align-middle justify-start m-2'>
                    <div className='rounded-2xl flex-col w-full h-fit bg-neutral-900 flex align-middle justify-center p-4 mb-2'>
                        <div className='flex flex-row justify-between align-baseline items-baseline'>
                            <h2 className='font-bold text-2xl '>Venner</h2>
                            <button className='text-l text-neutral-500'>Legg til</button>
                        </div>
                        <ul className='w-full'>
                            {friendsList.map(friend => (
                                <li key={friend.id} className='h-16'>
                                    <button className='w-full h-full hover:bg-neutral-700 flex align-middle items-center justify-start gap-4 rounded-xl p-2'>
                                        <FaceRoundedIcon/> {friend.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button className='w-full h-24 bg-violet-600 hover:bg-violet-500 active:bg-violet-800 flex align-middle items-center justify-center gap-2 rounded-xl p-2'>OPPRETT LEK<AddCircleOutlineRoundedIcon/></button>
                </section>
            </div>


        </SignedIn>
      </main>
    </div>
  );
}
