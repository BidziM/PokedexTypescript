import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native-expo-image-cache';

import {PokemonSingleResponse} from '../../ts/interfaces/PokemonInterface'

export const Container = styled(SafeAreaView)`
  flex: 1;
  align-items:center;
`;

export const IconContainer = styled.View`
    width: 132px;
    height: 132px;
    border-radius: 66px;
    display: flex;
    align-items:center;
    justify-content:center;
    margin:10px;
`

export const GoBackButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

export const PokemonImage = styled(Image)`
    width: 132px;
    height: 132px;
`

export const PokemonTypeList: new () => FlatList<PokemonSingleResponse> = styled(FlatList)`
  flex: 1;
  width: 100%;
` as any;