import React, {useState, useMemo, useEffect, useCallback} from 'react'
import { useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather as Icon } from '@expo/vector-icons';
import { Container, IconContainer, GoBackButton, PokemonImage, PokemonTypeList} from './styles';
import Text from '../../components/Text/text';
import {fetchType} from '../../api/fetchType'
import DescribeType from '../../ts/interfaces/Types'
import getPokemonTypeColor from '../../utilites/getPokemonTypeColor'
import GetPokemonTypeIcon from "../../components/TypeIcons/type";
import Header from '../../components/Header/header';
import PokeballLoading from '../../components/Loading/Pokeball'

export type TypeRouteParams = {
  TypeName: string;
};

export default function Login() {
  const route = useRoute();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { TypeName } = route.params as TypeRouteParams;
  const [typeData, setTypeData] = useState<DescribeType>()
  const [Loading, setLoading] = useState<Boolean>(true)
  
  useEffect(() => {
    fetchType(TypeName)
    .then((data) => setTypeData(data))
    .catch(err => console.log(err))
    .finally(() => {
      setLoading(false)
    })
  },[])

  const backgroundColor = useMemo(
    () => getPokemonTypeColor(TypeName),
    [TypeName]
  );

  const handleGoBack = useCallback(() => navigation.goBack(), [navigation]);
  
  return (
    <SafeAreaView style={{backgroundColor: backgroundColor, flex:1}}>
      <Header style={{height:24, paddingBottom:0}}>
        <GoBackButton onPress={handleGoBack}>
          <Icon name="arrow-left" color={colors.white} size={32} />
        </GoBackButton>
      </Header>
      <Container>
        <IconContainer>
            <GetPokemonTypeIcon typeName={TypeName} width={92}/>
            <Text style={{marginTop:12}} variant='title'>{TypeName.charAt(0).toLocaleUpperCase() + TypeName.slice(1)}</Text>
        </IconContainer>

        <Text variant='body1' style={{paddingTop:12}}>Some Related Pokemons</Text> 
        
        {Loading ? <PokeballLoading width={124} height={124} withRotate={true}/> : (typeData?.pokemon && typeData?.pokemon.length > 0) ? 
          <PokemonTypeList
          data={typeData?.pokemon}
          numColumns={3}
          columnWrapperStyle={{display:'flex', flex:1}}
          keyExtractor={({ name }) => name}
          renderItem={(pokemon) => {
            return (
              <PokemonImage uri={pokemon.item.sprites.front_default}/>
            )
          }}
        />
        :
        <Text>Hmmmm we cannot find any related pokemons</Text>
        }
      </Container>
    </SafeAreaView>
  )
}
