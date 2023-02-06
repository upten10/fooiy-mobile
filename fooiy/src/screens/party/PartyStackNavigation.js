import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useSelector} from 'react-redux';
import {globalStyles} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import Party from './Party';
import PartyCreate from './PartyCreate';

const Stack = createStackNavigator();
const PartyStackNavigation = props => {
  const insets = useSelector(state => state.insets.insets);
  return (
    <Stack.Navigator
      initialRouteName="Party"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Party"
        component={Party}
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
        name="PartyCreate"
        component={PartyCreate}
        listeners={({navigation, route}) => {
          navigation.getParent().setOptions({
            tabBarStyle: {display: 'none'},
          });
        }}
      />
    </Stack.Navigator>
  );
};

export default PartyStackNavigation;
