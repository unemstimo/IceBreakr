import Image from "next/image";
import PitBull from "~/assets/images/pitbull.jpeg";

export type Playlist = {
  id: string;
  name: string;
  author: string;
  numberOfGames: number;
  description?: string;
};

const PlayListCard = ({ playlist }: { playlist: Playlist }) => {
  const { name, description } = playlist;

  return (
    <section className="m-0 flex min-w-32 flex-col gap-2 overflow-hidden rounded-xl bg-neutral-800 p-6">
      <div>
        <Image
          className="rounded-xl object-cover"
          src={PitBull}
          width={200}
          alt="Eucalyptus Oil Ad"
          objectFit="cover"
        />
      </div>
      <div>
        <h3
          className="text-2xl
"
        >
          {name}
        </h3>
        <p className="text-neutral-400"> {description}</p>
      </div>
    </section>
  );
};

export default PlayListCard;
