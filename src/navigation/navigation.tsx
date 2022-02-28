import React, {useContext} from 'react';;
import { Route } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { AuthContext } from '../context/AuthContext'

import Home from '../screens/Home/Home';
import Pokemon, { RouteParams } from '../screens/Pokemon/Pokemon';
import Login from '../screens/Login/Login';
import Type, {TypeRouteParams} from '../screens/Types/Types'

const Stack = createSharedElementStackNavigator();
const Routes = () => {

  const { state } = useContext(AuthContext)
  const Roots = state.isLogin == false ? (
    <>
      <Stack.Screen name="SignIn" component={Login} />
    </>
    ) : (
    <>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Pokemon"
        component={Pokemon}
        options={{
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
        }}
        sharedElements={(route: Route<string, object | undefined>) => {
          const { pokemon } = route.params as RouteParams;
            const sharedArray = [
              {
                id: `${pokemon.id}.image`,
              },
              {
                id: `${pokemon.id}.name`,
              },
            ]
            pokemon.types.forEach(item => {
              return sharedArray.push({
                id: `${pokemon.id}.type.${item.type.url}`,
              });
            });

            return sharedArray;
        }}
      />
      <Stack.Screen
        name="Type"
        component={Type}
        sharedElements={(route: Route<string, object | undefined>) => {
          const { TypeName } = route.params as TypeRouteParams;
            const sharedArray = [
              {
                id: `${TypeName}.type`,
              },
            ]
            return sharedArray;
        }}
      />
    </>
  );

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}
    >
      {Roots}
    </Stack.Navigator>
  );
};


export default Routes;
