import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='flex w-full flex-row align-middle justify-center p-4 bg-violet-400 font-darker text-2xl font-bold'>
      <div className='w-full'>
        <Link href="/">
          <button>FOR DEV ONLY</button>
        </Link>
      </div>
      <nav className='flex w-full justify-center align-middle items-center gap-3'>
        <Link href="/">
              <button>Sign In</button>
        </Link>
        <Link href="/browse">
              <button>Browse</button>
        </Link>
        <Link href="/dashboard">
              <button>Dashboard</button>
        </Link>
      </nav>
      <div className='w-full'>
        <UserButton />
      </div>
      
    </header>
  );
};

export default Header;
