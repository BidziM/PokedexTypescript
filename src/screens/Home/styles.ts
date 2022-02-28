import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Pokemon from '../../ts/interfaces/PokemonInterface'
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(SafeAreaView)`
  flex: 1;
  position: relative;
`;

export const PokemonList: new () => FlatList<Pokemon> = styled(FlatList)`
  flex: 1;
  margin-top: 8px;
` as any;

export const Button =  styled(RectButton)`
    padding: 5px 25px;
    margin-top:10px;
    border-radius: 4px;
    background-color: #3275a8;
    align-items:center;
`

export const PokemonImage = styled.Image`
  width: 142px;
  height: 142px;
`;