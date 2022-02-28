import React, { useCallback, useMemo } from "react";
import { Container, Button, PokemonImage, PokemonTypeList } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";
import getPokemonTypeColor from "../../utilites/getPokemonTypeColor";
import displeyPokemonId from "../../utilites/displayPokemonId";
import GetPokemonTypeIcon from "../TypeIcons/type";
import Pokemon from "../../ts/interfaces/PokemonInterface";
import Text from "../Text/text";

interface PokemonCardProps {
  pokemon: Pokemon;
  newRowCard: boolean;
  isRightCard: boolean;
}

export default function PokemonTile({
  pokemon,
  newRowCard,
  isRightCard,
}: PokemonCardProps) {

  const navigation = useNavigation();
  const pokemonName = pokemon.name.charAt(0).toLocaleUpperCase() + pokemon.name.slice(1)

  const handleNavigateToPokemon = useCallback(() => {
    navigation.navigate(
      "Pokemon" as never,
      {
        pokemon,
      } as never
    );
  }, [navigation, pokemon]);


  
  const backgroundColor = useMemo(
    () => getPokemonTypeColor(pokemon.types[0].type.name),
    [pokemon.types[0]]
  );

  const pokemonNumberId = useMemo(
    () => displeyPokemonId(pokemon.id),
    [pokemon.id]
  );

  return (
    <Container key={pokemon.name}>
      <Button
        newRowCard={newRowCard}
        isRightCard={isRightCard}
        style={{
          backgroundColor,
        }}
        onPress={handleNavigateToPokemon}
      >
        <Text variant="body1" color="lightblack">
          {pokemonNumberId}
        </Text>

        <SharedElement 
        id={`${pokemon.id}.image`}
        style={{
          alignItems: "flex-start",
          flexDirection: "row",
          justifyContent: "center",
        }}
        >
          <PokemonImage uri={pokemon.sprites.front_default} />
        </SharedElement>
        <Text style={{textAlign:"center"}}
          color="white"
        >
          {pokemonName}
        </Text>
        <PokemonTypeList
          data={pokemon.types}
          numColumns={2}
          columnWrapperStyle={{display:'flex', justifyContent:"space-between"}}
          contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 24 }}
          listKey={pokemon.name}
          keyExtractor={({ type }) => type.name}
          renderItem={({ item: { type } }) => {
            return (
              <GetPokemonTypeIcon typeName={type.name} />
            )
          }}
        />

      </Button>
    </Container>
  );
}
