import Head from 'next/head';
import Link from 'next/link';

import {
    SignInButton,
    SignOutButton,
    SignedIn,
    SignedOut,
    UserButton,
    useUser,
  } from "@clerk/nextjs";
import { Container } from 'postcss';

export default function Dashboard() {
  return (
    <div>
      <Head>
        <title>Dashboard | IceBreakr</title>
        <meta name="dashboard" content="Learn more about what IceBreakr offers." />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <SignedOut>
          <SignInButton />
          <p>
            This content is public. Only signed out users can see the
            SignInButton above this text.
          </p>
        </SignedOut>
        <SignedIn>
            <h1>Dashboard</h1>
            <div className='flex w-full max-w-screen-xl h-screen bg-violet-500 rounded-3xl'>
                <section className='rounded-2xl flex-col w-1/4 bg-lime-500 flex align-middle justify-center p-0 m-2'>
                    <div className='rounded-2xl w-full h-full max-h-40 bg-slate-500 flex align-middle justify-center p-2 mb-2'>USERBOX</div>
                    <div className='rounded-2xl w-full h-full bg-teal-500 flex align-middle justify-center p-2' >PLAYLIST</div>
                </section>
                <section className='rounded-2xl w-1/2 flex align-middle justify-center flex-row bg-teal-800 p-8 mt-2 mb-2'>
                    <div><h1>Mid</h1></div>
                </section>
                <section className='rounded-2xl w-1/4 flex align-middle justify-center bg-rose-700 p-8 m-2'>
                    Rightgh
                </section>
            </div>


        </SignedIn>
      </main>
    </div>
  );
}
