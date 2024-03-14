import Head from "next/head";
import { useState, useEffect } from "react";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserProfile,
  currentUser,
} from "@clerk/nextjs";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import PageWrapper from "~/components/pageWrapper";
import NavigationBar from "~/components/navigationBar";
import MyPlaylists from "~/components/myPlaylists";
import MyFriendsBar from "~/components/myFriendsBar";
import { api } from "~/utils/api";
import GameCard from "~/components/gameCard";
import { type FetchGames } from "~/server/api/routers/game";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "~/components/layout";


export default function Profile() {
  const gameQuery = api.gameRouter.getAll.useQuery();
  const myGamesQuery = api.gameRouter.getGameByUserId.useQuery();
  const games = gameQuery.data ?? [];
  const myGames = myGamesQuery.data ?? [];
  const [favoritedGames, setFavoritedGames] = useState<FetchGames>([]);
  const [carouselSettings, setCarouselSettings] = useState({
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: false,
    dots: true, // Add dots for page numbers
    appendDots: (dots: JSX.Element[]) => (
      <div className="">
        <ul className="">
          {dots}
        </ul>
      </div>
    ),
  });

  const filterFavoritedGames = () => {
    const favoritedGames = games.filter((game) => game.UserFavouritedGame.length > 0);
    setFavoritedGames(favoritedGames);
  };

/*   const filterMyGames = (userId: string) => {
    const myGames = games.filter((game) => game.userId === userId);
    setMyGames(myGames);
  }; */

  useEffect(() => {
    if (gameQuery.isSuccess) {
      filterFavoritedGames();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameQuery.isSuccess]);
  

  const [showManageAccount, setShowManageAccount] = useState({
    visible: false,
  });

  const handleManageAccount = () => {
    setShowManageAccount({ visible: !showManageAccount.visible });
  };

  return (
    <Layout navbarChildren={<MyPlaylists />}>
      <SignedOut>
        <div className="flex grow items-center justify-center">
          <SignInButton>Logg inn eller opprett en bruker.</SignInButton>
        </div>
      </SignedOut>
      <SignedIn>
        {/* Middle section */}
        <section className="flex h-full w-full min-w-[300px] flex-col justify-start rounded-2xl bg-neutral-900 p-4 align-middle">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold ">Min Profil</h2>
            <div className="flex items-center gap-2">
              <button>
                <SignOutButton>logg ut</SignOutButton>
              </button>
              <button onClick={handleManageAccount}>
                <ManageAccountsRoundedIcon />
              </button>
            </div>
          </div>
          {/* My games section */}
          <div className="mt-4 flex h-full w-full flex-col p-4 justify-center rounded-xl">
            <p className="ml-6">Mine Leker:</p>
            <div className="w-full px-2">
              {myGames.length > 0 ? (
                <Slider {...carouselSettings}>
                  {myGames.map((game) => (
                    <div className="p-2" key={game.gameId}>
                      <GameCard
                        name={game.name}
                        refetchGames={gameQuery.refetch}
                        duration={game.duration}
                        numberOfPlayers={game.numberOfPlayers}
                        rules={game.rules}
                        description={game.description ?? ""}
                        rating={}
                        gameId={game.gameId}
                        userId={game.userId}
                        isFavorite={game.UserFavouritedGame.length > 0}
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <p className="text-center p-4 bg-neutral-800 rounded-xl">Du har ikke laget noen leker enda</p>
              )}
            </div>
          </div>
          {/* My Favourites section */}
          <div className="mt-4 flex h-full w-full flex-col p-4 justify-center rounded-xl">
            <p className="ml-6">Mine favoritter:</p>
            <div className="w-full px-2">
              {favoritedGames.length > 0 ? (
                <Slider {...carouselSettings}>
                  {favoritedGames.map((game) => (
                    <div className="p-2">
                      <GameCard
                        key={game.gameId}
                        name={game.name}
                        refetchGames={gameQuery.refetch}
                        duration={game.duration}
                        numberOfPlayers={game.numberOfPlayers}
                        rules={game.rules}
                        description={game.description ?? ""}
                        rating={game.averageRating}
                        gameId={game.gameId}
                        userId={game.userId}
                        isFavorite={game.UserFavouritedGame.length > 0}
                      />
                    </div>
                  ))}
                  </Slider>
                ) : (
                  <p className="text-center p-4 bg-neutral-800 rounded-xl">Du har ingen favoritter</p>
                )}
            </div>
          </div>

          {/* My recent section */}
          <div className="mt-4 flex h-full w-full items-center justify-center rounded-xl bg-[#1b1a1a]">
            <p>Nylig lekt</p>
          </div>
        </section>
      </SignedIn>
      {showManageAccount.visible && (
        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-neutral-900 bg-opacity-90 p-24 align-middle">
          <UserProfile />
          <button
            className="text-l mt-2 text-neutral-300 hover:underline"
            onClick={handleManageAccount}
          >
            Lukk
          </button>
        </div>
      )}
    </Layout>
  );
}
