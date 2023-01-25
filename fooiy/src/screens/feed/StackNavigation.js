import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Feed from './Feed';
import {globalStyles} from '../../common/globalStyles';
import MypageFeedDetail from '../mypage/mypage/MypageFeedDetail';
import OtherUserPage from '../mypage/storage/OtherUserPage';
import OtherUserFeedDetail from '../mypage/storage/OtherUserFeedDetail';
import Register from '../register/Register';

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
      <Stack.Screen
        name="OtherUserPage"
        component={OtherUserPage}
        listeners={({navigation, route}) => {
          const state = navigation.getState();
          navigation.setOptions({
            tabBarStyle: {...globalStyles.tab_bar, ...globalStyles.shadow},
          });
        }}
      />
      <Stack.Screen
        name="OtherUserFeedDetail"
        component={OtherUserFeedDetail}
      />
      <Stack.Screen
        name="FeedDetail"
        component={MypageFeedDetail}
        listeners={({navigation, route}) => {
          navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        listeners={({navigation, route}) => {
          const state = navigation.getState();
          navigation.getParent().setOptions({
            tabBarStyle: {...globalStyles.tab_bar, ...globalStyles.shadow},
          });
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
