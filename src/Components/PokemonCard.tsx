import React, { useState } from "react";
import { PokemonData } from "../Data/usePokemon";
import { useFavourites } from "../Pages/Favourites/FavouritesContext";

interface PokemonCardProps {
  pokemonData: PokemonData;
}

const typeColors: { [key: string]: { typeColor: string } } = {
  normal: { typeColor: "#A8A77A" },
  fire: { typeColor: "#EE8130" },
  water: { typeColor: "#6390F0" },
  electric: { typeColor: "#F7D02C" },
  grass: { typeColor: "#7AC74C" },
  ice: { typeColor: "#96D9D6" },
  fighting: { typeColor: "#C22E28" },
  poison: { typeColor: "#A33EA1" },
  ground: { typeColor: "#E2BF65" },
  flying: { typeColor: "#A98FF3" },
  psychic: { typeColor: "#F95587" },
  bug: { typeColor: "#A6B91A" },
  rock: { typeColor: "#B6A136" },
  ghost: { typeColor: "#735797" },
  dragon: { typeColor: "#6F35FC" },
  dark: { typeColor: "#705746" },
  steel: { typeColor: "#B7B7CE" },
  fairy: { typeColor: "#D685AD" },
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemonData }) => {
  const { favourites, addFavourite, removeFavourite } = useFavourites();
  const [isHovered, setIsHovered] = useState(false);

  const isFavourite = favourites.some((p) => p.id === pokemonData.id);

  const handleFavouriteClick = () => {
    if (isFavourite) {
      removeFavourite(pokemonData.id);
    } else {
      addFavourite(pokemonData);
    }
  };

  // Extract Pokémon type names and colors
  const typeNames = pokemonData.types.map((t) => t.type.name);
  const typeColorsArray = typeNames.map(
    (type) => typeColors[type]?.typeColor || "#A8A77A"
  );

  // Set dynamic text color for the ID (solid for one type, gradient for two)
  const textColorStyle =
    typeColorsArray.length === 1
      ? { color: typeColorsArray[0] }
      : {
          backgroundImage: `linear-gradient(to right, ${typeColorsArray[0]}, ${typeColorsArray[1]})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
          backgroundSize: "200% 100%",
          backgroundPosition: "center",
        };

  // Helper function to get the image based on the stat name
  const getStatImage = (statName: string) => {
    switch (statName.toLowerCase()) {
      case "hp":
        return "/hp.png";
      case "attack":
        return "/attack.png";
      case "defense":
        return "/def.png";
      case "special-attack":
        return "/spatk.png";
      case "special-defense":
        return "/spdef.png";
      case "speed":
        return "/speed.png";
      default:
        return "/default.png";
    }
  };

  return (
    <div className="p-4 relative bg-[rgb(30,30,30)] w-[28rem] rounded-xl flex flex-col items-center">
      <div className="relative">
        <p
          className="absolute -top-12 left-1/2 transform -translate-x-[13.4rem] tracking-[0.2em] text-[6.5rem] font-extrabold z-0"
          style={textColorStyle}
        >
          #{pokemonData.id.toString().padStart(4, "0")}
        </p>

        <div className="flex absolute top-[5.75rem] w-[23rem] left-[-8.5rem] justify-between font-bold tracking-[0.1em]">
          <p className="whitespace-nowrap"> {(pokemonData.height / 10).toFixed(1)} M</p>
          <p className="whitespace-nowrap"> {(pokemonData.weight / 10).toFixed(1)} KG</p>
        </div>

        <img
          src={pokemonData.sprites.front_default}
          alt={pokemonData.name}
          className="scale-[2] mx-auto relative z-10 mt-[4rem]"
        />
      </div>

      <h1 className="mt-10 text-center uppercase font-bold tracking-[0.2em] text-xl">
        {pokemonData.name}
      </h1>

      <div className="mt-4 w-full px-[1rem] flex justify-between font-bold tracking-[0.1em]">
        {pokemonData.stats.map((stat, index) => {
          const statImage = getStatImage(stat.stat.name);
          return (
            <div key={index} className="flex flex-col items-center text-center gap-1">
              <div>
                <img src={statImage} alt={stat.stat.name} className="size-4" />
              </div>
              <p className="w-[35px]">{stat.base_stat}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex justify-between w-full">
        {pokemonData.types.map((currentType) => {
          const typeName = currentType.type.name;
          const { typeColor } = typeColors[typeName];
          return (
            <span
              key={typeName}
              className="min-w-[7rem] max-w-[7rem] -mx-[0.2rem] whitespace-nowrap justify-center flex bg-transparent py-[0.35rem] rounded-md font-bold tracking-[0.1em] uppercase border-2"
              style={{ color: typeColor, borderColor: typeColor }}
            >
              {typeName}
            </span>
          );
        })}
      </div>
      
      <div className="absolute flex justify-center min-w-12 min-h-12 bottom-[-0.75rem] bg-[rgb(30,30,30)] border-4 border-[rgb(20,20,20)] p-1 rounded-full">
        <button
          onClick={handleFavouriteClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={
              isHovered
                ? "/favourite.png"
                : isFavourite
                ? "/favourite.png"
                : "/unfavourite.png"
            }
            alt={isFavourite ? "Remove from favourites" : "Add to favourites"}
            className="size-7"
          />
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
