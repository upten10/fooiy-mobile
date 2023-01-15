import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Feed from './Feed';
import {Shop} from '../../common_ui/shop/Shop';
import Profile from '../../common_ui/profile/Profile';
import {globalStyles} from '../../common/globalStyles';
import {Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FeedDetail from '../mypage/FeedDetail';

const Stack = createStackNavigator();
const StackNavigation = () => {
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#fff'}}
      edges={Platform.OS === 'ios' ? 'top' : null}>
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
        <Stack.Screen
          name="Profile"
          component={Profile}
          listeners={({navigation, route}) => {
            navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});
          }}
        />
        <Stack.Screen
          name="FeedDetail"
          component={FeedDetail}
          listeners={({navigation, route}) => {
            navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});
          }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default StackNavigation;
