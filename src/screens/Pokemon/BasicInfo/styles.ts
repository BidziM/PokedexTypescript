import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

export const Container = styled(Animated.View)`
  height: ${360}px;
  position: relative;
`;

export const Header = styled.View`
  flex: 1;
  padding: 0 24px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const PokemonImageContainer = styled(Animated.View)`
  margin-top: 24px;
  align-items: center;
  justify-content: flex-start;
`;

export const PokemonImage = styled(Image)`
  width: 256px;
  height: 256px;
`;

export const PokemonType = styled(Animated.View)`
  display:flex;
  flex: 1;
  justify-content: space-between;
`;
