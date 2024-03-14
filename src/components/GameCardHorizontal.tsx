import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Placeholder from "~/assets/images/placeholder.png";
import Link from "next/link";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import QueueIcon from "@mui/icons-material/Queue";
import { useUser } from "@clerk/nextjs";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
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
  name,
  duration,
  description,
  onDelete,
  playlistUserId,
}: Game) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const currentUser = useUser();
  const [isFavorite, setIsFavorite] = useState(false);
  const favoriteQuery = api.favorite.getUserFavoriteGames.useQuery();
  const { toast } = useToast();

  useEffect(() => {
    if (favoriteQuery.data) {
      const favoriteGames = favoriteQuery.data.map((game) => game.gameId);
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

  function handleShowMorePopupPlaylist(e: React.MouseEvent<HTMLButtonElement>) {
    console.log(
      currentUser.isSignedIn,
      currentUser.user?.id,
      playlistUserId,
      "tesst",
    );
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteButton(!showDeleteButton);
  }

  function handleDeleteFromPlaylist(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    onDelete();
  }

  function handleAddToAPlaylist(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    console.log("handleAddToPlayist button pressed");
  }

  function handleAddToQueue(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    console.log("handleAddToQueue button pressed");
  }

  function handleFavoritePressed(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    // Call TRPC mutation function to add or remove game from favorites
    if (!isFavorite) {
      void handleAddToFavorite();
    } else {
      void handleDeleteFromFavorite();
    }
  }

  const handleAddToFavorite = async () => {
    try {
      await AddToFavoriteMutation.mutateAsync({
        gameId: gameId,
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
        gameId: gameId,
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
      <div className="relative flex w-full cursor-pointer flex-row rounded-lg p-2 text-rg hover:bg-neutral-800">
        <div className="relative flex h-10 w-full max-w-[740px] flex-row align-top">
          <Image
            className="hidden h-auto rounded-lg xl:flex"
            src={Placeholder}
            alt="Game Image"
            width={40}
          />
          <div className="min-w-2/6 h-10 w-2/6 justify-normal pr-4">
            <h2 className="text-overflow-ellipsis ml-10 overflow-hidden whitespace-nowrap pt-1">
              {name}
            </h2>
          </div>
          <div className="-ml-10 flex h-10 w-3/6 flex-col justify-center">
            <p className="... ml-10 h-10 overflow-hidden truncate font-normal leading-tight text-neutral-500">
              {description}
            </p>
          </div>
          <div className="flex h-10 w-1/6 flex-col justify-center">
            <p className="text-right">{duration} min</p>
          </div>
          <button
            className="mt-1 h-full w-12 items-center align-middle"
            onClick={handleShowMorePopupPlaylist}
          >
            <MoreHorizRoundedIcon />
          </button>
          {showDeleteButton && (
            <div
              ref={popupRef}
              className="absolute bottom-12 right-4 flex h-44 w-52 flex-col items-start rounded-xl bg-gradient-to-b  from-neutral-800 to-[#1b181f] px-4 text-right"
            >
              {/* Popup content here */}
              {!isFavorite && (
                <button onClick={handleFavoritePressed} className="w-full">
                  <div className="mb-1 mt-3 w-full rounded-lg py-3 pl-3 pr-5 hover:bg-neutral-700 ">
                    <p className="text-left text-sm">
                      <StarBorderIcon className="mr-2" /> Legg til i favoritter
                    </p>
                  </div>
                </button>
              )}{" "}
              {isFavorite && (
                <button onClick={handleFavoritePressed} className="w-full">
                  <div className="mb-1 mt-3 w-full rounded-lg py-3 pl-3 pr-5 hover:bg-neutral-700 ">
                    <p className="text-left text-sm">
                      <StarIcon className="mr-2" /> Fjern fra favoritter
                    </p>
                  </div>
                </button>
              )}
              <button onClick={handleAddToQueue} className="w-full">
                <div className="mb-1 w-full rounded-lg py-3 pl-3 pr-5 hover:bg-neutral-700 ">
                  <p className="text-left text-sm">
                    <QueueIcon className="mr-2" /> Legg til i kø
                  </p>
                </div>
              </button>
              {currentUser.isSignedIn &&
                playlistUserId === currentUser.user?.id && (
                  <button onClick={handleDeleteFromPlaylist} className="w-full">
                    <div className="w-full rounded-lg py-3 pl-3 hover:bg-neutral-700">
                      <p className="text-left text-sm">
                        <RemoveCircleOutlineIcon className="mr-2" /> Fjern fra
                        lekeliste
                      </p>
                    </div>
                  </button>
                )}
              {!currentUser.isSignedIn ||
                (playlistUserId != currentUser.user?.id && (
                  <button onClick={handleAddToAPlaylist} className="w-full">
                    <div className="w-full rounded-lg py-3 pl-3 hover:bg-neutral-700">
                      <p className="text-left text-sm">
                        <AddCircleOutlineIcon className="mr-2" /> Legg til i en
                        lekeliste
                      </p>
                    </div>
                  </button>
                ))}
              <button onClick={handleShowMorePopupPlaylist}>
                <p className="absolute right-2 top-1 text-neutral-400 hover:underline">
                  <CloseRoundedIcon />
                </p>
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
    
  );
};

export default GameCardHorizontal;
