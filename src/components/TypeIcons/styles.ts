import styled from 'styled-components/native';
import { Image } from 'react-native-expo-image-cache';

export const Container = styled.View`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    display: flex;
    align-items:center;
    justify-content:center;
    margin:10px;
`;

export const PokemonImage = styled(Image)`
    width: 132px;
    height: 132px;
`