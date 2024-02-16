import React from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";

function NavBar() {
    const router = useRouter();
    const currentPage = router.pathname;

  return (
    <section className="flex h-full w-1/4 min-w-72 flex-col justify-start rounded-2xl p-0 align-middle">
      <div className="mb-2 flex h-fit max-h-40 w-full flex-col justify-center rounded-2xl bg-neutral-900 p-4 align-middle">
        <div className="mb-0">
          <Link href={"/profile"} className="h-full w-full">
            <button className={`flex h-full w-full items-center justify-start gap-4 rounded-xl p-2 align-middle ${currentPage === "/profile" ? "bg-neutral-800" : "hover:bg-neutral-700"}`}>
              <UserButton /> Min Profil
            </button>
          </Link>
        </div>
        <div className="m-1 border-b border-neutral-700">
        </div>
        <div className="mb-0.5">
          <Link href={"/dashboard"} className="h-full w-full">
            <button className={`flex h-full w-full items-center justify-start gap-4 rounded-xl p-2 align-middle ${currentPage === "/dashboard" ? "bg-neutral-800" : "hover:bg-neutral-700"}`}>
              <HomeRoundedIcon />
              Hjem
            </button>
          </Link>
        </div>
        <div className="-mb-4">
          <Link href={"/browse"} className="h-full w-full">
            <button className={`flex h-full w-full items-center justify-start gap-4 rounded-xl p-2 align-middle ${currentPage === "/browse" ? "bg-neutral-800" : "hover:bg-neutral-700"}`}>
              <SearchIcon />
              Utforsk
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NavBar;
