import React, { PropsWithChildren, FC } from 'react';
import { Container, Content } from './styles';

type CustomProps = {
  children: PropsWithChildren<unknown>,
  style?: {}
};

const Header: FC<CustomProps> = ( { children, style }: CustomProps) => {
  return (
    <Container>
      <Content style={style}>{children}</Content>
    </Container>
  );
};

export default Header;