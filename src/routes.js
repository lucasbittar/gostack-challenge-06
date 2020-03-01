import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';
import Repository from './pages/Repository';

const Stack = createStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: '#7159c1',
  },
  headerTintColor: '#fff',
  headerBackTitleVisible: false,
};

function Routes() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Github Favorites" component={Main} />
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="Repository" component={Repository} />
    </Stack.Navigator>
  );
}

export default Routes;
