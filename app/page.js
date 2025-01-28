"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import pokemonData from "../json/pokedex.json";

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

const Page = () => {
  const router = useRouter();
  const [activeBackgroundColor, setActiveBackgroundColor] = useState("#7AC74C");

  const navigateToPokemonList = () => {
    router.push("/pokemon");
  };

  const handleSlideChange = (swiper) => {
    const activeIndex = swiper.activeIndex;
    const activePokemon = pokemonData[activeIndex % pokemonData.length];
    const primaryType = activePokemon.type[0];
    const bgColor = typeColors[primaryType] || "#7AC74C";
    setActiveBackgroundColor(bgColor);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white transition-colors duration-500"
      style={{ backgroundColor: activeBackgroundColor }}
    >
      <div className="p-4 max-w-5xl w-full">
        <h1 className="text-3xl font-extrabold mb-8 text-center">
          Discover Your Favorite Pokemon
        </h1>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 3000 }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="rounded-lg"
          onSlideChange={handleSlideChange}
        >
          {pokemonData.map((pokemon) => {
            const primaryType = pokemon.type[0];
            const bgColor = typeColors[primaryType] || "#E5E7EB";

            return (
              <SwiperSlide key={pokemon.id}>
                <div
                  className="rounded-xl p-6 shadow-lg cursor-pointer transition-transform hover:scale-105"
                  style={{ backgroundColor: bgColor }}
                >
                  <img
                    src={pokemon.image.hires}
                    alt={pokemon.name.english}
                    className="w-full h-40 object-contain mb-4 rounded-lg"
                  />
                  <h2 className="text-xl font-bold mb-3 text-white">
                    {pokemon.name.english}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {pokemon.type.map((type) => (
                      <span
                        key={type}
                        className="px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                        style={{
                          backgroundColor: "#fff",
                          color: "#000",
                        }}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Button to navigate to /pokemon */}
        <div className="text-center mt-6">
          <button
            onClick={navigateToPokemonList}
            className="px-6 py-3 bg-white text-black font-bold rounded-lg shadow hover:bg-gray-200 transition"
          >
            Explore Pokemon
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
