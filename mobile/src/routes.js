import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/main';
import Product from './pages/product';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={options}>
        <Stack.Screen
          name="JSHunt"
          component={Main}
        />
        <Stack.Screen
          name="Product"
          component={Product}
          options={({ route }) => ({ title: route.params.product.title })}
        />
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