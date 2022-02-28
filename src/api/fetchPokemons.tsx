import client from './axiosClient'
import Pokemon,{PokemonSingleResponse, PokemonAdditionalDetails} from '../ts/interfaces/PokemonInterface'

const getSinglePokemon = (url: string): Promise<any> => {
    return client(url, {
        method:"GET"
    })
}

const mergeData = (pokemonArray:PokemonSingleResponse[], pokemonInformation: PokemonAdditionalDetails[]) => {
    let PokemonData:Pokemon[] = [];
    for(let i = 0; i < pokemonArray.length; i++){
        const item = Object.assign(pokemonArray[i], pokemonInformation[i])
        const data = {
            ...item,
            id:item.id,
            name:item.name,
            image: item.sprites.front_default,
            types:item.types,
            height:item.height,
            weight:item.weight,
            abilites:item.abilities,
        }
        PokemonData.push(data)
    }
    return PokemonData
}

export const fetchPokemon = async (limit:number, offset: number): Promise<Pokemon[]> => {
    try{
        const { results } = await client(`pokemon?limit=${limit}&offset=${offset}`, {
            method:"GET"
        })

        const promiseArray: Promise<PokemonSingleResponse>[] = results.map((item:{url: string}) => {
            return getSinglePokemon(item.url)
        })
        const pokemonArray: PokemonSingleResponse[] = await Promise.all<PokemonSingleResponse>(promiseArray)
        const promiseArrayInfo: Promise<PokemonAdditionalDetails>[] = pokemonArray.map((item) => {
            return getSinglePokemon(item.species.url)
        })
        const extendPokemonInformation: PokemonAdditionalDetails[] = await Promise.all<PokemonAdditionalDetails>(promiseArrayInfo)
        return mergeData(pokemonArray, extendPokemonInformation)
    }catch(err){
        throw new Error("Fail to fetch list of pokemons")
    }
}

