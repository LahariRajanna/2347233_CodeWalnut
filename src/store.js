import { configureStore } from '@reduxjs/toolkit';
import pokemonsReducer from './features/pokemonsSlice';

const store = configureStore({
    reducer: {
        pokemons: pokemonsReducer,
    },
});

export default store;
