"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '../../../components/Home/Navbar';
import Image from 'next/image';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TeamDetails = () => {
    const { id } = useParams();
    const [team, setTeam] = useState(null);
    const [loadingImages, setLoadingImages] = useState(true);

    useEffect(() => {
        const storedTeams = JSON.parse(localStorage.getItem('teams')) || [];
        const selectedTeam = storedTeams[id];

        if (selectedTeam) {
            setTeam(selectedTeam);
            fetchImages(selectedTeam.members);
        } else {
            console.error('Team not found');
        }
    }, [id]);

    const fetchImages = async (members) => {
        const updatedMembers = await Promise.all(members.map(async (pokemon) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name.toLowerCase()}`);
            const data = await response.json();
            return {
                ...pokemon,
                imageUrl: data.sprites.front_default,
            };
        }));
        setTeam((prev) => ({ ...prev, members: updatedMembers }));
        setLoadingImages(false);
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedMembers = Array.from(team.members);
        const [moved] = reorderedMembers.splice(result.source.index, 1);
        reorderedMembers.splice(result.destination.index, 0, moved);

        // Update local storage with the new order
        const updatedTeams = JSON.parse(localStorage.getItem('teams')) || [];
        updatedTeams[id] = { ...team, members: reorderedMembers };
        localStorage.setItem('teams', JSON.stringify(updatedTeams));

        // Update the state
        setTeam((prev) => ({ ...prev, members: reorderedMembers }));
    };

    if (!team || loadingImages) return <p>Loading...</p>;

    return (
        <>
            <Navbar />
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-4">{team.name}</h1>
                <h2 className="text-2xl mt-6">Pokémons:</h2>

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="flex justify-center"
                            >
                                <div className="pokemon-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {team.members.map((pokemon, index) => (
                                        <Draggable key={pokemon.name} draggableId={pokemon.name} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="pokemon-card p-4 border rounded shadow w-80 flex flex-col items-center justify-center transition duration-300 ease-in-out hover:bg-[#FFE8E8] hover:border-[#D11586] border-[#D11586] cursor-pointer"
                                                >
                                                    <Image
                                                        src={pokemon.imageUrl}
                                                        alt={pokemon.name}
                                                        width={100}
                                                        height={100}
                                                        className="mb-2"
                                                    />
                                                    <h2 className="text-lg font-semibold capitalize">{pokemon.name}</h2>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </>
    );
};

export default TeamDetails;
