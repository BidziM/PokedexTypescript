import client from './axiosClient'
import { AxiosResponse } from 'axios';
import {PokemonSingleResponse} from '../ts/interfaces/PokemonInterface'
import DescribeType from '../ts/interfaces/Types'

const getSinglePokemon = (url: string): Promise<AxiosResponse> => {
    return client(url, {
        method:"GET"
    })
}

const mergeData = (pokemonArray:PokemonSingleResponse[], TypeInformation: DescribeType) => {
    return {
        ...TypeInformation,
        pokemon:pokemonArray
    }
}

export const fetchType = async (typeName: string): Promise<DescribeType> => {
    try{
        const data = await client(`type/${typeName}`, {
            method:"GET"
        })
        const promiseArray = data.pokemon.slice(0,48).map((item:{pokemon:{url: string}}) => {
            return getSinglePokemon(item.pokemon.url)
        })
        const pokemonArray:PokemonSingleResponse[] = await Promise.all<PokemonSingleResponse[]>(promiseArray)
        return mergeData(pokemonArray, data)
    }catch(err){
        throw new Error("Fail to fetch list of pokemons")
    }
}

