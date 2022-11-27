import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Shop} from '../../common_ui/shop/Shop';
import Map from './Map';
import {globalStyles} from '../../common/globalStyles';

const Stack = createStackNavigator();
const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Map"
        component={Map}
        listeners={({navigation, route}) => {
          const state = navigation.getState();
          if (state.index === 0) {
            navigation.getParent().setOptions({
              tabBarStyle: {
                ...globalStyles.tab_bar,
                ...globalStyles.shadow,
              },
            });
          }
        }}
      />
      <Stack.Screen name="Shop" component={Shop} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
