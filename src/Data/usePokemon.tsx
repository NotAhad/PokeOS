import { useEffect, useState } from "react";

export interface PokemonData {
  name: string;
  id: number;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=1000";

const usePokemon = () => {
  const [pokemon, setPokemon] = useState<PokemonData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // Fetch the list of 1000 Pokémon
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Process in batches to reduce rate limiting issues
        const batchSize = 50;
        let allPokemon: PokemonData[] = [];
        for (let i = 0; i < data.results.length; i += batchSize) {
          const batch = data.results.slice(i, i + batchSize);
          const results = await Promise.allSettled(
            batch.map(async (currentPokemon: { url: string }) => {
              const res = await fetch(currentPokemon.url);
              return res.json();
            })
          );
          const fulfilled = results.filter(
            (result): result is PromiseFulfilledResult<PokemonData> =>
              result.status === "fulfilled"
          );
          allPokemon = allPokemon.concat(fulfilled.map((r) => r.value));
          // Add a short delay between batches to avoid rate limiting
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
        setPokemon(allPokemon);
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  return { pokemon, loading, error };
};

export default usePokemon;
