import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import {useSelector} from 'react-redux';
import {globalStyles} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import Party from './Party';
import PartyCreate from './PartyCreate/PartyCreate';
import PartyCreateFinishScreen from './PartyCreate/PartyCreateFinishScreen';
import PartyProfile from './PartyProfile/PartyProfile';

const PartyStack = createStackNavigator();

const PartyStackNavigation = props => {
  const insets = useSelector(state => state.insets.insets);

  return (
    <PartyStack.Navigator
      initialRouteName="Party"
      screenOptions={{headerShown: false}}>
      <PartyStack.Screen
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
      {/* 파티 생성 */}
      <PartyStack.Screen
        name="PartyCreateName"
        component={PartyCreate}
        listeners={({navigation, route}) => {
          navigation.getParent().setOptions({
            tabBarStyle: {display: 'none'},
          });
        }}
      />
      <PartyStack.Screen
        name="PartyCreateIntro"
        component={PartyCreate}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
        listeners={({navigation, route}) => {
          navigation.getParent().setOptions({
            tabBarStyle: {display: 'none'},
          });
        }}
      />
      <PartyStack.Screen
        name="PartyCreateImg"
        component={PartyCreate}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
        listeners={({navigation, route}) => {
          navigation.getParent().setOptions({
            tabBarStyle: {display: 'none'},
          });
        }}
      />
      <PartyStack.Screen
        name="PartyCreateFinishScreen"
        component={PartyCreateFinishScreen}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
        listeners={({navigation, route}) => {
          navigation.getParent().setOptions({
            tabBarStyle: {display: 'none'},
          });
        }}
      />
      {/* 파티 프로필 */}
      <PartyStack.Screen
        name="PartyProfile"
        component={PartyProfile}
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
    </PartyStack.Navigator>
  );
};

export default PartyStackNavigation;
