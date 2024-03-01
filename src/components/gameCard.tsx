import Image from "next/image";
import React from "react";
import Placeholder from "~/assets/images/placeholder.png";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import Link from "next/link";

// export type Game = inferProcedureOutput<AppRouter["gameRouter"]["getGameById"]>;
export type Game = {
  gameId: number;
  userId: string;
  name: string;
  duration: string;
  numberOfPlayers: string;
  rules: string;
  description: string;
  rating: number;
};

const GameCard = ({
  gameId,
  userId,
  name,
  duration,
  numberOfPlayers,
  rules,
  description,
  rating,
}: Game) => {
  // Prepare the game object from props

  // Generate query string

  return (
    <Link href={`/gamePage?gameId=${gameId}`} passHref>
      <div className="relative text-rg flex w-full h-full max-h-80 xl:min-h-60 min-w-36 max-w-full md:max-w-full cursor-pointer flex-col rounded-xl bg-neutral-800 p-4">
        <div className="relative align-top flex h-full w-full flex-col overflow-clip">
          <Image
            className="h-auto w-full rounded-lg xl:flex hidden"
            src={Placeholder}
            alt="Game Image"
            width={200}
            height={200}
          />
          <h2 className="xl:mt-2">{name}</h2>
          <p className="font-normal leading-tight text-neutral-500">
            {description}
          </p>
        </div>
        <button className="absolute right-3 top-3 flex xl:min-w-16 w-14 items-center justify-center rounded-full bg-violet-500 align-middle">
          <StarRoundedIcon />
          {rating}
        </button>
      </div>
    </Link>
  );
};

export default GameCard;
