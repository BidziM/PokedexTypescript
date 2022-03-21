import React, { useCallback, useEffect, useMemo } from 'react';
import { Animated, Easing, RegisteredStyle, ViewStyle, SafeAreaView } from 'react-native';

import pokeballImage from '../../../assets/pokeball.png';
import Text from '../Text/text';

import { Container, PokeballImage } from './styles';

export type PokeballProps = {
  width: number;
  height: number;
  withRotate?: boolean;
  style?: RegisteredStyle<ViewStyle> | Animated.WithAnimatedObject<ViewStyle>;
};

const Pokeball = ({
  width,
  height,
  withRotate,
  style,
}: PokeballProps) => {
  const pokeballOpacity = useMemo(() => new Animated.Value(0), []);
  const rotate = useMemo(() => new Animated.Value(0), []);

  const rotatePokeball = () => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 360,
        duration: 4500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  useEffect(() => {
    Animated.timing(pokeballOpacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
        delay: 200,
        easing: Easing.inOut(Easing.quad),
      }).start();

      rotatePokeball();
  }, [pokeballOpacity, rotatePokeball, withRotate]);

  const pokeballStyle = {
    opacity: pokeballOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        rotate: rotate.interpolate({
          inputRange: [0, 365],
          outputRange: ['0deg', '365deg'],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <>
    <Container style={[withRotate && pokeballStyle, style]}>
      <PokeballImage
        source={pokeballImage}
        width={width}
        height={height}
      />
    </Container>
    <Text style={{textAlign:"center"}}>Loading...</Text>
    </>
  );
};

Pokeball.defaultProps = {
  widthRotate: false,
  style: {},
};

export default Pokeball;