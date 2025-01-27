"use client";

import { useParams } from "next/navigation";
import pokemonData from "../../../json/pokedex.json";
import { useEffect, useState } from "react";

const typeColors = {
  Normal: "#A8A77A",
  Fire: "#EE8130",
  Water: "#6390F0",
  Electric: "#F7D02C",
  Grass: "#7AC74C",
  Ice: "#96D9D6",
  Fighting: "#C22E28",
  Poison: "#A33EA1",
  Ground: "#E2BF65",
  Flying: "#003dff",
  Psychic: "#F95587",
  Bug: "#A6B91A",
  Rock: "#B6A136",
  Ghost: "#735797",
  Dragon: "#af00ff",
  Dark: "#705746",
  Steel: "#7a7aff",
  Fairy: "#D685AD",
};

const statColors = {
  HP: "#da4343",
  Attack: "#f38d45",
  Defense: "#f3d14a",
  Speed: "#f75887",
  "Sp. Attack": "#547fe4",
  "Sp. Defense": "#84df57",
};

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const foundPokemon = pokemonData.find((p) => p.id === Number(id));
    setPokemon(foundPokemon);
    setIsLoaded(true);
  }, [id]);

  if (!pokemon) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-700 text-white p-6 rounded-lg shadow-lg">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold">Pokemon Not Found</h1>
          <p className="text-lg font-medium">Sorry, we couldn't find the Pokémon you're looking for. Please check the ID or try again later.</p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-lg font-semibold rounded-md transition-transform transform hover:scale-105"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }  

  const backgroundColor = typeColors[pokemon.type[0]] || "#ffffff";

  const StatBar = ({ stat, value }) => (
    <div className="mb-4 transform hover:scale-105 transition-transform duration-200">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{stat}</span>
        <span className="text-sm font-bold">{value}</span>
      </div>
      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${value}%`,
            backgroundColor: statColors[stat] || "#2196f3",
          }}
        />
      </div>
    </div>
  );

  const TypeBadge = ({ type }) => (
    <span
      className="px-4 py-1 rounded-full text-white text-sm font-semibold mr-2 transform hover:scale-110 transition-transform duration-200"
      style={{ backgroundColor: typeColors[type] }}
    >
      {type}
    </span>
  );

  return (
    <div
      className={`min-h-screen p-8 transition-opacity duration-500 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundColor,
        color: "#fff",
      }}
    >
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Image and Basic Info */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative group">
              <img
                src={pokemon.image.hires}
                alt={pokemon.name.english}
                className="w-80 h-80 object-contain transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-5xl font-bold mb-2 transform hover:scale-105 transition-transform">
                {pokemon.name.english}
              </h1>
              <h2 className="text-2xl font-medium text-white/80">
                {pokemon.name.japanese}
              </h2>
              <div className="flex justify-center gap-2 mt-4 flex-wrap">
                {pokemon.type.map((type) => (
                  <TypeBadge key={type} type={type} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Stats and Details */}
          <div className="space-y-6">
            <div className="bg-white/20 rounded-2xl p-6 transform hover:translate-y-[-4px] transition-transform duration-200">
              <h3 className="text-2xl font-semibold mb-4">Profile</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm opacity-80">Height</p>
                  <p className="text-xl font-medium">{pokemon.profile.height}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm opacity-80">Weight</p>
                  <p className="text-xl font-medium">{pokemon.profile.weight}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm opacity-80">Gender</p>
                  <p className="text-xl font-medium">{pokemon.profile.gender}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm opacity-80">ID</p>
                  <p className="text-xl font-medium">#{pokemon.id.toString().padStart(3, '0')}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/20 rounded-2xl p-6 transform hover:translate-y-[-4px] transition-transform duration-200">
              <h3 className="text-2xl font-semibold mb-4">Base Stats</h3>
              <div className="space-y-3">
                {Object.entries(pokemon.base).map(([stat, value]) => (
                  <StatBar key={stat} stat={stat} value={value} />
                ))}
              </div>
            </div>

            <div className="bg-white/20 rounded-2xl p-6 transform hover:translate-y-[-4px] transition-transform duration-200">
              <h3 className="text-2xl font-semibold mb-4">Abilities</h3>
              <div className="space-y-2">
                {pokemon.profile.ability.map(([ability, isHidden], index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 transform hover:translate-x-2 transition-transform duration-200"
                  >
                    <span className="text-lg font-medium">{ability}</span>
                    {isHidden && (
                      <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
                        Hidden
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-8 bg-white/20 rounded-2xl p-6 transform hover:translate-y-[-4px] transition-transform duration-200">
          <h3 className="text-2xl font-semibold mb-4">Description</h3>
          <p className="text-lg leading-relaxed">{pokemon.description}</p>
        </div>

        {/* Evolution Section */}
        {pokemon.evolution && pokemon.evolution.next && pokemon.evolution.next.length > 0 && (
          <div className="mt-8 bg-white/20 rounded-2xl p-6 transform hover:translate-y-[-4px] transition-transform duration-200">
            <h3 className="text-2xl font-semibold mb-4">Evolution</h3>
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-sm opacity-80">Evolves at Level</p>
                <p className="text-xl font-medium">{pokemon.evolution.next[0][1]}</p>
              </div>
              <div>
                <p className="text-sm opacity-80">Evolution ID</p>
                <p className="text-xl font-medium">#{pokemon.evolution.next[0][0]}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonDetails;