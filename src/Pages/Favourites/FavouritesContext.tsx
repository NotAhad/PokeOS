import React, { createContext, useContext } from "react";
import { PokemonData } from "../../Data/usePokemon";
import useLocalStorage from "../../Data/useLocalStorage";

interface FavouritesContextType {
  favourites: PokemonData[];
  addFavourite: (pokemon: PokemonData) => void;
  removeFavourite: (pokemonId: number) => void;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

interface FavouritesProviderProps {
  children: React.ReactNode;
}

export const FavouritesProvider: React.FC<FavouritesProviderProps> = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage<PokemonData[]>("favourites", []);

  const addFavourite = (pokemon: PokemonData) => {
    setFavourites((prev) => {
      // Avoid duplicates.
      if (!prev.some((p) => p.id === pokemon.id)) {
        return [...prev, pokemon];
      }
      return prev;
    });
  };

  const removeFavourite = (pokemonId: number) => {
    setFavourites((prev) => prev.filter((p) => p.id !== pokemonId));
  };

  return (
    <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }
  return context;
};
