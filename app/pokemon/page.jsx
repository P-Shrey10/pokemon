"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import pokemonData from "../../json/pokedex.json";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const router = useRouter();

  // Calculate pagination data
  const totalPages = Math.ceil(pokemonData.length / itemsPerPage);
  const paginatedData = pokemonData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page changes
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Navigate to the details page
  const navigateToDetails = (id) => {
    router.push(`/pokemon/${id}`);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Pokemon List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {paginatedData.map((pokemon) => {
          // Get the background color for the first type
          const primaryType = pokemon.type[0];
          const bgColor = typeColors[primaryType] || "#E5E7EB";

          return (
            <div
              key={pokemon.id}
              className="rounded-lg p-4 shadow-md transition-transform hover:scale-105 cursor-pointer"
              style={{ backgroundColor: bgColor }}
              onClick={() => navigateToDetails(pokemon.id)}
            >
              <img
                src={pokemon.image.hires}
                alt={pokemon.name.english}
                className="w-full h-40 object-contain mb-4 rounded-lg"
                style={{ backgroundColor: bgColor }}
              />
              <h2 className="text-lg font-bold mb-2 text-white">{pokemon.name.english}</h2>
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
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="text-lg font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
