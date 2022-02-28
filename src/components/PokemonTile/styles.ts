import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Animated, FlatList } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import {Type} from '../../ts/types/PokemonTypes'

type ButtonProps = {
  newRowCard: boolean;
  isRightCard: boolean;
};

export const Container = styled(Animated.View)`
  max-width:50%;
  flex-direction:row;
  flex-wrap: wrap;
`;

export const Button = styled(RectButton)<ButtonProps>`
  margin: 10px;
  padding: 5px;
  flex-basis: 100%;
  border-radius: 12px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
  height:270px;
  ${props =>
    props.newRowCard &&
    css`
      margin-top: 0px;
      margin-left: 0px;
    `}
  ${props =>
    props.isRightCard &&
    css`
      margin-right: 0px;
      margin-left: 4px;
    `}
`;

export const PokemonImage = styled(Image)`
  width: 132px;
  height: 132px;
`;

export const PokemonTypeList: new () => FlatList<Type> = styled(FlatList)`
  flex: 1;
` as any;