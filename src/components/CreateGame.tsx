import React, { useState } from "react";

const CreateGame: React.FC = () => {
  const [name, setName] = useState("");
  const [playerCount, setPlayerCount] = useState("");
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState("");
  const [playTime, setPlayTime] = useState("");
  const [selectedPlayTime, setSelectedPlayTime] = useState("");
  const [gameType, setGameType] = useState("");
  const [showError, setShowError] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePlayerCountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPlayerCount(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescription(event.target.value);
  };

  const handleGameTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameType(event.target.value);
  };

  const handleRulesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRules(event.target.value);
  };

  const handlePlayTimeButtonClick = (playTime: string) => {
    setPlayTime(playTime);
    setSelectedPlayTime(playTime);
    console.log("Play time: " + playTime);
  };

  const showErrorMessage = () => {
    setShowError(true);
  };

  const hideErrorMessage = () => {
    setShowError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      name === "" ||
      playerCount === "" ||
      description === "" ||
      playTime === "" ||
      gameType === ""
    ) {
      console.log("Fyll ut alle felt!");
      showErrorMessage();
      return;
    }
    hideErrorMessage();
    console.log(
      "Navn på lek: " + name,
      "\n",
      "Antall spillere: " + playerCount,
      "\n",
      "Beskrivelse: " + description,
      "\n",
      "Spilletid: " + playTime,
      "\n",
      "Kategori: " + gameType,
    );
  };

  return (
    <div className="flex min-w-96 justify-center rounded-2xl bg-neutral-700 p-4">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center justify-center gap-4 align-middle"
      >
        <p className="text-2xl">Opprett ny lek</p>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Navn på lek..."
          className="w-full rounded-lg bg-neutral-800 py-2 pl-2 pr-2 text-white focus:outline-none"
        />
        <input
          type="text"
          value={playerCount}
          onChange={handlePlayerCountChange}
          placeholder="Antall spillere..."
          className="w-full rounded-lg bg-neutral-800 py-2 pl-2 pr-2 text-white focus:outline-none"
        />

        <div className="flex items-center justify-start gap-2 align-middle">
          {/* AI generated snippet*/}
          {["Kort", "Middels", "Lang", "Sykt lang"].map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => handlePlayTimeButtonClick(time)}
              className={`rounded-full px-4 py-2 text-white shadow-lg ${
                selectedPlayTime === time
                  ? "bg-violet-500"
                  : "bg-neutral-600 hover:bg-neutral-500"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Beskrivelse av spill..."
          className="w-full rounded-lg bg-neutral-800 py-2 pl-2 pr-2 text-white focus:outline-none"
        />
        <textarea
          value={rules}
          onChange={handleRulesChange}
          placeholder="Regler..."
          className="w-full rounded-lg bg-neutral-800 py-2 pl-2 pr-2 text-white focus:outline-none"
        />
        <input
          type="text"
          value={gameType}
          onChange={handleGameTypeChange}
          placeholder="Kategori..."
          className="w-full rounded-lg bg-neutral-800 py-2 pl-2 pr-2 text-white focus:outline-none"
        />
        <button
          className=" rounded-full bg-violet-600 px-4 py-2 text-white shadow-lg hover:bg-violet-500 active:bg-violet-800"
          type="submit"
        >
          Opprett Lek
        </button>
        {showError && <p className="text-red-500">Fyll ut alle felt!</p>}
      </form>
    </div>
  );
};

export default CreateGame;
