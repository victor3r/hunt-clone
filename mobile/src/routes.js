import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/main';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={options}>
        <Stack.Screen name="JSHunt" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const options = {
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: '#DA552f',
  },
  headerTintColor: '#FFF',
};

export default Routes;