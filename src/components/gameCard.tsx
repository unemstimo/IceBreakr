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

const GameCard = ({ gameId, name, description, rating }: Game) => {
  // Prepare the game object from props

  // Generate query string

  return (
    <Link href={`/gamePage?gameId=${gameId}`} passHref>
      <div className="relative flex h-full max-h-80 w-full min-w-36 max-w-full cursor-pointer flex-col rounded-xl bg-neutral-800 p-4 text-rg md:max-w-full xl:min-h-60">
        <div className="relative flex h-full w-full flex-col align-top">
          <Image
            className="hidden h-auto w-full rounded-lg xl:flex"
            src={Placeholder}
            alt="Game Image"
            width={200}
            height={200}
          />
          <h2 className="xl:mt-2 truncate overflow-hidden">{name}</h2>
          <p className="font-normal leading-tight text-neutral-500 line-clamp-3 overflow-hidden ...">
            {description}
          </p>
        </div>
        {rating > 0 && (
          <div className="absolute right-3 top-3 flex w-14 items-center justify-center rounded-full bg-violet-500 align-middle xl:min-w-16">
            <StarRoundedIcon />
            {rating.toFixed(1)}
          </div>
        )}
      </div>
    </Link>
  );
};

export default GameCard;
