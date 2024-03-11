import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Placeholder from "~/assets/images/placeholder.png";
import Link from "next/link";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import QueueIcon from '@mui/icons-material/Queue';
import { useUser } from "@clerk/nextjs";
import StarBorderIcon from '@mui/icons-material/StarBorder'; 
import StarIcon from '@mui/icons-material/Star'; 
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useToast } from "~/components/ui/use-toast";

export type Game = {
  gameId: number;
  userId: string;
  name: string;
  duration: string;
  numberOfPlayers: string;
  rules: string;
  description: string;
  rating: number;
  playlistUserId: string;
  onDelete: () => void;
  playlistId: number;
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
  onDelete,
  playlistId,
  playlistUserId,
}: Game) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const currentUser = useUser();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const favoriteQuery = api.favorite.getUserFavoriteGames.useQuery();
  const { toast } = useToast();

  useEffect(() => {
    if (favoriteQuery.data) {
      const favoriteGames = favoriteQuery.data.map(game => game.gameId);
      setIsFavorite(favoriteGames.includes(gameId));
    }
  }, [favoriteQuery.data, gameId]);

  const AddToFavoriteMutation = api.favorite.addGame.useMutation();
  const RemoveFromFavoriteMutation = api.favorite.removeGame.useMutation();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowDeleteButton(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleShowMorePopupPlaylist(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    console.log(currentUser.isSignedIn, currentUser.user?.id, playlistUserId, "tesst")
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteButton(!showDeleteButton);
  }

  function handleDeleteFromPlaylist(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    e.stopPropagation();
    onDelete();
  }

  function handleAddToAPlaylist(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    e.stopPropagation();
    console.log("handleAddToPlayist button pressed")
  }

  function handleAddToQueue(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    e.stopPropagation();
    console.log("handleAddToQueue button pressed")
  }

  function handleFavoritePressed(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    
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
      setIsFavorite(true); // Update isFavorite after adding to favorites
      toast({
        title: "Lagt til i favoritter",
        description: "Lek er nå lagt til i dine favoritter",
      });
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
      setIsFavorite(false); // Update isFavorite after removing from favorites
      toast({
        title: "Fjernet fra favoritter",
        description: "Lek er nå fjernet fra dine favoritter",
      });
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <Link href={`/gamePage?gameId=${gameId}`} passHref>
      <div className="relative text-rg flex w-full cursor-pointer flex-row rounded-lg hover:bg-neutral-800 p-2">
      <div className="relative h-10 align-top flex w-full flex-row overflow-clip">
        <Image
          className="h-auto rounded-lg xl:flex hidden"
          src={Placeholder}
          alt="Game Image"
          width={40}
        />
        <div className="w-2/6 justify-normal min-w-2/6 pr-4">
          <h2 className="ml-10 pt-1 overflow-hidden whitespace-nowrap text-overflow-ellipsis">{name}</h2>
        </div>
        <div className="flex flex-col justify-center w-3/6 -ml-10">
          <p className="font-normal ml-10 leading-tight text-neutral-500">
            {description}
          </p>
        </div>
        <div className="flex flex-col justify-center w-1/6">
          <p className="text-right">{duration} min</p>
        </div>
      </div>
      <button
        className="w-12 mt-1 h-full align-middle items-center"
        onClick={handleShowMorePopupPlaylist}
      >
        <MoreHorizRoundedIcon />
      </button>
      { showDeleteButton && (
        <div
          ref={popupRef}
          className="absolute bottom-12 right-4 text-right flex flex-col items-start px-4 h-44 w-52  rounded-xl bg-gradient-to-b from-neutral-800 to-[#1b181f]"
        >
          {/* Popup content here */}
          { !isFavorite && (
          <button onClick={handleFavoritePressed} className="w-full">
            <div className="pl-3 pr-5 py-3 mt-3 mb-1 w-full hover:bg-neutral-700 rounded-lg ">
              <p className="text-sm text-left">
                <StarBorderIcon className="mr-2" /> Legg til i favoritter
              </p>
            </div>
          </button>
          )} { isFavorite && (
            <button onClick={handleFavoritePressed} className="w-full">
            <div className="pl-3 pr-5 py-3 mt-3 mb-1 w-full hover:bg-neutral-700 rounded-lg ">
              <p className="text-sm text-left">
                <StarIcon className="mr-2" /> Fjern fra favoritter
              </p>
            </div>
          </button>
          )}
          <button onClick={handleAddToQueue} className="w-full">
            <div className="pl-3 pr-5 py-3 mb-1 w-full hover:bg-neutral-700 rounded-lg ">
              <p className="text-sm text-left">
                <QueueIcon className="mr-2" /> Legg til i kø
              </p>
            </div>
          </button>
          {currentUser.isSignedIn && playlistUserId === currentUser.user?.id && (
          <button onClick={handleDeleteFromPlaylist} className="w-full">
            <div className="pl-3 py-3 hover:bg-neutral-700 rounded-lg w-full">
              <p className="text-sm text-left">
                <RemoveCircleOutlineIcon className="mr-2" /> Fjern fra lekeliste
              </p>
            </div>
          </button>
          )}
          {!currentUser.isSignedIn || playlistUserId != currentUser.user?.id && (
          <button onClick={handleAddToAPlaylist} className="w-full">
            <div className="pl-3 py-3 hover:bg-neutral-700 rounded-lg w-full">
              <p className="text-sm text-left">
                <AddCircleOutlineIcon className="mr-2" /> Legg til i en lekeliste
              </p>
            </div>
          </button>
          )}
          <button onClick={handleShowMorePopupPlaylist}>
            <p className="absolute right-2 top-1 text-neutral-400 hover:underline">
              <CloseRoundedIcon />
            </p>
          </button>
        </div>
      )}
    </div>
    </Link>
  );
};

export default GameCardHorizontal;
