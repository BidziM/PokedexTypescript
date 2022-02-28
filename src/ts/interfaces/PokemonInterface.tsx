import { Type, Ability, Stat } from '../types/PokemonTypes'

export interface PokemonSingleResponse {
    id: number;
    name:string;
    height:number;
    weight:number;
    base_experience: number;
    species:{
        name:string;
        url:string;
    }
    sprites:{
        front_default:string;
    }
    abilities:Ability[];
    types:Type[]
    stats:Stat[]
}
export interface PokemonAdditionalDetails {
    base_happiness:number
    capture_rate:number
    color:{
        name:string
    }
    egg_groups:{
        name:string;
        url:string;
    }[]
    flavor_text_entries:{
        flavor_text:string
    }[]
    forms_switchable:boolean
    gender_rate:number
    genera:{
        name:string;
        url:string
    }[]
    generations:{
        name:string
    }[]
    growth_rate:{
        name:string
    }
    habitat:{
        name:string
    }
    has_gender_differences:boolean
    hatch_counter:number
    is_baby:boolean
    is_legendary:boolean
    is_mythical:boolean
}

export default interface Pokemon extends PokemonSingleResponse, PokemonAdditionalDetails{}