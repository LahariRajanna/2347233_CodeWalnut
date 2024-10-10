"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Home/Navbar'

const TeamsPage = () => {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState([]);
    const [teamName, setTeamName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const storedTeams = JSON.parse(localStorage.getItem('teams')) || [];
        setTeams(storedTeams);
    }, []);

    const addTeam = () => {
        if (teamName && selectedTeam.length) {
            const newTeam = { name: teamName, members: selectedTeam };
            const updatedTeams = [...teams, newTeam];
            setTeams(updatedTeams);
            localStorage.setItem('teams', JSON.stringify(updatedTeams));
            setTeamName('');
            setSelectedTeam([]);
        }
    };

    const removePokemon = (pokemon) => {
        setSelectedTeam((prev) => prev.filter((p) => p !== pokemon));
    };

    const searchPokemon = async () => {
        if (searchQuery.trim() === '') return;

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
            const data = await response.json();
            const filteredPokemons = data.results.filter(pokemon =>
                pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(filteredPokemons);
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
        }
    };

    const addToTeam = (pokemon) => {
        if (selectedTeam.length < 6 && !selectedTeam.includes(pokemon)) {
            setSelectedTeam((prev) => [...prev, pokemon]);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="container mx-auto py-10 overflow-auto">
            <h1 className="text-3xl font-bold mb-4">Manage Your Teams</h1>
            <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Team Name"
                className="border p-2 mb-4"
            />
            <div className="flex flex-wrap mb-4">
                {selectedTeam.map((pokemon) => (
                    <div key={pokemon.name} className="m-2 flex items-center">
                        <span className="bg-[#FFE8E8] text-black rounded-full px-3 py-1 text-sm">
                            {pokemon.name}
                        </span>
                        <button onClick={() => removePokemon(pokemon)} className="ml-2 text-red-500">
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Pokémon"
                    className="border p-2 mr-2"
                />
                <button onClick={searchPokemon} className="bg-blue-500 text-white p-2 rounded">
                    Search
                </button>
            </div>
            <h2 className="text-2xl mt-6">Search Results</h2>
            <ul className="mb-4">
                {searchResults.map((pokemon) => (
                    <li key={pokemon.name} className="flex justify-between items-center border-b py-2">
                        <span>{pokemon.name}</span>
                        <button onClick={() => addToTeam(pokemon)} className="bg-green-500 text-white p-1 rounded">
                            Add to Team
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={addTeam} className="bg-blue-500 text-white p-2 rounded">
                Save Team
            </button>

            <h2 className="text-2xl mt-6 mb-6">Your Teams</h2>
            <ul>
                {teams.map((team, index) => (
                    <li key={index} className="flex justify-between items-center border-b py-2">
                        <span>{team.name}</span>
                        <Link href={`/team/${index}`} className="text-blue-500">View</Link>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
};

export default TeamsPage;
