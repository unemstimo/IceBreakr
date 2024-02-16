import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useState } from "react";
import CreateGame from "./CreateGame";
import SearchIcon from "@mui/icons-material/Search";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

type NavigationBarProps = {
  children: React.ReactNode | React.ReactElement[];
};
const NavigationBar = ({ children }: NavigationBarProps) => {
  const [showCreateGame, setShowCreateGame] = useState(false);
  const handleCreateGameShow = () => {
    setShowCreateGame(true);
  };

  const handleCancelCreateGame = () => {
    setShowCreateGame(false);
  };

  const currentPath = usePathname();

  return (
    <>
      <section className="flex h-full w-1/4 min-w-72 flex-col justify-start gap-4 rounded-2xl p-0 align-middle">
        <div className="flex h-fit w-full flex-col justify-center gap-2 rounded-2xl bg-neutral-900 p-4 align-middle">
          <SignedOut>
            <SignInButton>
              <button
                className={classNames(
                  "flex h-full w-full items-center justify-start gap-4 rounded-xl p-2 align-middle hover:bg-neutral-700",
                )}
              >
                <AccountBoxIcon /> Logg inn
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href={"/profile"} className="h-full w-full">
              <button
                className={classNames(
                  "flex h-full w-full items-center justify-start gap-4 rounded-xl p-2 align-middle hover:bg-neutral-700",
                  { "bg-neutral-700": currentPath === "/profile" },
                )}
              >
                <UserButton /> Min Profil
              </button>
            </Link>
          </SignedIn>
          <Link href={"/dashboard"} className="h-full w-full">
            <button
              className={classNames(
                "flex h-full w-full items-center justify-start gap-4 rounded-xl p-2 align-middle hover:bg-neutral-700",
                { "bg-neutral-700": currentPath === "/dashboard" },
              )}
            >
              <HomeRoundedIcon />
              Hjem
            </button>
          </Link>
          <Link href={"/browse"} className="h-full w-full">
            <button
              className={classNames(
                "flex h-full w-full items-center justify-start gap-4 rounded-xl p-2 align-middle hover:bg-neutral-700",
                { "bg-neutral-700": currentPath === "/browse" },
              )}
            >
              <SearchIcon />
              Utforsk
            </button>
          </Link>
        </div>
        <button
          onClick={handleCreateGameShow}
          className="flex h-20 min-h-20 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 p-2 align-middle hover:bg-violet-500 active:bg-violet-800"
        >
          OPPRETT LEK
          <AddCircleOutlineRoundedIcon />
        </button>
        <div className="mb-0 flex h-full w-full flex-col justify-start rounded-2xl bg-neutral-900 p-4 align-middle">
          {children}
        </div>
      </section>

      {showCreateGame && (
        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-neutral-900 bg-opacity-90 align-middle">
          <CreateGame />
          <button
            className="text-l mt-2 text-neutral-300 hover:underline"
            onClick={handleCancelCreateGame}
          >
            Avbryt
          </button>
        </div>
      )}
    </>
  );
};

export default NavigationBar;
