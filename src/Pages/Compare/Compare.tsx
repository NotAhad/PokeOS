import React, { useState } from "react";
import usePokemon, { PokemonData } from "../../Data/usePokemon";
import SearchCard from "../../Components/SearchCard";

const Compare: React.FC = () => {
  const { pokemon, loading, error } = usePokemon();
  const [selectedPokemon1, setSelectedPokemon1] = useState<PokemonData | null>(null);
  const [selectedPokemon2, setSelectedPokemon2] = useState<PokemonData | null>(null);

  // Handlers to update the selected Pokémon from each SearchCard
  const handleSelect1 = (pokemon: PokemonData) => setSelectedPokemon1(pokemon);
  const handleSelect2 = (pokemon: PokemonData) => setSelectedPokemon2(pokemon);

  if (loading) {
    return (
      <div
        className="flex justify-center items-center h-screen"
        role="status"
        aria-live="polite"
      >
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen" role="alert">
        <p className="text-xl text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <main className="p-10 mt-12 lg:mt-48 flex flex-col gap-10 items-center justify-center">
      <h1 className="text-center font-bold tracking-[0.1em]">
        SELECT TWO POKÉMON TO COMPARE
      </h1>

      {/* Pokémon Selection Section */}
      <section
        aria-label="Pokémon Selection"
        className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-24 w-full max-w-4xl"
      >
        <div>
          <SearchCard allPokemon={pokemon} onSelect={handleSelect1} />
          {selectedPokemon1 && (
            <p className="mt-2 text-center text-sm text-indigo-900 uppercase">
              Selected: {selectedPokemon1.name}
            </p>
          )}
        </div>
        <div>
          <SearchCard allPokemon={pokemon} onSelect={handleSelect2} />
          {selectedPokemon2 && (
            <p className="mt-2 text-center text-sm text-indigo-900 uppercase">
              Selected: {selectedPokemon2.name}
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Compare;
