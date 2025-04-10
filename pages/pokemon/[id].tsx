/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";

export default function PokemonDetail({ pokemon }: { pokemon: any }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6">
        <h1 className="text-4xl font-bold capitalize text-center mb-6">
          {pokemon.name}
        </h1>

        <div className="flex justify-center mb-6">
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={160}
            height={160}
            className="w-40 h-40"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
          <div>
            <h2 className="text-xl font-semibold mb-2 underline">Abilities</h2>
            <ul className="space-y-1">
              {pokemon.abilities.map((a: any, i: number) => (
                <li
                  key={i}
                  className="capitalize bg-green-100 text-green-900 rounded px-2 py-1 inline-block"
                >
                  {a.ability.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 underline">Types</h2>

            <ul className="space-y-1">
              {pokemon.types.map((t: any, i: number) => (
                <li
                  key={i}
                  className="capitalize bg-purple-100 text-purple-900 rounded px-2 py-1 inline-block"
                >
                  {t.type.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="mt-8 flex justify-center w-[400px]">
            <div className="w-full max-w-md px-4">
              <h2 className="text-xl font-semibold mb-2 text-center underline">
                Stats
              </h2>
              <ul className="space-y-4">
                {pokemon.stats.map((s: any, i: number) => (
                  <li key={i} className="capitalize">
                    <div className="flex justify-between font-medium text-sm sm:text-base">
                      <span>{s.stat.name}</span>
                      <span>{s.base_stat}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded">
                      <div
                        className="h-2 bg-blue-500 rounded"
                        style={{ width: `${Math.min(s.base_stat, 100)}%` }}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2 text-center underline">
            Moves (First 10)
          </h2>

          <ul className="flex flex-col items-center  justify-center gap-2">
            {pokemon.moves.slice(0, 10).map((m: any, i: number) => (
              <li
                key={i}
                className="capitalize bg-yellow-100 text-yellow-900 px-3 py-1 rounded-full text-sm list-none"
              >
                {m.move.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await res.json();

  const paths = data.results.map((_: any, index: number) => ({
    params: { id: (index + 1).toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params?.id}`);
  const pokemon = await res.json();

  return {
    props: {
      pokemon,
    },
  };
};
