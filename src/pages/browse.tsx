import Head from 'next/head';
import Link from 'next/link';

export default function Browse() {
  return (
    <div>
      <Head>
        <title>Browse | IceBreakr</title>
        <meta name="description" content="Learn more about what IceBreakr offers." />
      </Head>

      <main className="flex font-darker text-lg font-bold min-h-screen flex-col items-center justify-center bg-neutral-950 text-white">
        <div className='flex w-full max-w-screen-l h-screen justify-center bg-neutral-950 rounded-3xl'>
            <section className='rounded-2xl w-3/4 h-full flex flex-col align-middle justify-start bg-neutral-900 p-4 my-2'>
                    <div className='flex w-full h-full bg-neutral-800 rounded-xl items-center justify-center'>
                        <p>Browse Section</p>
                    </div>
                </section>
        </div>
        <Link href="/">
          <button className='m-8'>Return to Home</button>
        </Link>
      </main>
    </div>
  );
}
