import React, { useState } from "react";
import Layout from "~/components/layout";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { type CreatePlaylist } from "~/server/api/routers/playlist";
import { ArrowBackRounded } from "@mui/icons-material";

const CreatePlaylistPage = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [showError, setShowError] = useState(false);

  const useCreatePlaylistMutation = api.playlist.create.useMutation();

  const router = useRouter();

  const handlePlaylistNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPlaylistName(event.target.value);
  };

  const showErrorMessage = () => {
    setShowError(true);
  };

  const hideErrorMessage = () => {
    setShowError(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (playlistName === "") {
      console.log("Please fill in all fields!");
      showErrorMessage();
      return;
    }
    hideErrorMessage();

    const newPlaylist: CreatePlaylist = {
      name: playlistName,
    };

    try {
      const playlist = await useCreatePlaylistMutation.mutateAsync(newPlaylist);
      console.log("Playlist created: ", playlist);
      await router.push(`/playlistPage?playlistId=${playlist.playlistId}`);
    } catch (error) {
      console.error("Failed to create playlist", error);
      showErrorMessage();
    }
  };

  return (
    <Layout>
      <div className="flex w-full flex-col justify-start rounded-2xl bg-neutral-900 p-4">
        <div className="flex items-center gap-2 align-middle">
          <button>
            <ArrowBackRounded onClick={() => router.back()} />
          </button>
          <p className="text-xxl font-bold">Lag ny lekeliste</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex w-full flex-col items-start justify-start gap-4 align-middle text-rg font-normal"
        >
          <input
            type="text"
            value={playlistName}
            onChange={handlePlaylistNameChange}
            placeholder="Navn på lekeliste..."
            className="w-full rounded-lg bg-neutral-800 py-2 pl-2 pr-2 text-white focus:outline-none"
          />
          <div className="flex gap-4">
            <button
              className="rounded-full bg-violet-600 px-4 py-2 font-bold text-white shadow-lg hover:bg-violet-500 active:bg-violet-800"
              type="submit"
            >
              Opprett
            </button>
            <button
              className="text-neutral-500 hover:underline"
              type="button"
              onClick={() => router.back()}
            >
              Avbryt
            </button>
          </div>
          {showError && <p className="text-red-500">Du må ha en tittel!</p>}
        </form>
      </div>
    </Layout>
  );
};

export default CreatePlaylistPage;
