import React, { useState } from 'react';

const CreateGame: React.FC = () => {
    const [name, setName] = useState('');
    const [playerCount, setPlayerCount] = useState('');
    const [description, setDescription] = useState('');
    const [playTime, setPlayTime] = useState('');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handlePlayerCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerCount(event.target.value);
    };

    const handlePlayTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlayTime(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(name);
    };

    return (
        <div className='flex p-4 min-w-96 rounded-2xl justify-center bg-neutral-700'>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center align-middle gap-4 w-full'>
                <p className='text-2xl'>Opprett ny lek</p>
                <input type="text" value={name} onChange={handleNameChange} placeholder='Navn på lek...' className="pl-2 pr-2 py-2 w-full bg-neutral-800 text-white focus:outline-none rounded-lg" />
                <input type="text" value={playerCount} onChange={handlePlayerCountChange} placeholder='Antall spillere...' className="pl-2 pr-2 py-2 w-full bg-neutral-800 text-white focus:outline-none rounded-lg"/>
                <div className='flex gap-2 align-middle justify-start items-center'>
                    <button className=" rounded-full bg-neutral-600 hover:bg-neutral-500 px-4 py-2 text-white shadow-lg">Kort</button>
                    <button className=" rounded-full bg-neutral-600 hover:bg-neutral-500 px-4 py-2 text-white shadow-lg">Middels</button>
                    <button className=" rounded-full bg-neutral-600 hover:bg-neutral-500 px-4 py-2 text-white shadow-lg">Lang</button>
                    <button className=" rounded-full bg-neutral-600 hover:bg-neutral-500 px-4 py-2 text-white shadow-lg">Sykt lang</button>
                </div> 
                <textarea type="text" value={description} onChange={handleDescriptionChange} placeholder='Beskrivelse av spill...' className="pl-2 pr-2 py-2 w-full bg-neutral-800 text-white focus:outline-none rounded-lg"/>
                <button className=" rounded-full bg-violet-600 hover:bg-violet-500 active:bg-violet-800 px-4 py-2 text-white shadow-lg" type="submit">
                    Opprett Lek
                </button>
            </form>
        </div>
    );
};

export default CreateGame;