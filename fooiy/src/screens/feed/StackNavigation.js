import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useSelector} from 'react-redux';
import {globalStyles} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import Search from '../../common_ui/Search/Search';
import Shop from '../../common_ui/shop/Shop';
import MypageFeedDetail from '../mypage/mypage/MypageFeedDetail';
import OtherUserFeedDetail from '../mypage/storage/OtherUserFeedDetail';
import OtherUserPage from '../mypage/storage/OtherUserPage';
import Register from '../register/Register';
import Feed from './Feed';

const Stack = createStackNavigator();
const StackNavigation = () => {
  const insets = useSelector(state => state.insets.insets);
  return (
    <Stack.Navigator
      initialRouteName="Feed"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={{
          gestureEnabled: false,
        }}
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
      <Stack.Screen
        name="OtherUserPage"
        component={OtherUserPage}
        listeners={({navigation, route}) => {
          navigation.getParent().setOptions({
            tabBarStyle: {
              height: globalVariable.tabBarHeight + insets.bottom,
              ...globalStyles.tab_bar,
              ...globalStyles.shadow,
            },
          });
        }}
      />
      <Stack.Screen
        name="OtherUserFeedDetail"
        component={OtherUserFeedDetail}
        listeners={({navigation, route}) => {
          navigation.getParent().setOptions({
            tabBarStyle: {
              height: globalVariable.tabBarHeight + insets.bottom,
              ...globalStyles.tab_bar,
              ...globalStyles.shadow,
            },
          });
        }}
      />
      <Stack.Screen
        name="FeedDetail"
        component={MypageFeedDetail}
        listeners={({navigation, route}) => {
          navigation.getParent().setOptions({
            tabBarStyle: {
              height: globalVariable.tabBarHeight + insets.bottom,
              ...globalStyles.tab_bar,
              ...globalStyles.shadow,
            },
          });
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        listeners={({navigation, route}) => {
          const state = navigation.getState();
          navigation.getParent().setOptions({
            tabBarStyle: {
              height: globalVariable.tabBarHeight + insets.bottom,
              ...globalStyles.tab_bar,
              ...globalStyles.shadow,
            },
          });
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        listeners={({navigation, route}) => {
          navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
