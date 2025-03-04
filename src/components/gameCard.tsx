import Image, { StaticImageData } from "next/image";
import React from "react";
import Placeholder from "~/assets/images/gameplaceholder.png";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import Link from "next/link";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { api } from "~/utils/api";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import { useTimerActions } from "~/redux/hooks";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button } from "./ui/button";

export type Game = {
  gameId: number;
  userId: string;
  name: string;
  duration: string;
  numberOfPlayers: string;
  rules: string;
  description: string;
  rating: number;
  photo: StaticImageData;
  isFavorite: boolean;
  refetchGames: VoidFunction;
};


const GameCard = ({
  gameId,
  name,
  description,
  duration,
  photo,
  rating,
  isFavorite,
  refetchGames,
}: Game) => {
  const AddToFavoriteMutation = api.favorite.addGame.useMutation();
  const RemoveFromFavoriteMutation = api.favorite.removeGame.useMutation();
  const useQueueMutation = api.queue.create.useMutation();

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

  const utils = api.useUtils();
  const handleAddToQueue = async () => {
    try {
      await useQueueMutation.mutateAsync({ gameId: gameId });
      await utils.queue.getQueue.invalidate();
    } catch (error) {
      console.log("Error");
    }
  };

  const { setGame, start: startTimer } = useTimerActions();
  const setGameAndPlay = async () => {
    const durationNumber = Number(duration) * 60;
    if (!durationNumber || !name) return;
    setGame({
      duration: durationNumber,
      name: name,
    });
    startTimer();
  };

  return (
    <div className="relative flex h-full max-h-80 w-full pb-80 min-w-36 max-w-full cursor-pointer flex-col rounded-xl bg-neutral-800 p-4 text-rg md:max-w-full xl:min-h-60">
      <Link href={`/gamePage?gameId=${gameId}`} passHref>
        <div className="relative flex h-full w-full flex-col align-top">
          <Image
            className="hidden h-auto w-full rounded-lg xl:flex"
            src={photo}
            alt="Game Image"
            width={200}
            height={200}
          />
          <h2 className="overflow-hidden truncate xl:mt-2">{name}</h2>
          <p className="... line-clamp-3 overflow-hidden font-normal leading-tight text-neutral-500">
            {description}
          </p>
        </div>
      </Link>

      {rating > 0 && (
        <div className="absolute right-3 top-3 flex w-14 items-center justify-center rounded-full bg-violet-500 align-middle xl:min-w-16">
          <StarRoundedIcon />
          {parseFloat(rating.toFixed(1))}
        </div>
      )}
      <div className="absolute bottom-2 left-3">
        <Button onClick={setGameAndPlay} size={"icon"} variant={"ghost"}>
          <PlayCircleOutlineRoundedIcon />
        </Button>
        <Button onClick={handleAddToQueue} size={"icon"} variant={"ghost"}>
          <QueueMusicIcon />
        </Button>
        <Button onClick={handleFavoritePressed} size={"icon"} variant={"ghost"}>
          {isFavorite ? (
            <FavoriteRoundedIcon style={{ color: "#ff172e" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </Button>
      </div>
    </div>
  );
};

export default GameCard;
