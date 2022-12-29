import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Mypage from './Mypage';
import FooiyTI from './FooiyTI';
import Setting from './setting/Setting';
import {globalStyles} from '../../common/globalStyles';

const Stack = createStackNavigator();
const MypageStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Mypage"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Mypage"
        component={Mypage}
        listeners={({navigation, route}) => {
          const state = navigation.getState();
          if (state.index === 0) {
            navigation.getParent().setOptions({
              tabBarStyle: {...globalStyles.tab_bar, ...globalStyles.shadow},
            });
          }
        }}
      />
      <Stack.Screen name="FooiyTI" component={FooiyTI} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  );
};

export default MypageStackNavigation;
