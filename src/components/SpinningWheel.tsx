import { button, input } from '@nextui-org/react';
import React, { useState } from 'react'

import { Wheel } from 'react-custom-roulette'

import yesNo from 'src/components/yesNo';


const INPUT = `${input} focus:ring-1 focus:outline-none pl-2 border-2 p-2 md:w-96 md:text-lg`; // Utilize CSS modules for styling
const BTN = `${button} p-3 px-10 text-xl rounded-lg`; // Utilize CSS modules for styling


export default () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [data, setData] = useState(yesNo);
  const [showinput, setShowInput] = useState(false);
  const [input, setInput] = useState('');
  const [inputData, setInputData] = useState<any>([]);
  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }
  const customize = () => {
    setShowInput(!showinput)
  }
  const handleKeyDown = (e:any) => {
    if (e.key === 'Enter') {
      addtoList(e);
    }
  };
  const addtoList = (e:any) => {
      setInputData([...inputData,{option:input}])
      setData([...inputData,{option:input}])
      setInput('')
  }

  return (
    <>
    {/* navbar */}
    <div className='grid grid-cols-4 text-center gap-5  md:text-xl '>
        <div className='bg-white border-2 rounded-b-2xl p-5 md:p-10 cursor-pointer drop-shadow-md' onClick={()=>{setData(yesNo)}}>YES or No</div>
        
        <div className='bg-white border-2 rounded-b-2xl p-5 md:p-10 cursor-pointer drop-shadow-md' onClick={customize}>Customize</div>
    </div>

    {showinput && 
    <div className=' flex mx-auto justify-center w-fit  mt-10 bg-white'>
      <input
            type="text"
            name='option'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className={INPUT} // Apply CSS module class
          />
          <button type='button' onClick={addtoList} className={`${BTN} btn border border-l-8 border-gray-100 `}>add</button> {/* Apply CSS module class */}
        </div>
     } 


    {/* wheel */}
    <div className="wheel ">
    <div className='flex mx-auto justify-center cursor-pointer w-fit rounded-full drop-shadow-xl' onClick={handleSpinClick}
    >
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
        backgroundColors={[ '#552234', '#a8d3f7', '#89276C', '#f8e8e5', ]}
        textColors={['#ffffff','#592839']}
        outerBorderColor={'#F7F7F7'}
        radiusLineColor={'#F7F7F7'}
        radiusLineWidth={0}
        innerRadius={14}
        fontSize={16}
        pointerProps = {
          {src: 'src/assets/images/pointerGold.png', style:{ width: '100px', height: '100px' ,transform: 'rotate(-130deg)'}}
        }
      />
    </div>
    <button onClick={handleSpinClick} className={`${BTN} flex mx-auto -mt-48 border-2 bg-white shadow-md`}>SPIN</button> 
    </div>
    </>
  )
}