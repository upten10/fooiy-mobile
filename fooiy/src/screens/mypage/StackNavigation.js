import React, {useCallback, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Mypage from './mypage/Mypage';
import {globalStyles} from '../../common/globalStyles';
import {View} from 'react-native';
import Storage from './storage/Storage';
import MypageFeedDetail from './mypage/MypageFeedDetail';
import StorageSingleFeed from './storage/StorageSingleFeed';
import OtherUserPage from './storage/OtherUserPage';
import OtherUserFeedDetail from './storage/OtherUserFeedDetail';
import {Shop} from '../../common_ui/shop/Shop';
import Suggestion from './setting/Suggestion';
import Setting from './setting/Setting';
import ProfileImg from './setting/ProfileImg';
import EditName from './setting/EditName';
import Withdraw from './setting/Withdraw';
import WithdrawConfirm from './setting/WithdrawConfirm';

const Stack = createStackNavigator();
const MypageStackNavigation = props => {
  const tabNavigation = props.navigation;

  const MypageStack = useCallback(() => {
    return (
      <Stack.Navigator
        initialRouteName="MypageStackNavigation"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Mypage"
          component={Mypage}
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
        <Stack.Screen
          name="OtherUserFeedDetail"
          component={OtherUserFeedDetail}
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
        <Stack.Screen name="FeedDetail" component={MypageFeedDetail} />
        <Stack.Screen name="StorageSingleFeed" component={StorageSingleFeed} />
        <Stack.Screen name="Storage" component={Storage} />
        <Stack.Screen
          name="Setting"
          component={Setting}
          listeners={({navigation, route}) => {
            navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});
          }}
        />
        <Stack.Screen name="ProfileImg" component={ProfileImg} />
        <Stack.Screen name="EditName" component={EditName} />
        <Stack.Screen name="Suggestion" component={Suggestion} />
        <Stack.Screen name="Withdraw" component={Withdraw} />
        <Stack.Screen name="WithdrawConfirm" component={WithdrawConfirm} />
      </Stack.Navigator>
    );
  }, []);

  // 혹시 몰라 남겨둠
  // if (tabNavigation.getState().type === 'tab') {
  //   return (
  //     <SafeAreaView
  //       style={{flex: 1, backgroundColor: '#fff'}}
  //       edges={Platform.OS === 'ios' ? 'top' : null}>
  //       <MypageStack />
  //     </SafeAreaView>
  //   );
  // }
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MypageStack />
    </View>
  );
};

export default MypageStackNavigation;
