import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import FooiyTI from './FooiyTI';
import Setting from './Setting';
import ProfileImg from './ProfileImg';
import EditName from './EditName';
import Suggestion from './Suggestion';
import Withdraw from './Withdraw';
import WithdrawConfirm from './WithdrawConfirm';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();
const SettingStack = props => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="FooiyTI" component={FooiyTI} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default SettingStack;
