import { type Playlist } from "@prisma/client";
import Image from "next/image";
import PitBull from "~/assets/images/pitbull.jpeg";
import Link from "next/link";

const PlayListCard = ({ playlist }: { playlist: Playlist }) => {
  const { name, playlistId, description } = playlist;

  return (
    <Link href={`/playlistPage?playlistId=${playlistId}`} passHref>
      <section className="m-0 flex h-56 min-w-32 flex-col gap-2 overflow-hidden rounded-xl bg-neutral-800 p-6">
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
          <p className="text-sm text-neutral-400"> {description}</p>
        </div>
      </section>
    </Link>
  );
};

export default PlayListCard;
