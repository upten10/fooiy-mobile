import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Shop from '../../common_ui/shop/Shop';
import Map from './Map';
import {globalStyles} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();
const StackNavigation = () => {
  const insets = useSelector(state => state.insets.insets);
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
                height: globalVariable.tabBarHeight + insets.bottom,
                ...globalStyles.tab_bar,
                ...globalStyles.shadow,
              },
            });
          }
        }}
      />
      <Stack.Screen
        name="Shop"
        component={Shop}
        listeners={({navigation, route}) => {
          navigation.getParent().setOptions({
            tabBarStyle: {display: 'none'},
          });
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
