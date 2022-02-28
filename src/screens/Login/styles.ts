import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native';

export const Input = styled(TextInput)`
    border: #3275a8;
    padding: 4px;
`

export const Button =  styled(RectButton)`
    margin-top:16px;
    padding: 5px 25px;
    border-radius: 4px;
    background-color: #3275a8;
    align-items:center;
`
export const Header = styled.View`
  height: 62px;
  padding: 0 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Container = styled(SafeAreaView)`
  flex: 1;
  position: relative;
  padding: 0 24px;
`;
