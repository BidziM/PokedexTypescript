import React, { useState, useContext, useEffect } from 'react'
import { Container, Input , Content} from './styles';
import { AntDesign } from '@expo/vector-icons'; 
import { AppContext } from '../../context/AppContext';

export default React.memo(function Login() {
    const [pokemonName, setPokemonName] = useState<string>('')
    const { setSearch } = useContext(AppContext)

    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        setSearch(pokemonName)
      }, 500)
  
      return () => clearTimeout(delayDebounceFn)
    },[pokemonName])
    
  return (
    <Container>
      <Content>
        <AntDesign name="search1" size={24} color="gray" />
        <Input 
          onChangeText={(item) => setPokemonName(item)}
          value={pokemonName}
          placeholder="Type pokemon name"
        />
      </Content>
    </Container>
  )
})
