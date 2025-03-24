import React, { useState, useEffect, useMemo } from "react";
import PokemonCard from "./PokemonCard";
import { PokemonData } from "../Data/usePokemon";

interface SearchCardProps {
  allPokemon: PokemonData[];
  onSelect?: (pokemon: PokemonData) => void;
}

// Custom hook for debouncing input values
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

const SearchCard: React.FC<SearchCardProps> = ({ allPokemon, onSelect }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounce the search input for better performance
  const debouncedSearchText = useDebounce(searchText, 300);

  // Memoize suggestions to avoid re-filtering on every keystroke
  const suggestions = useMemo(
    () =>
      allPokemon.filter((p) =>
        p.name.toLowerCase().includes(debouncedSearchText.toLowerCase())
      ),
    [debouncedSearchText, allPokemon]
  );

  const handleSelect = (pokemon: PokemonData) => {
    setSelectedPokemon(pokemon);
    setSearchText("");
    setShowSuggestions(false);
    if (onSelect) {
      onSelect(pokemon);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Card Display */}
      <div className="bg-[rgb(30,30,30)] w-[28rem] h-[23.7rem] rounded-xl">
        {selectedPokemon ? (
          <PokemonCard pokemonData={selectedPokemon} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-[rgb(20,20,20)] text-2xl font-extrabold tracking-[0.1em]">
              SELECT A POKEMON
            </span>
          </div>
        )}
      </div>

      {/* Search Input with Suggestions */}
      <div className="relative flex flex-col">
        <div className="flex gap-1 items-center border-b-2 w-[11.5rem]">
          <img
            src="/public/search.png"
            alt="Search Icon"
            className="size-8 p-1"
          />
          <input
            type="text"
            placeholder="ENTER POKEMON"
            className="w-[8.8rem] bg-transparent outline-none"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setShowSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onFocus={() => setShowSuggestions(true)}
            aria-label="Search Pokémon"
          />
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && debouncedSearchText && (
          <ul
            className="absolute top-full left-0 w-[11.5rem] z-20 bg-[rgb(30,30,30)] border rounded-md shadow-lg max-h-40 overflow-auto"
            role="listbox"
            aria-label="Search Suggestions"
          >
            {suggestions.length > 0 ? (
              suggestions.map((p) => (
                <li
                  key={p.id}
                  className="p-2 cursor-pointer hover:bg-indigo-900 focus:bg-indigo-900 outline-none"
                  role="option"
                  tabIndex={0}
                  onClick={() => handleSelect(p)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSelect(p);
                    }
                  }}
                >
                  {p.name}
                </li>
              ))
            ) : (
              <li className="p-2">No matches found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchCard;
