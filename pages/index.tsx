/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

type Pokemon = {
  name: string;
  url: string;
  id: number;
  image: string;
};

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      const data = await res.json();

      const enriched = data.results.map((pokemon: any, index: number) => ({
        ...pokemon,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          index + 1
        }.png`,
      }));

      setPokemons(enriched);
    };
    fetchPokemons();
  }, []);

  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-50 p-4">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800 drop-shadow-sm">
        Pokémon Explorer
      </h1>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
        {filtered.map((pokemon) => (
          <Link key={pokemon.id} href={`/pokemon/${pokemon.id}`}>
            <div className="bg-white rounded-2xl shadow-md p-4 text-center transform hover:-translate-y-1 hover:shadow-lg transition duration-200 cursor-pointer">
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                className="mx-auto"
                width={100}
                height={100}
              />
              <p className="capitalize mt-3 font-semibold text-gray-700">
                {pokemon.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
