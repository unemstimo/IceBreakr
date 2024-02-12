import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='flex w-full flex-row align-middle justify-center'>
      <div>
        <Link href="/">
          <button>IceBreakr</button>
        </Link>
      </div>
      <nav className='flex w-full justify-center gap-3'>
        <Link href="/">
              <button>Home</button>
        </Link>
        <Link href="/browse">
              <button>Browse</button>
        </Link>
        <Link href="/dashboard">
              <button>Dashboard</button>
        </Link>
      </nav>
      <div>
        <UserButton />
      </div>
    </header>
  );
};

export default Header;
