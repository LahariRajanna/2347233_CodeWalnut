import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons } from '@/features/pokemonsSlice';

const usePokemons = () => {
    const dispatch = useDispatch();
    const { items: pokemons, loading, error } = useSelector((state) => state.pokemons);

    useEffect(() => {
        dispatch(fetchPokemons());
    }, [dispatch]);

    return { pokemons, loading, error };
};

export default usePokemons;
