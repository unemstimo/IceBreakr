import { type Playlist } from "@prisma/client";
import Image from "next/image";
import DefaultThumbnail from "~/assets/images/playlistplaceholder.png";
import AltPlaceholder from "~/assets/images/playlistplaceholder2.png";
import AltPlaceholder2 from "~/assets/images/playlistplaceholder3.png";
import Link from "next/link";
import { Card } from "./ui/card";
import { CardContent } from "./ui/card";

const PlayListCard = ({ playlist }: { playlist: Playlist }) => {
  const { name, playlistId, description, } = playlist;  

  return (
    <Link href={`/playlistPage?playlistId=${playlistId}`} passHref>
      <Card className="relative flex align-middle items-center justify-center rounded-xl">
        <CardContent className="p-0">
          {playlistId%2 > 0 ? (
            <Image
            className="rounded-lg object-cover"
            src={DefaultThumbnail}
            width={300}
            alt="Eucalyptus Oil Ad"
            objectFit="cover"
          />
            ):( 
            playlistId%3 > 0 ? (
              <Image
              className="rounded-lg object-cover"
              src={AltPlaceholder}
              width={300}
              alt="Eucalyptus Oil Ad"
              objectFit="cover"/>) : (
                <Image
                className="rounded-lg object-cover"
                src={AltPlaceholder2}
                width={300}
                alt="Eucalyptus Oil Ad"
                objectFit="cover"/>
              )
            )}
          
        </CardContent>
        <CardContent className="absolute bg-slate flex items-end py-2 px-3 w-full h-full">
          <h3 className="text-rg align-baseline">{name}</h3>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PlayListCard;
