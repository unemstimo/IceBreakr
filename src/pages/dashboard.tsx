import { useState, useEffect } from "react";
import Advertisement from "~/components/advertisement";
import PlayListCard from "~/components/playListCard";
import { api } from "~/utils/api";
import MyPlaylists from "~/components/myPlaylists";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "~/components/layout";
import { Card, CardContent } from "~/components/ui/card";

export default function Dashboard() {
  const publicPlaylistQuery = api.playlist.getAll.useQuery();
  const allPlaylists = publicPlaylistQuery.data ?? [];
  const [carouselSettings, setCarouselSettings] = useState({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    dots: true, // Add dots for page numbers
    appendDots: (dots: JSX.Element[]) => (
      <div className="">
        <ul className="">{dots}</ul>
      </div>
    ),
  });

  useEffect(() => {
    const updateCarouselSettings = () => {
      const slidesToShow = 1;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Group all playlists into sets of 8 playlists each
  const groupedPlaylists = [];
  for (let i = 0; i < allPlaylists.length; i += 8) {
    groupedPlaylists.push(allPlaylists.slice(i, i + 8));
  }

  return (
    <Layout navbarChildren={<MyPlaylists />}>
      {/* Middle section */}
      <Card className="flex h-full w-full  flex-col justify-start overflow-hidden rounded-2xl bg-neutral-900 align-middle">
        {/* Content section */}
        <div className="mb-2 mt-4 h-full w-full px-6">
          <h3 className="mb-2">Lekelister for deg</h3>
          <Slider {...carouselSettings} className="mx-3">
            {groupedPlaylists.map((playlistGroup, index) => (
              <div key={index}>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
                  {playlistGroup.map((playlist) => (
                    <div key={playlist.playlistId} className="p-2">
                      <PlayListCard playlist={playlist}/>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Slider>
        </div>
        {/* Ad section */}
        <CardContent>
          <p className="px-4 mb-1 font-normal text-sm text-neutral-500">Annonse</p>
          <div className="flex m-0 max-h-60 w-full p-0 items-center justify-center overflow-hidden rounded-lg bg-neutral-800">
            <Advertisement />
          </div>
        </CardContent>
        
      </Card>
      
    </Layout>
  );
}
