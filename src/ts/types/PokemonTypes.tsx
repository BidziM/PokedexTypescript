
export type Types = {
    types:Type[]
};

export type Type = {
    type:{
        name: string;
        url: string;
    }
};

export type Stat = {
    base_stat: number;
    stat:{
        name: string;
        url: string;
    }
};
  
export type Ability = {
    name: string;
    url: string;
};