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

const GameCardHorizontal = ({
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
      <div className="relative text-rg flex w-full cursor-pointer flex-col rounded-lg hover:bg-neutral-800 p-2">
        <div className="relative h-10 align-top flex w-full flex-row overflow-clip">
          <Image
            className="h-auto rounded-lg xl:flex hidden"
            src={Placeholder}
            alt="Game Image"
            width={40}
          />
          <div className="flex-grow justify-normal mr-10">
            <h2 className="ml-10 pt-1">{name}</h2>
          </div>
          <div className="flex flex-col justify-center mr-4 w-1/3">
            <p className="font-normal ml-10 leading-tight text-neutral-500">
              {description}
            </p>
          </div>
          <div className="flex flex-col justify-center mr-4 w-1/3">
            <p className="text-right">{duration}</p>
          </div>
        </div>
        {/* <button className="absolute right-3 top-3 flex xl:min-w-16 w-14 items-center justify-center rounded-full bg-violet-500 align-middle">
          <StarRoundedIcon />
          {rating}
        </button> */}
      </div>


    </Link>
  );
};

export default GameCardHorizontal;
