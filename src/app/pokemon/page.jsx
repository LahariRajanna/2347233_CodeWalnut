"use client";

import Image from 'next/image';
import React from 'react';
import Link from 'next/link'; // Import Link from next/link
import usePokemons from '@/components/Functions/usePokemons';
import Navbar from '../../components/Home/Navbar'

const PokemonListing = () => {
    const { pokemons, loading, error } = usePokemons();

    return (
        <>
            <Navbar />
            <section className='pokemon-listing container mx-auto'>
                <div className='py-10'>
                    <h1 className="text-3xl font-bold flex items-center justify-center mb-24">
                        Pokémons Listings
                    </h1>

                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}

                    <div className="flex justify-center">
                        <div className="pokemon-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {pokemons.map((pokemon, index) => (
                                <Link
                                    key={pokemon.name}
                                    href={`/pokemon/${index + 1}`} 
                                    className="pokemon-card p-4 border rounded shadow w-80 flex items-center justify-center transition duration-300 ease-in-out hover:bg-[#FFE8E8] hover:border-[#D11586] border-[#D11586] cursor-pointer"
                                >
                                    <Image
                                        src={pokemon.imageUrl}
                                        alt={pokemon.name}
                                        width={100}
                                        height={100}
                                        className="mb-2"
                                    />
                                    <h2 className="text-lg font-semibold capitalize">{pokemon.name}</h2>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
};

export default PokemonListing;
