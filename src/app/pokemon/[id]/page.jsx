"use client"
import { useEffect, useState } from 'react';
import Navbar from '../../../components/Home/Navbar'

const PokemonDetails = ({ params }) => {
    const { id } = params;
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPokemon(data);
                console.log(data)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Navbar />
            <div className="container mx-auto py-10 flex">
                <div className="w-1/3 p-4"> {/* Left Column */}
                    <div className='flex flex-col items-center'>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} width={200} />
                        <h1 className="text-3xl font-bold capitalize p-1 ">{pokemon.name}</h1>
                    </div>

                </div>
                <div className="w-2/3 p-4"> {/* Right Column */}
                    <h2 className="text-lg font-semibold">Abilities</h2>
                    <ul className='flex mb-5'>
                        {pokemon.abilities.map((ability) => (
                            <li className='m-3 p-1 capitalize' key={ability.ability.name}>{ability.ability.name}</li>
                        ))}
                    </ul>
                    <hr />
                    <div className="mt-5">
                        <h2 className="text-lg font-semibold">Stats</h2>
                        <ul className="space-y-4">
                            {pokemon.stats.map((stat) => (
                                <li key={stat.stat.name} className="flex items-center">
                                    <span className="w-1/4 capitalize">{stat.stat.name}</span>
                                    <div className="relative w-full h-4 bg-gray-200 rounded">
                                        <div
                                            className={`absolute top-0 left-0 h-full bg-green-500 rounded`}
                                            style={{ width: `${stat.base_stat}%` }}
                                        ></div>
                                    </div>
                                    <span className="ml-2">{stat.base_stat}/100</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full mt-5"> {/* Moves Section */}
                        <h2 className="text-lg font-semibold">Moves</h2>
                        <div className="flex flex-wrap space-x-2">
                            {pokemon.moves.map((moveData) => (
                                <span
                                    key={moveData.move.name}
                                    className="m-1 bg-customPink text-black rounded-full px-3 py-1 text-sm"
                                >
                                    {moveData.move.name}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default PokemonDetails;
