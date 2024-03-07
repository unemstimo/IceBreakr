import Image from "next/image";
import React, { useEffect, useState } from "react";
import Placeholder from "~/assets/images/placeholder.png";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import Link from "next/link";
import StarBorderIcon from '@mui/icons-material/StarBorder'; 
import StarIcon from '@mui/icons-material/Star';
import { api } from "~/utils/api";
import { useRouter } from "next/router";


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
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const favoriteQuery = api.favorite.getUserFavoriteGames.useQuery();

  useEffect(() => {
    if (favoriteQuery.data) {
      const favoriteGames = favoriteQuery.data.map(game => game.gameId);
      setIsFavorite(favoriteGames.includes(gameId));
    }
  }, [favoriteQuery.data]);

  const AddToFavoriteMutation = api.favorite.addGame.useMutation();
  const RemoveFromFavoriteMutation = api.favorite.removeGame.useMutation();

  function handleFavoritePressed(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    
    // Toggle isFavorite state
    setIsFavorite(prevIsFavorite => !prevIsFavorite);
    
    // Call TRPC mutation function to add or remove game from favorites
    if (!isFavorite) {
      handleAddToFavorite();
    } else {
      handleDeleteFromFavorite();
    }
  }

  const handleAddToFavorite = async () => {
    try {
      await AddToFavoriteMutation.mutateAsync({
        gameId: gameId
      });
      await favoriteQuery.refetch();
    } catch (error) {
      console.log("Error");
    }
  };

  const handleDeleteFromFavorite = async () => {
    try {
      await RemoveFromFavoriteMutation.mutateAsync({
        gameId: gameId
      });
      await favoriteQuery.refetch();
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <Link href={`/gamePage?gameId=${gameId}`} passHref>
      <div className="relative flex h-full max-h-80 w-full min-w-36 max-w-full cursor-pointer flex-col rounded-xl bg-neutral-800 p-4 text-rg md:max-w-full xl:min-h-60">
        <div className="relative flex h-full w-full flex-col overflow-clip align-top">
          <Image
            className="hidden h-auto w-full rounded-lg xl:flex"
            src={Placeholder}
            alt="Game Image"
            width={200}
            height={200}
          />
          <h2 className="xl:mt-2 w-4/5">{name}</h2>
          <p className="font-normal leading-tight text-neutral-500">
            {description}
          </p>
        </div>
        {rating > 0 && (
          <div className="absolute right-3 top-3 flex w-14 items-center justify-center rounded-full bg-violet-500 align-middle xl:min-w-16">
            <StarRoundedIcon />
            {rating}
          </div>
        )}
        <button onClick={handleFavoritePressed} className="">
        <div className="absolute right-4 top-[185px] flex items-center justify-center align-middle">
          {isFavorite ? (
              <StarIcon style={{ color: '#d9b907' }} />
            ) : (
                <StarBorderIcon />
              )}
        </div>
        </button>
      </div>
    </Link>
  );
};

export default GameCard;
