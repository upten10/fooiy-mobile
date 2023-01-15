import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainNavigator from './MainNavigator';
import {Shop} from '../common_ui/shop/Shop';
import Test from './Test';
import {DefaultHeader} from '../common_ui/headers/DefaultHeader';

const Stack = createStackNavigator();
const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainNavigator"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainNavigator" component={MainNavigator} />
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="Shop" component={Shop} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
