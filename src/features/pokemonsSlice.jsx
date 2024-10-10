// src/features/pokemonsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPokemons = createAsyncThunk('pokemons/fetchPokemons', async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();

    return data.results.map((pokemon, index) => {
        const id = index + 1; // PokeAPI is 1-indexed
        return {
            name: pokemon.name,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        };
    });
});

const pokemonsSlice = createSlice({
    name: 'pokemons',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemons.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPokemons.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchPokemons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default pokemonsSlice.reducer;
