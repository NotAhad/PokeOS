import React, { useEffect, useState, useCallback } from "react";
import usePokemon, { PokemonData } from "../../Data/usePokemon";
import SearchCard from "../../Components/SearchCard";

const Game: React.FC = () => {
  const { pokemon, loading, error } = usePokemon();
  const [targetPokemon, setTargetPokemon] = useState<PokemonData | null>(null);
  const [guessedPokemon, setGuessedPokemon] = useState<PokemonData | null>(null);
  const [feedback, setFeedback] = useState<{ text: string; color: string }>({
    text: "GUESS",
    color: "inherit",
  });
  const [guessCount, setGuessCount] = useState(0);
  const [isGuessing, setIsGuessing] = useState(false);

  // Randomly choose a target Pokémon once data is loaded.
  useEffect(() => {
    if (pokemon.length > 0 && !targetPokemon) {
      const randomIndex = Math.floor(Math.random() * pokemon.length);
      setTargetPokemon(pokemon[randomIndex]);
    }
  }, [pokemon, targetPokemon]);

  const handleGuess = useCallback(() => {
    if (!targetPokemon || !guessedPokemon) return;
    if (feedback.text === "Correct") return; // Already correct.
    if (isGuessing) return; // Prevent multiple clicks during delay.

    setIsGuessing(true);
    setGuessCount((prev) => prev + 1);

    if (guessedPokemon.id > targetPokemon.id) {
      setFeedback({ text: "Lower", color: "blue" });
      setTimeout(() => {
        setFeedback({ text: "GUESS", color: "inherit" });
        setIsGuessing(false);
      }, 1000);
    } else if (guessedPokemon.id < targetPokemon.id) {
      setFeedback({ text: "Higher", color: "red" });
      setTimeout(() => {
        setFeedback({ text: "GUESS", color: "inherit" });
        setIsGuessing(false);
      }, 1000);
    } else {
      // Correct guess; keep feedback as "Correct" and allow no further guesses.
      setFeedback({ text: "Correct", color: "green" });
      setIsGuessing(false);
    }
  }, [targetPokemon, guessedPokemon, feedback.text, isGuessing]);

  const handleSearchSelect = useCallback((p: PokemonData) => {
    setGuessedPokemon(p);
    setFeedback({ text: "GUESS", color: "inherit" });
  }, []);

  if (loading) {
    return (
      <div className="text-center text-xl" role="alert">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center text-xl text-red-500" role="alert">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-[5rem]">
      <div className="w-[35rem] p-5 flex flex-col items-center gap-10">
        <h1 className="font-bold tracking-[0.1em] text-center">
          I HAVE CHOSEN A RANDOM POKÉMON. GUESS THE POKÉMON BY FIGURING OUT ITS POKEDEX NUMBER! GUESS BELOW AND YOU WILL BE
          TOLD IF THE POKEDEX NUMBER IS HIGHER OR LOWER THAN YOUR POKÉMON. REFRESH THE PAGE TO GUESS A NEW POKÉMON.
        </h1>

        <SearchCard allPokemon={pokemon} onSelect={handleSearchSelect} />

        <div className="flex justify-between items-center w-[10.8rem] -mt-5">
          <button
            onClick={handleGuess}
            disabled={isGuessing || !guessedPokemon || feedback.text === "Correct"}
            className="py-[0.35rem] rounded-lg font-bold uppercase tracking-[0.1em] border-2 w-[60%] focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ borderColor: feedback.color, color: feedback.color }}
            aria-label="Submit your guess"
          >
            {feedback.text}
          </button>
          <div
            className="text-xl text-center font-bold py-[0.35rem] rounded-lg uppercase border-2 w-[25%]"
            aria-live="polite"
          >
            {guessCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
