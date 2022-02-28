import {PokemonSingleResponse} from './PokemonInterface'
export default interface DescribeType{
    damageRelations:{
        [prop: string]:{
            name: string;
            url: string
        }
    }[]
    damageClass:{
        name: string;
        url: string;
    }
    moves:{
        name: string;
        url: string
    }[]
    pokemon:PokemonSingleResponse[]
};