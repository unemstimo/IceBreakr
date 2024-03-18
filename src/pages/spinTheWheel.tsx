import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import Layout from '~/components/layout';
import SpinningWheel from '../components/SpinningWheel';
import { api } from '~/utils/api';
import PitBull from "~/assets/images/pitbull.jpeg";

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { playlistId } = router.query;
  const playlistIdNumber = parseInt(playlistId as string, 10);
  const playlistQuery = api.playlist.getPlaylistById.useQuery(
    { id: playlistIdNumber ?? 1 },
    { enabled: playlistId !== undefined },
  );
  const name = playlistQuery.data?.name ?? "";
  const description = playlistQuery.data?.description ?? "";
  const username = playlistQuery.data?.user?.username ?? "";
  const userId = playlistQuery.data?.user?.userId ?? "";
  const gameInPlaylistData = playlistQuery.data?.GameInPlaylist ?? [];
  const games = gameInPlaylistData;
  const amountOfGames = games.length;

  return (
    <Layout>
      <section className="flex h-full w-full flex-col">
        <section className=" flex h-full w-full  flex-col justify-start rounded-t-2xl bg-gradient-to-b from-violet-900 to-[#1b181f] p-4 align-middle">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-4 flex w-full items-center justify-start gap-2 align-middle">
              <button onClick={() => router.back()}>
                <ArrowBackRounded />
              </button>{" "}
              Tilbake
            </div>

            <div className=" flex h-full min-h-48 w-full items-start">
              <div className="h-full w-full max-w-60 ">
                <Image
                    className="rounded-xl object-cover"
                    src={PitBull}
                    width={200}
                    alt="Eucalyptus Oil Ad"
                    objectFit="cover"
                  />
              </div>

              <div className="mb-4 ml-4 flex h-full flex-col justify-between pb-10">
                <div>
                  <p className="mt-6 text-md font-normal text-neutral-200">
                    Spilleliste
                  </p>
                  <h1 className="text-xxl">{name}</h1>
                  <p className="font-normal text-neutral-400">
                    Laget av: {username} • {amountOfGames} leker
                  </p>
                  <p className="mt-6 text-md font-normal text-neutral-400">
                    Trykk på hjulet for å starte.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="flex h-full w-full flex-col  justify-start rounded-b-2xl bg-gradient-to-b from-[#1b181f] to-neutral-900 p-4 align-middle">
              <div className="h-full w-full -mt-16">
                  <SpinningWheel games={games} />
              </div>
          </section>
      </section>
    </Layout>
  );
};

export default IndexPage;
