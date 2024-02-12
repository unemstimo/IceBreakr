import Head from 'next/head';
import Link from 'next/link';

export default function Browse() {
  return (
    <div>
      <Head>
        <title>Browse | IceBreakr</title>
        <meta name="description" content="Learn more about what IceBreakr offers." />
      </Head>

      <main>
        <h1>About IceBreakr</h1>
        <Link href="/">
          <button>Return to Home</button>
        </Link>
      </main>
    </div>
  );
}
