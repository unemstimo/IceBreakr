import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import SearchIcon from "@mui/icons-material/Search";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CountdownComponent from "./countdownComponent";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTimeLeft } from "~/redux/countdownSlice";

type NavigationBarProps = {
  children: React.ReactNode | React.ReactElement[];
};
const NavigationBar = ({ children }: NavigationBarProps) => {
  const currentPath = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTimeLeft = localStorage.getItem('timeLeft');
    if (storedTimeLeft !== null) {
      dispatch(setTimeLeft(Number(storedTimeLeft)));
    }
  }, [dispatch]);

  return (
    <>
      <section className="flex h-full md:w-full max-w-72 w-20 flex-col justify-start gap-4 rounded-2xl p-0 align-middle">
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
                  "flex h-full w-full items-center md:justify-start justify-center gap-4 rounded-xl p-2 align-middle hover:bg-neutral-700",
                  { "bg-neutral-700": currentPath === "/profile" },
                )}
              >
                <UserButton /> <p className="hidden md:block">Min Profil</p>
              </button>
            </Link>
          </SignedIn>
          <Link href={"/dashboard"} className="h-full w-full">
            <button
              className={classNames(
                "flex md:h-full md:w-full w-12 h-12 items-center md:justify-start justify-center gap-4 rounded-xl p-2 align-middle hover:bg-neutral-700",
                { "bg-neutral-700": currentPath === "/dashboard" },
              )}
            >
              <HomeRoundedIcon />
              <p className="hidden md:block">Hjem</p>
            </button>
          </Link>
          <Link href={"/browse"} className="h-full w-full">
            <button
              className={classNames(
                "flex -mb-2 md:mb-0 md:h-full md:w-full w-12 h-12 items-center md:justify-start justify-center gap-4 rounded-xl p-2 align-middle hover:bg-neutral-700",
                { "bg-neutral-700": currentPath === "/browse" },
              )}
            >
              <SearchIcon />
              <p className="hidden md:block">Utforsk</p>
            </button>
          </Link>
          <Link href={"/components"}>
            <button
              className={classNames(
                "md:flex hidden h-full w-full items-center justify-start gap-4 rounded-xl p-2 align-middle hover:bg-neutral-700",
                { "bg-neutral-700": currentPath === "/components" },
              )}
            >
              Components (dev)
            </button>
          </Link>
        </div>
        {/* Countdown component */}
        <CountdownComponent />
        <SignedIn>
        <Link href={"/createGame"}>
          <button
            // onClick={handleCreateGameShow}
            className="flex h-20 min-h-20 w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 p-2 align-middle hover:bg-violet-500 active:bg-violet-800"
          > 
            <p className="hidden md:block">OPPRETT LEK</p>
            <AddCircleOutlineRoundedIcon />
          </button>
        </Link>
        </SignedIn>
        <SignedOut>
        <SignInButton>
          <button
              // onClick={handleCreateGameShow}
              className="flex h-20 min-h-20 w-full flex-col items-center justify-center gap-1 rounded-2xl bg-violet-600 p-10 align-middle hover:bg-violet-500 active:bg-violet-800"
            > 
              <p className="text-s"> Logg inn for å </p>
              <div>
                <p className="hidden md:block">OPPRETTE LEK</p>
              </div>
            </button>
        </SignInButton>
        </SignedOut>
        {!!children && (
          <div className="mb-0 flex h-full w-full flex-col justify-start rounded-2xl bg-neutral-900 p-4 align-middle">
            {children}
          </div>
        )}
      </section>
    </>
  );
};

export default NavigationBar;
