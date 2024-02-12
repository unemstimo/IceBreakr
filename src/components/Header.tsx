import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <div>
        <Link href="/">
          <button>IceBreakr</button>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <button>Home</button>
            </Link>
          </li>
          <li>
            <Link href="/browse">
              <button>Browse</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
