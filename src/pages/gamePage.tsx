import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';
import Placeholder from '~/assets/images/placeholder.png';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

const GamePage = () => {
  const router = useRouter();
  const { name, playtime, category, players, rules, description, rating } = router.query;

  return (
    <div className="flex w-screen h-screen min-w-96 justify-center rounded-2xl bg-neutral-700 p-4">
      <div className="relative flex h-auto max-h-80 min-h-80 min-w-60 max-w-60 flex-col rounded-xl bg-neutral-800 p-4 cursor-pointer">
          <div className="relative flex h-full w-full flex-col overflow-clip">
            <Image
              className="h-auto w-full rounded-lg"
              src={Placeholder}
              alt="Game Image"
              width={200}
              height={200}
            />
            <h2 className="mt-2">{name}</h2>
            <p className="font-normal leading-tight text-neutral-500">
              {description}
            </p>
          </div>
          <button className="absolute right-6 top-3 flex min-w-16 items-center justify-center rounded-full bg-violet-500 align-middle">
            <StarRoundedIcon />
            {rating}
          </button>
        </div>
    </div>
  );
};



export default GamePage;
