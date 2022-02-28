import React, { FC, useMemo } from 'react';
import { Container } from './styles'
import getPokemonType from '../../utilites/getPokemonType'
import getPokemonTypeColor from '../../utilites/getPokemonTypeColor'

type Props = {
    typeName: string;
    width?: number;
}

const DispleyIcon:FC<Props> = ({typeName, width}: Props) => {
    console.log(typeName)
    const backgroundColor = useMemo(
        () => getPokemonTypeColor(typeName),
        [typeName]
      );
    
    const IconUrl = getPokemonType(typeName)
    return (
        <Container style={{backgroundColor:backgroundColor, elevation:10, padding:10}}>
            <IconUrl width={width}/>
        </Container>
    );
};

DispleyIcon.defaultProps = {
    width:21
  };

export default DispleyIcon;