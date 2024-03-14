import Link from 'next/link';
import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";

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
  console.log(revealedPrizeNumber)
  const colors = ['#552234', '#a8d3f7', '#89276C', '#f8e8e5', '#123456', '#abcdef', '#987654', '#fedcba', '#13579a', '#2468b'];

  console.log(games)
  const wheelData = games.map((game, index) => ({
    option: game.name,
    style: { backgroundColor: colors[index % colors.length] },
    key: game.gameId,
  }));

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
      if(revealedPrizeNumber) {

        if (!wheelData[revealedPrizeNumber]?.key === undefined) {
          await useQueueMutation.mutateAsync({ gameId: wheelData[revealedPrizeNumber].key });
        }
      }
      await utils.queue.getQueue.invalidate();
    } catch (error) {
      console.log("Error");
    }
  };

console.log(revealedPrizeNumber)
/*   function setRevealedPrize(prizeNumber: number) {
    
    const revealedPrizeNumber = prizeNumber
    
  } */

  React.useEffect(() => {
    if (!mustSpin && prizeNumber != revealedPrizeNumber && prizeNumber) {
      setRevealedPrizeNumber(prizeNumber);
      
      // Cleanup function to cancel the timeout if component unmounts or prize is revealed early
    }
  }, [mustSpin, prizeNumber]);

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
    <div className='item-center text-center'>
    <span>Valgt spill: </span>
    { !revealedPrizeNumber && (
      <div className='flex-col flex items-center'>
      </div>

    )}
    { revealedPrizeNumber && (
      <div className='flex-col flex '>
        <span id="selectedGame">{wheelData[revealedPrizeNumber]?.option}</span>
        <Button onClick={handleAddToQueue}>Legg til i køen</Button>
        <Link href={`/gamePage?gameId=${wheelData[revealedPrizeNumber]?.key}`} passHref>Gå til leken</Link>

      </div>

    )}
  </div>
  </div>


  );
};

export default SpinningWheel;
