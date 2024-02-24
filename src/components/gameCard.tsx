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
      <div className="relative flex h-auto max-h-80 min-h-80 min-w-60 max-w-60 cursor-pointer flex-col rounded-xl bg-neutral-800 p-4">
        <div className="relative flex h-full w-full flex-col overflow-clip">
          <Image
            className="h-auto w-full rounded-lg"
            src={Placeholder}
            alt="Game Image"
            width={200}
            height={200}
          />
          <h2 className="mt-2">{name}</h2>
          <p className="font-normal leading-tight text-neutral-500">
            {description}
          </p>
        </div>
        <button className="absolute right-6 top-3 flex min-w-16 items-center justify-center rounded-full bg-violet-500 align-middle">
          <StarRoundedIcon />
          {rating}
        </button>
      </div>
    </Link>
  );
};

export default GameCard;
