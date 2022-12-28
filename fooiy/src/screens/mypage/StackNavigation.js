import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Mypage from './Mypage';
import FooiyTI from './FooiyTI';
import {globalStyles} from '../../common/globalStyles';

const Stack = createStackNavigator();
const MypageStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Mypage"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Mypage" component={Mypage} />
      <Stack.Screen name="FooiyTI" component={FooiyTI} />
    </Stack.Navigator>
  );
};

export default MypageStackNavigation;
