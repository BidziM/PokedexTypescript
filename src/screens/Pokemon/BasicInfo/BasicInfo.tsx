import React, { useEffect, useMemo, useCallback } from "react";
import { Animated, Easing } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "@react-navigation/native";

import Text from "../../../components/Text/text";
import Pokemon from "../../../ts/interfaces/PokemonInterface";
import displeyPokemonId from "../../../utilites/displayPokemonId";
import { PokemonTypeList } from '../../../components/PokemonTile/styles'
import GetPokemonTypeIcon from "../../../components/TypeIcons/type";

import {
  Container,
  Header,
  Row,
  PokemonImageContainer,
  PokemonImage,
} from "./styles";

type SummaryProps = {
  translateY: Animated.Value;
  pokemon: Pokemon;
};

const BasicInfo = ({ pokemon, translateY }: SummaryProps) => {
  const translateXNumber = useMemo(() => new Animated.Value(100), []);
  const translateXGenera = useMemo(() => new Animated.Value(200), []);
  const POKEMON_SUMMARY_HEIGHT = 360;
  const pokemonId = displeyPokemonId(pokemon.id);
  const pokemonName = pokemon.name.charAt(0).toLocaleUpperCase() + pokemon.name.slice(1);

  const navigation = useNavigation();
  const handleNavigateToType = useCallback((type: string) => {
    navigation.navigate(
      "Type" as never,
      {
        TypeName:type,
      } as never
    );
  }, [navigation, pokemon.types]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateXNumber, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),

      Animated.timing(translateXGenera, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.quad),
      }),
    ]).start();
  }, [translateXNumber, translateXGenera]);

  const pokedexNumberStyle = {
    transform: [
      {
        translateX: translateXNumber.interpolate({
          inputRange: [0, 100],
          outputRange: [0, 100],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  const summaryStyle = {
    zIndex: translateY.interpolate({
      inputRange: [-POKEMON_SUMMARY_HEIGHT, 0],
      outputRange: [-1, 2],
      extrapolate: "clamp",
    }),
    opacity: translateY.interpolate({
      inputRange: [-200, 0],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
  };

  const pokemonImageContainerStyle = {
    opacity: translateY.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
    transform: [
      {
        translateY: translateY.interpolate({
          inputRange: [-100, 0, 200],
          outputRange: [-20, 0, 25],
          extrapolate: "clamp",
        }),
      },
      {
        scale: translateY.interpolate({
          inputRange: [-100, 0, 200],
          outputRange: [0.9, 1, 1.1],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  return (
    <Container style={summaryStyle}>
      <Header>
        <Row>
        <Animated.View style={pokedexNumberStyle}>
            <Text variant="title" color="white">
              {pokemonName}
            </Text>
        </Animated.View>
          <Animated.View style={pokedexNumberStyle}>
            <Text variant="body2" color="white" bold>
              {pokemonId}
            </Text>
          </Animated.View>
        </Row>

        <Row style={{ marginTop: 16 }}></Row>
        
        <Row>
          <PokemonTypeList
              columnWrapperStyle={{justifyContent: 'space-between'}}
              data={pokemon.types}
              numColumns={2}
              contentContainerStyle={{ paddingHorizontal: 24 }}
              listKey={pokemon.name}
              keyExtractor={({ type }) => type.name}
              renderItem={({ item: { type } }) => {
                return (
                  <TouchableOpacity onPress={() => handleNavigateToType(type.name)}>
                    <GetPokemonTypeIcon typeName={type.name} />
                  </TouchableOpacity>
                )
              }}
            />
        </Row>
      </Header>

      <PokemonImageContainer style={pokemonImageContainerStyle}>
        <SharedElement id={`${pokemon.id}.image`}>
          <PokemonImage uri={pokemon.sprites.front_default} />
        </SharedElement>
      </PokemonImageContainer>
    </Container>
  );
};

export default BasicInfo;
