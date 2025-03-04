import React, { useState } from "react";
import Layout from "~/components/layout";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { Combobox, type ComboxOption } from "~/components/ui/combox";
import { Button } from "~/components/ui/button";
import { CreateGame } from "~/server/api/routers/game";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";

export type Game = {
  name: string;
  playtime: string;
  category: string;
  players: string;
  rules: string;
  description: string;
  rating: number;
};
const CreateGame = () => {
  const [name, setName] = useState("");
  const [players, setPlayerCount] = useState("");
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState("");
  const [playtime, setPlayTime] = useState("15");
  const [categories, setCategories] = useState<ComboxOption[]>();
  const [selectedCategory, setSelectedCategory] = useState<ComboxOption>();
  const [showError, setShowError] = useState(false);

  const useCategoryRelationMutation =
    api.category.createCategoryRelation.useMutation();
  const categoriesQuery = api.category.getAll.useQuery();

  const useGameMutation = api.gameRouter.create.useMutation();
  const router = useRouter();

  const handleRemoveCategory = (category: ComboxOption) => {
    setCategories((prev) => {
      if (prev?.find((c) => c.value === category.value)) {
        return prev?.filter((c) => c.value !== category.value);
      }
      return prev;
    });
  };

  const handleAddCategory = (category: ComboxOption) => {
    setCategories((prev) => {
      if (prev?.find((c) => c.value === category.value)) {
        return prev;
      }
      return [...(prev ?? []), category];
    });
  };

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

  const handleRulesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRules(event.target.value);
  };

  const showErrorMessage = () => {
    setShowError(true);
  };

  const hideErrorMessage = () => {
    setShowError(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      name === "" ||
      players === "" ||
      description === "" ||
      playtime === ""
    ) {
      console.log("Fyll ut alle felt!");
      showErrorMessage();
      return;
    }
    hideErrorMessage();
    console.log(
      "Navn på lek: " + name,
      "\n",
      "Antall spillere: " + players,
      "\n",
      "Beskrivelse: " + description,
      "\n",
      "Spilletid: " + playtime,
      "\n",
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      "Kategori: " + categories?.map((category) => category.value),
    );

    const input: CreateGame = {
      name,
      description,
      rules,
      duration: playtime,
      numberOfPlayers: players,
    };
    const game = await useGameMutation.mutateAsync(input);

    if (categories) {
      for (const category of categories) {
        await useCategoryRelationMutation.mutateAsync({
          categoryId: parseInt(category.value),
          gameId: game.gameId,
        });
      }
    }

    const url = "/gamePage?gameId=" + game.gameId;
    await router.push(url);
  };

  return (
    <Layout>
      <div className="flex w-full items-start justify-start rounded-2xl bg-neutral-900 p-4">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-start justify-center gap-4 align-middle text-md font-normal"
        >
          <div className="flex items-center gap-2 align-middle">
            <button>
              <ArrowBackRounded onClick={() => router.back()} />
            </button>
            <p className="text-xxl font-bold">Opprett ny lek</p>
          </div>
          <input
            type="text"
            value={name}
            maxLength={40}
            onChange={handleNameChange}
            placeholder="Navn på lek..."
            className="w-full rounded-lg bg-neutral-800 py-2 pl-2 pr-2 text-white focus:outline-none"
          />
          <input
            type="number"
            min="1"
            max="40"
            value={players}
            onChange={handlePlayerCountChange}
            placeholder="Minst antall spillere..."
            className="w-full rounded-lg bg-neutral-800 py-2 pl-2 pr-2 text-white focus:outline-none"
          />

          <label htmlFor="time">Estimert varighet: {playtime} </label>
          <input
            type="range"
            id="time"
            name="time"
            min="1"
            max="59"
            value={playtime}
            onChange={(e) => setPlayTime(e.target.value)}
            placeholder="Tidsestimat"
            className="w-full rounded-lg bg-neutral-800 py-2 pl-2 pr-2 text-white focus:outline-none"
          />

          <input
            type="text"
            maxLength={191}
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

          <Combobox
            options={
              categoriesQuery.data?.map((category) => ({
                value: String(category.categoryId),
                label: category.name,
              })) ?? []
            }
            opt={selectedCategory}
            onChange={function (option: ComboxOption): void {
              setSelectedCategory(option);
              handleAddCategory(option);
            }}
            placeholder="Velg kategori"
          />
          <div className="flex gap-2">
            {categories?.map((category) => (
              <Button
                size={"sm"}
                key={category.value}
                onClick={() => {
                  handleRemoveCategory(category);
                }}
              >
                {category.label}
              </Button>
            ))}
          </div>
          <div className="flex gap-4">
            <button
              className=" rounded-full bg-violet-600 px-4 py-2 font-bold text-white shadow-lg hover:bg-violet-500 active:bg-violet-800"
              type="submit"
            >
              Opprett Lek
            </button>
            <button
              className="text-neutral-500 hover:underline"
              type="button"
              onClick={() => router.back()}
            >
              Avbryt
            </button>
          </div>

          {showError && <p className="text-red-500">Fyll ut alle felt!</p>}
        </form>
      </div>
    </Layout>
  );
};

export default CreateGame;
