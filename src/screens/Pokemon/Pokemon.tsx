import React, { useMemo } from 'react';
import { Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useRoute } from '@react-navigation/native';

//import Block from '../../components/Block';
import PokemonType  from '../../ts/interfaces/PokemonInterface';
import getColorByPokemonType from '../../utilites/getPokemonTypeColor';

import Header from './Header/Header'
import InfoTable from './BasicInfo/BasicInfo';
import Details from './Details/Details';
import { Container, Content, DetailsContainer } from './styles';

export type RouteParams = {
  pokemon: PokemonType;
};

const Pokemon = () => {
  const route = useRoute();
  const POKEMON_HEIGHT: number = 320;
  const { pokemon } = route.params as RouteParams;

  const translateY = new Animated.Value(0);

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true },
  );

  const onHandlerStateChanged = (event: PanGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;

      const { translationY } = event.nativeEvent;

      if (translationY < -100) {
        opened = true;
      } else {
        opened = false;
        translateY.flattenOffset();
      }

      Animated.timing(translateY, {
        toValue: opened ? -POKEMON_HEIGHT : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        translateY.extractOffset();
      });
    }
  };

  const detailsStyle = {
    transform: [
      {
        translateY: translateY.interpolate({
          inputRange: [-POKEMON_HEIGHT, 0, 200],
          outputRange: [-POKEMON_HEIGHT, 0, 50],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const backgroundColor = useMemo(() => 
    getColorByPokemonType(pokemon.types[0].type.name),
  [pokemon.types]);

  return (
    <SafeAreaView style={{backgroundColor: backgroundColor, flex:1}}>
      <StatusBar backgroundColor='transparent' translucent />
      <Container>
        <Content>
          <Header pokemon={pokemon} translateY={translateY} />
          <InfoTable pokemon={pokemon} translateY={translateY} />

          <PanGestureHandler
            onGestureEvent={animatedEvent}
            onHandlerStateChange={onHandlerStateChanged}
          >
            <DetailsContainer style={detailsStyle}>
              <Details pokemon={pokemon} translateY={translateY} />
            </DetailsContainer>
          </PanGestureHandler>
        </Content>
      </Container>
    </SafeAreaView>
  );
};

export default Pokemon;