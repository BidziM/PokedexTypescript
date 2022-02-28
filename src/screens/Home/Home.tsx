import React, {useContext, useMemo} from 'react'
import { ListRenderItemInfo  } from 'react-native';
import { Container, PokemonList, Button, PokemonImage } from './styles';
import { AppContext } from '../../context/AppContext';
import { AuthContext } from '../../context/AuthContext';
import Pokemon from '../../ts/interfaces/PokemonInterface';
import PokemonTile from '../../components/PokemonTile/PokemonTile';
import Header from '../../components/Header/header';
import Text from '../../components/Text/text';
import Search from '../../components/Search/Search'
import SadPokemon from '../../../assets/pokemon.png'; 
import PokeballLoading from '../../components/Loading/Pokeball'

export default function Home() {
  const { pokemons, loading } = useContext(AppContext)
  const { dispatch } = useContext(AuthContext)
  const LogoutUser = () => {
    dispatch({type:"SIGN_OUT"})
  }
  return (
    <Container>
      <Header>
        <Text variant="title">Pokemons</Text>
        <Button onPress={LogoutUser}><Text variant="caption" color='white'>Logout</Text></Button>
      </Header>
      <Search/>
      {loading ? <PokeballLoading width={124} height={124} withRotate={true}/> : pokemons.length > 0 ?
        <PokemonList
          data={pokemons}
          numColumns={2}
          listKey={"pokemons"}
          updateCellsBatchingPeriod={200}
          maxToRenderPerBatch={10}
          initialNumToRender={10}
          columnWrapperStyle={{display:'flex'}}
          contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 20 }}
          keyExtractor={(pokemon: Pokemon) => pokemon.name}
          renderItem={({ item: pokemon, index }: ListRenderItemInfo<Pokemon>) => {
            return (
              <PokemonTile
                key={pokemon.name}
                pokemon={pokemon}
                newRowCard={!!(index + 2)}
                isRightCard={!!(index % 2)}
              />
            );
          }}
        />
      : (
        <>
        <PokemonImage source={SadPokemon} style={{alignSelf:"center"}}/>
        <Text variant="body1" style={{textAlign:"center"}}>Pokemon with this name doesn't exist in the pokedex</Text>
        </>
      )
      }

    </Container>

  )
}
