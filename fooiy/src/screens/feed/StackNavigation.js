import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Feed from './Feed';
import {Shop} from '../../common_ui/shop/Shop';
import {globalStyles} from '../../common/globalStyles';

const Stack = createStackNavigator();
const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="FeedStackNavigation"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Feed"
        component={Feed}
        listeners={({navigation, route}) => {
          const state = navigation.getState();
          if (state.index === 0) {
            navigation.getParent().setOptions({
              tabBarStyle: {...globalStyles.tab_bar, ...globalStyles.shadow},
            });
          }
        }}
      />
      <Stack.Screen
        name="Shop"
        component={Shop}
        listeners={({navigation, route}) => {
          navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
