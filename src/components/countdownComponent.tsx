import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTimeLeft, decrementTimeLeft, toggleRunning } from '../redux/countdownSlice';
import { store, type RootState } from '../redux/store';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';

interface CountdownComponentProps {
    playtime?: number;
  }
  

const CountdownComponent: React.FC<CountdownComponentProps> = ({ playtime = 69 }) => {
  const dispatch = useDispatch();
  const { timeLeft, isRunning} = useSelector((state: RootState) => state.countdown);
  const [isPlaying, setIsPlaying] = React.useState(false);

  useEffect(() => {
    const storedTimeLeft = localStorage.getItem('timeLeft');
    const storedRunState = localStorage.getItem('isRunning');
    console.log("Timeleft: " + storedTimeLeft);
    console.log("Run state: " + storedRunState)
    if (storedTimeLeft) {
      dispatch(setTimeLeft(Number(storedTimeLeft)));
    }
    if (storedRunState) {
      setIsPlaying(storedRunState === "true" ? true : false);
    }

    const interval = setInterval(() => {
      dispatch(decrementTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('timeLeft', timeLeft.toString());
    localStorage.setItem('isRunning', isRunning.toString());
  }, [timeLeft, isRunning]);

  const handleSetCountdown = (time: number) => {
    dispatch(setTimeLeft(time));
  };

  const handleToggleRunning = () => {
    dispatch(toggleRunning());
    setIsPlaying(!isPlaying);
  };

  return (
    <div className='flex gap-4 justify-center align-middle flex-col p-4 bg-background rounded-xl'>
        <h1 suppressHydrationWarning>Countdown: {timeLeft}</h1>
        <button className='p-4 rounded-lg bg-primary text-white text-rg' onClick={() => handleSetCountdown(60)}>DEV ONLY set timer to 60 Seconds</button>
        <span className='flex justify-center align-middle w-full'>{isRunning ? <h1>Running</h1> : <h1>Paused</h1>}</span>
        <span className='flex justify-center align-middle w-full'>
            <button className='rounded-full justify-center flex items-center align-middle text-neutral-500 hover:text-white'><SkipPreviousRoundedIcon sx={{ fontSize: 40 }}/></button>
            {isPlaying ? 
                (<button className='rounded-full justify-center flex items-center align-middle text-white h-12 active:scale-90' onClick={handleToggleRunning}>
                    <PauseCircleFilledRoundedIcon sx={{ fontSize: 50 }}/>
                </button>) :
                (<button className='rounded-full justify-center flex items-center align-middle text-white h-12 active:scale-90' onClick={handleToggleRunning}>
                    <PlayCircleFilledRoundedIcon sx={{ fontSize: 50 }}/>
                </button>)
            }
            <button className='rounded-full justify-center flex items-center align-middle text-neutral-500 hover:text-white'><SkipNextRoundedIcon sx={{ fontSize: 40 }}/></button>
        </span>
    </div>
  );
};

export default CountdownComponent
