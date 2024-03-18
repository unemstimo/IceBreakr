import Link from 'next/link';
import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import Image from 'next/image';
import Placeholder from "~/assets/images/gameplaceholder.png";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { useToast } from "~/components/ui/use-toast";

interface Game{
  gameId: number;
  userId: string;
  name: string;
  duration: string;
  numberOfPlayers: string;
  rules: string;
  description: string;
  rating: number;
  isFavorite: boolean;
  refetchGames: VoidFunction;
}

interface Props {
  games: Game[];
}

const SpinningWheel: React.FC<Props> = ({ games }) => {
  const useQueueMutation = api.queue.create.useMutation();
  const [mustSpin, setMustSpin] = React.useState(false);
  const [prizeNumber, setPrizeNumber] = React.useState(0);
  const [revealedPrizeNumber, setRevealedPrizeNumber] = useState<null|number>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const colors = ['#a8d3f7', '#89276C', '#abcdef', '#987654', '#fedcba', '#13579a', '#2468b'];
  const { toast } = useToast();

  const wheelData = games.map((game, index) => {
    const colorIndex = (index + 1) % (colors.length - 1);
    return {
      option: game.name,
      style: { backgroundColor: colors[colorIndex] },
      key: game.gameId,
    };
  });
  

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
      setPrizeNumber(newPrizeNumber);
      console.log(wheelData[newPrizeNumber]?.option);
      setMustSpin(true);
    }
  };

  const utils = api.useUtils();

  const handleAddToQueue = async () => {
    try {
      if (name && gameId) {
        await useQueueMutation.mutateAsync({ gameId });
        await utils.queue.getQueue.invalidate();
        handleAddToQueueToast(name);
      }
    } catch (error) {
      toast({
        title: "Obs!",
        description: "kunne ikke legge til i kø",
      });
    }
  };

  const handleAddToQueueToast = (name: string) => {
    toast({
      title: "Lagt til i kø",
      description: name + " er nå lagt til i kø",
    });
  };

  React.useEffect(() => {
    if (!mustSpin && prizeNumber != revealedPrizeNumber && prizeNumber) {
      setRevealedPrizeNumber(prizeNumber);
      findSelectedGame(wheelData[prizeNumber]?.key);
    }
  }, [mustSpin, prizeNumber]);

  const findSelectedGame = (gameId: number): void => {
    const game = games.find((game) => game.gameId === gameId);
    setSelectedGame(game || null);
  };

  const name = selectedGame?.name
  const gameId = selectedGame?.gameId
  const description = selectedGame?.description
  const duration = selectedGame?.duration
  const numberOfPlayers = selectedGame?.numberOfPlayers
  const rating = selectedGame?.rating

  return (
    <div>
    <div className="wheel relative w-full justify-center items-center">
      <div className="flex mx-auto justify-center cursor-pointer w-fit rounded-full drop-shadow-xl" onClick={handleSpinClick}>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={wheelData}
          onStopSpinning={() => {
            setMustSpin(false);
            if(revealedPrizeNumber) {

              console.log(wheelData[revealedPrizeNumber])
            }
          }}
          backgroundColors={['#552234', '#a8d3f7', '#89276C', '#f8e8e5']}
          textColors={['#ffffff', '#592839']}
          outerBorderColor={'#F7F7F7'}
          radiusLineColor={'#F7F7F7'}
          radiusLineWidth={0}
          innerRadius={14}
          fontSize={16}
        />
      </div>
      <button onClick={handleSpinClick} className="flex mx-auto -mt-48 shadow-md absolute top-[89.5%] left-[46.8%]"><p>SPIN</p></button>
      

    </div>
    <div className='item-center text-center bg-neutral-800 rounded-xl'>
      <span>Valgt spill: </span>
      { !revealedPrizeNumber && (
        <div className='flex-col flex items-center'>
        </div>

      )}
      { revealedPrizeNumber && (
        
        <div className='flex-row flex'>
          <div className='flex px-6 py-4'>
            <Image
                      className="rounded-xl object-cover"
                      src={Placeholder}
                      width={210}
                      alt="Eucalyptus Oil Ad"
                      objectFit="cover"
                    />
          </div>
          <div className='flex flex-col p-4 items-start'>
            <span id="selectedGame" className='text-xl text-left py-2'>{name}</span>
            <span id="selectedGame" className='font-normal text-left text-neutral-400'>{numberOfPlayers} spillere • {duration} min • {rating ? <><StarRoundedIcon fontSize="small" /> {rating}</> : 'ingen vurderinger'}</span>
            <span id="selectedGame" className='text-rg text-left font-bold text-neutral-500'>Beskrivelse</span>
            <span id="selectedGame" className='text-rg text-left font-normal leading-4 text-neutral-300'>{description}</span>
            <div className='flex flex-row my-6 items-start'>
              <button onClick={handleAddToQueue} className="flex h-10 w-40 mr-4 flex-col justify-center items-center rounded-lg p-4 hover:bg-violet-500 shadow-xl bg-violet-600">Legg til i køen</button>
              <Link href={`/gamePage?gameId=${wheelData[revealedPrizeNumber]?.key}`} passHref>
                <div className='flex h-10 w-40 flex-col justify-center items-center rounded-lg p-4 hover:bg-violet-500 shadow-xl bg-violet-600'>
                  Gå til leken
                </div>
              </Link>
            </div>
          </div>
        </div>

      )}
  </div>
  </div>


  );
};

export default SpinningWheel;
