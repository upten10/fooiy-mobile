import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainNavigator from './MainNavigator';
import {Shop} from '../common_ui/shop/Shop';
import Share from './Share';
import Login from '../screens/Login/Login';
import TabNavigator from './TabNavigator';
import {globalStyles} from '../../common/globalStyles';

const Stack = createStackNavigator();
const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Share" component={Share} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
