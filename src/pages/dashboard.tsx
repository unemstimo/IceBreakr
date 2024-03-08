import Head from "next/head";
import { useState, useEffect, type FormEvent } from "react";
import Advertisement from "~/components/advertisement";
import SearchIcon from "@mui/icons-material/Search";
import PlayListCard from "~/components/playListCard";
import PageWrapper from "~/components/pageWrapper";
import NavigationBar from "~/components/navigationBar";
import { api } from "~/utils/api";
import MyPlaylists from "~/components/myPlaylists";
import MyFriendsBar from "~/components/myFriendsBar";
import { Input } from "@nextui-org/react";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const publicPlaylistQuery = api.playlist.getAll.useQuery();
  const allPlaylists = publicPlaylistQuery.data ?? [];
  const [carouselSettings, setCarouselSettings] = useState({
    slidesToShow: 1,
    slidesToScroll: 1,
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

  useEffect(() => {
    const updateCarouselSettings = () => {
      const windowWidth = window.innerWidth;
      let slidesToShow = 1;
/*       if (windowWidth >= 768 && windowWidth < 1024) {
        slidesToShow = 1;
      }
      if (windowWidth < 768) {
        slidesToShow = 1;
      } */
      setCarouselSettings({
        ...carouselSettings,
        slidesToShow,
      });
    };

    updateCarouselSettings();
    window.addEventListener("resize", updateCarouselSettings);
    return () => {
      window.removeEventListener("resize", updateCarouselSettings);
    };
  }, []);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Search Term:", searchTerm);
  };

  // Group all playlists into sets of 8 playlists each
  const groupedPlaylists = [];
  for (let i = 0; i < allPlaylists.length; i += 8) {
    groupedPlaylists.push(allPlaylists.slice(i, i + 8));
  }

  return (
    <div>
      <Head>
        <title>Dashboard | IceBreakr</title>
        <meta
          name="dashboard"
          content="Learn more about what IceBreakr offers."
        />
      </Head>

      <PageWrapper>
        <NavigationBar>
          <MyPlaylists />
        </NavigationBar>

        {/* Middle section */}
        <section className="flex h-full w-full  flex-col justify-start overflow-hidden rounded-2xl bg-neutral-900 p-4 pr-4 align-middle">
          {/* Search section 
          
          <div className="flex w-full flex-row items-center justify-between align-middle">
            <form
              onSubmit={handleSearchSubmit}
              className="flex w-2/3 items-center overflow-hidden rounded-full bg-neutral-800 p-1 align-middle font-normal text-neutral-600"
            >
              <button
                type="submit"
                className="flex h-full items-center justify-center pl-2 pt-1 align-middle"
              >
                <SearchIcon className="text-neutral-500" />
              </button>
              <Input
                className="w-full bg-neutral-800 text-md text-white focus:outline-none"
                type="search" // Changed to search to improve semantics
                placeholder="Søk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>*/}
           
          {/* Content section */}
          <div className="mt-4 h-full w-full px-6 mb-2">
            <h3 className="mb-2">Lekelister for deg</h3>
            <Slider {...carouselSettings}>
              {groupedPlaylists.map((playlistGroup, index) => (
                <div key={index}>
                  <div className="grid grid-cols-4">
                    {playlistGroup.map((playlist) => (
                      <div key={playlist.playlistId} className="p-2">
                        <PlayListCard playlist={playlist} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          
          {/* Ad section */}
          <p className="mt-4 font-normal text-neutral-500">Advertisement</p>
          <div className="flex max-h-60 min-h-48 w-full items-center justify-center overflow-hidden rounded-xl bg-neutral-800">
            <Advertisement />
          </div>
        </section>

        <MyFriendsBar />
      </PageWrapper>
    </div>
  );
}
