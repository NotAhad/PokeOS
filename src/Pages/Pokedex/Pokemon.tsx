import React, { useEffect, useState } from "react";
import usePokemon, { PokemonData } from "../../Data/usePokemon";
import SideMenu from "./SideMenu";
import Pokedex from "./Pokedex";

const Pokemon: React.FC = () => {
  const { pokemon, loading, error } = usePokemon();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const itemsPerPage = 12;

  // Reset page number when the search term or selected type changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType]);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }
  if (error) {
    return (
      <div className="text-center text-xl text-red-500">
        Error: {error.message}
      </div>
    );
  }

  // Get unique Pokémon types for the type filter
  const allTypes = Array.from(
    new Set(pokemon.flatMap((p) => p.types.map((t) => t.type.name)))
  );

  // Filter Pokémon based on the search term and selected type
  const filteredPokemon = pokemon.filter((p: PokemonData) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "All" ||
      p.types.some((t) => t.type.name === selectedType);
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);
  const paginatedPokemon = filteredPokemon.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col items-center mt-10 gap-8">
      <SideMenu
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        allTypes={allTypes}
      />
      <Pokedex
        paginatedPokemon={paginatedPokemon}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Pokemon;
