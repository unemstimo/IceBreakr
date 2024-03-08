import { useState, type FormEvent } from "react";
import Advertisement from "~/components/advertisement";
import SearchIcon from "@mui/icons-material/Search";
import PlayListCard from "~/components/playListCard";
import { api } from "~/utils/api";
import MyPlaylists from "~/components/myPlaylists";
import { Input } from "@nextui-org/react";
import Layout from "~/components/layout";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const publicPlaylistQuery = api.playlist.getAll.useQuery();
  const allPlaylists = publicPlaylistQuery.data ?? [];

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Search Term:", searchTerm);
  };

  return (
    <Layout navbarChildren={<MyPlaylists />}>
      <section className="flex h-full w-full  flex-col justify-start overflow-hidden rounded-2xl bg-neutral-900 p-4 pr-4 align-middle">
        {/* Search section */}
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
        </div>
        {/* Content section */}
        <div className="mt-4 h-full w-full">
          <h3 className="mb-2">Lekelister for deg</h3>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {allPlaylists?.map((playlist) => (
              <div key={playlist.playlistId} className="h-full w-full">
                <PlayListCard playlist={playlist} />
              </div>
            ))}
          </div>
        </div>
        {/* Ad section */}
        <p className="mt-4 font-normal text-neutral-500">Annonse</p>
        <div className="flex max-h-60 min-h-48 w-full items-center justify-center overflow-hidden rounded-xl bg-neutral-800">
          <Advertisement />
        </div>
      </section>
    </Layout>
  );
}
