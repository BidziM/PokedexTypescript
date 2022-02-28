import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native';


export const Input = styled(TextInput)`
    margin-left:12px;
`

export const Container = styled.SafeAreaView`
    align-items:center;
`;

export const Content = styled.View`
  display:flex;
  flex-direction:row;
  align-items:center;
  height: 52px;
  padding: 0 24px;
  width:90%;
  background:#ededed;
  border-radius: 50px;
`
