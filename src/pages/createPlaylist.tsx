import { useEffect } from "react";
import Layout from "~/components/layout";
import { type CreatePlaylist } from "~/server/api/routers/playlist";
import { api } from "~/utils/api";

const CreatePlaylistPage = () => {
  const myPlaylistsQuery = api.playlist.getPlaylistsByUserId.useQuery();

  const useCreatePlaylistMutation = api.playlist.create.useMutation();

  //   tullekode som lager en playlist for dere om det ikke finnes noen
  useEffect(() => {
    if (myPlaylistsQuery.data?.length !== 0) return;

    const newPlaylist: CreatePlaylist = {
      name: "🍺🍺🗿",
    };
    handleSubmitPlaylist(newPlaylist);
  }, [myPlaylistsQuery.data]);

  const handleSubmitPlaylist = (newPlaylist: CreatePlaylist) => {
    //for å legge til spill, se hvordan jeg har lagt til kategorier i createGame.tsx
    useCreatePlaylistMutation.mutate(newPlaylist);
  };

  return null;

  // TODO: make this
  return (
    <Layout>
      <h1>halla</h1>
    </Layout>
  );
};

export default CreatePlaylistPage;
