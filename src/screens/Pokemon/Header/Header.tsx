import React, { useCallback } from 'react';
import { Animated } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Pokemon from '../../../ts/interfaces/PokemonInterface';
import Text from '../../../components/Text/text';;
import displeyPokemonId from '../../../utilites/displayPokemonId'

import { Container, GoBackButton } from './styles';

type HeaderProps = {
  translateY: Animated.Value;
  pokemon: Pokemon;
};

const Header = ({ pokemon, translateY }: HeaderProps) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => navigation.goBack(), [navigation]);

  const fadeStyle = {
    opacity: translateY.interpolate({
      inputRange: [-300, -200],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  };

  const pokemonNumber = displeyPokemonId(pokemon.id)
  const pokemonName = pokemon.name.charAt(0).toLocaleUpperCase() + pokemon.name.slice(1)
  
  return (
    <Container>
      <GoBackButton onPress={handleGoBack}>
        <Icon name="arrow-left" color={colors.white} size={32} />
      </GoBackButton>

      <Animated.View style={fadeStyle}>
        <Text variant="body1" color="white" bold>
          {pokemonName}
        </Text>
      </Animated.View>

      <Animated.View style={fadeStyle}>
        <Text variant="body2" color="white" bold>
          {pokemonNumber}
        </Text>
      </Animated.View>
    </Container>
  );
};

export default Header;