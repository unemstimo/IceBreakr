import Image from 'next/image';
import React from 'react';
import Placeholder from '~/assets/images/placeholder.png';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

const gameCard = ({ name, playtime, category, players, rules, description, rating }) => {
  return (
    <div className="relative flex flex-col max-w-60 min-w-60 h-auto min-h-80 max-h-80 p-4 rounded-xl bg-neutral-800">
        <div className='relative w-full h-full flex flex-col overflow-clip'>
            <Image className='w-full h-auto rounded-lg' src={Placeholder} alt="Game Image" width={200} height={200} />
            <h2 className='mt-2'>{name}</h2>
            <p className='font-normal text-neutral-500 leading-tight	'>{description}</p>
        </div>
        <button className='absolute top-3 right-6 rounded-full bg-violet-500 min-w-16 flex justify-center align-middle items-center'><StarRoundedIcon/>{rating}</button>
    </div>
  );
};

export default gameCard;
