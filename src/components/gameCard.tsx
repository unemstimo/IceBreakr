import Image from "next/image";
import React from "react";
import Placeholder from "~/assets/images/gameplaceholder.png";
import AltPlaceholder from "~/assets/images/gameplaceholder2.png";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import Link from "next/link";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { api } from "~/utils/api";
import { FavoriteRounded } from "@mui/icons-material";
import { duration } from "@mui/material";
import { Badge } from "./ui/badge";

export type Game = {
  gameId: number;
  userId: string;
  name: string;
  duration: string;
  numberOfPlayers: string;
  rules: string;
  description: string;
  rating: number;
  isFavorite: boolean;
  refetchGames: VoidFunction;
};

const GameCard = ({
  gameId,
  name,
  description,
  rating,
  isFavorite,
  refetchGames,
}: Game) => {
  const AddToFavoriteMutation = api.favorite.addGame.useMutation();
  const RemoveFromFavoriteMutation = api.favorite.removeGame.useMutation();

  function handleFavoritePressed(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    // Call TRPC mutation function to add or remove game from favorites
    if (!isFavorite) {
      void handleAddToFavorite();
    } else {
      void handleDeleteFromFavorite();
    }
    refetchGames();
  }

  const handleAddToFavorite = async () => {
    try {
      await AddToFavoriteMutation.mutateAsync({
        gameId: gameId,
      });
    } catch (error) {
      console.log("Error");
    }
  };

  const handleDeleteFromFavorite = async () => {
    try {
      await RemoveFromFavoriteMutation.mutateAsync({
        gameId: gameId,
      });
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <Link href={`/gamePage?gameId=${gameId}`} passHref>
      <div className="relative flex h-full max-h-80 w-full min-w-36 max-w-full cursor-pointer flex-col rounded-xl bg-neutral-800 p-4 text-rg md:max-w-full xl:min-h-60">
      <button onClick={handleFavoritePressed} className="z-10 absolute right-2 md:top-4 md:right-5 flex items-center justify-center align-middle">
                <div className="">
                  {isFavorite ? (
                    <FavoriteRounded style={{ color: "#8b5cf6", fontSize: 30 }} />
                  ) : (
                    <FavoriteRounded style={{color: "#444",opacity: 0.5, fontSize: 30 }} />
                  )}
                </div>
              </button>
        <div className="relative flex h-full w-full flex-col align-top">
          {gameId%2 > 0 ? (
            <div className="relative">
              <Image
              className="hidden h-auto w-full rounded-lg xl:flex"
              src={Placeholder}
              alt="Game Image"
              width={200}
              height={200}
              />
              
            </div>
            
          ):(
            <Image
              className="hidden h-auto w-full rounded-lg xl:flex"
              src={AltPlaceholder}
              alt="Game Image"
              width={200}
              height={200}
            />
          )}
          <h2 className="overflow-hidden flex gap-2 w-full align-middle items-center truncate text-rg xl:mt-2">
            {name}
            {rating > 0 && (
              <Badge className="h-5">
                <StarRoundedIcon className="flex" sx={{fontSize: 18}}/>
                {parseFloat(rating.toFixed(1))}
              </Badge>
            )}
          </h2>
          <p className="... line-clamp-3 overflow-hidden font-normal leading-tight text-neutral-500">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
