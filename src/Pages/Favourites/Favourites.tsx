import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useFavourites } from "./FavouritesContext";
import PokemonCard from "../../Components/PokemonCard";
import { PokemonData } from "../../Data/usePokemon";

const Favourites: React.FC = () => {
  const { favourites} = useFavourites();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Reset to first page whenever favourites update
  useEffect(() => {
    setCurrentPage(1);
  }, [favourites]);

  // Memoize total pages calculation
  const totalPages = useMemo(
    () => Math.ceil(favourites.length / itemsPerPage),
    [favourites.length]
  );

  // Memoize the current page slice to optimize re-renders
  const paginatedFavourites = useMemo(() => {
    return favourites.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [favourites, currentPage]);

  // Pagination handlers wrapped in useCallback to avoid re-creation
  const handlePrev = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  return (
    <div className="flex flex-col items-center mt-[6.5rem]">
      {favourites.length === 0 ? (
        <p className="font-bold ">NO FAVOURITES ADDED YET</p>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
            {paginatedFavourites.map((pokemon: PokemonData) => (
              <PokemonCard key={pokemon.id} pokemonData={pokemon} />
            ))}
          </div>

          <nav
            aria-label="Pagination"
            className="flex justify-center items-center gap-4 mt-10"
          >
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Next
            </button>
          </nav>
        </>
      )}
    </div>
  );
};

export default Favourites;
