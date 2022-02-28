import React, {useState, useContext} from 'react'
import { Alert } from 'react-native';
import { Container, Input, Button } from './styles';
import Header from '../../components/Header/header';
import Text from '../../components/Text/text';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../../context/AuthContext'

export default function Login() {
    const { dispatch } = useContext(AuthContext)
    const [username, setUsername] = useState<string>('')
    const fakeToken = 'Fake token';

    const login = () => {
        if(username.length < 4){
            return Alert.alert('Username need at least 4 characters')
        }
        SecureStore.setItemAsync('token', fakeToken)
        SecureStore.setItemAsync('username', username)
        dispatch({type:"SIGN_IN", payload:{token:fakeToken, username:username}})
    }

  return (
    <Container>
      <Header style={{justifyContent:'center'}}>
        <Text variant="title">Login to Pokedex</Text>
      </Header>
      <Input 
        onChangeText={(item) => setUsername(item)}
        value={username}
        placeholder="Trainer Name"
        autoFocus={true}
      />
      <Button onPress={login}><Text variant="body2" color='white'>Login</Text></Button>
    </Container>
  )
}
