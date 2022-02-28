import React, { createContext, useContext, useState, FC, PropsWithChildren, useEffect } from "react";
import Pokemon from '../ts/interfaces/PokemonInterface'
import User from '../ts/interfaces/UserInterface'
import { fetchPokemon } from '../api/fetchPokemons'
import { Alert } from 'react-native';

interface ContextType {
    pokemons: Pokemon[];
    getMorePokemons: () => void;
    loading:boolean;
    setSearch: (input: string) => void;
}

export const AppContext = createContext<ContextType>({} as ContextType);

export const AppProvider: FC = ({ children }: PropsWithChildren<unknown>) => {
const [pokemonsArray, setPokemon] = useState<Pokemon[]>([])
const [loading, setLoading] = useState(true)
const [Search, setSearch] = useState('')
const pokemons = pokemonsArray.filter(item => {
    if (item.name.indexOf(Search.toLocaleLowerCase()) == -1) { return false }
    else {return true }
});

const getMorePokemons = () => {
    fetchPokemon(300, 0)
    .then((res) => {
        setPokemon(res)
        setLoading(false)
    })
    .catch(() => {
        Alert.alert(
            'Fail to fetch list of pokemons try later',
        );
    })
}

useEffect(() => {
    getMorePokemons()
}, [])

return (
  <AppContext.Provider
    value={{ pokemons, getMorePokemons, loading, setSearch }}>
    {children}
  </AppContext.Provider>
  );
};

export default function appState(): ContextType {
    const context = useContext(AppContext);
  
    return context;
  }
