import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Feed from './Feed';
import {Shop} from '../../common_ui/shop/Shop';
import {globalStyles} from '../../common/globalStyles';
import MypageFeedDetail from '../mypage/mypage/MypageFeedDetail';
import OtherUserPage from '../mypage/storage/OtherUserPage';
import OtherUserFeedDetail from '../mypage/storage/OtherUserFeedDetail';

const Stack = createStackNavigator();
const StackNavigation = () => {
  return (
    // <SafeAreaView
    //   style={{flex: 1, backgroundColor: '#fff'}}
    //   edges={Platform.OS === 'ios' ? 'top' : null}>
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
      {/* <Stack.Screen
          name="Shop"
          component={Shop}
          listeners={({navigation, route}) => {
            navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});
          }}
        /> */}
      <Stack.Screen name="Shop" component={Shop} />
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
    </Stack.Navigator>
    // </SafeAreaView>
  );
};

export default StackNavigation;
