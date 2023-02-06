import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useSelector} from 'react-redux';
import {globalStyles} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import Search from '../../common_ui/Search/Search';
import Shop from '../../common_ui/shop/Shop';
import Mypage from './mypage/Mypage';
import MypageFeedDetail from './mypage/MypageFeedDetail';
import EditName from './setting/EditName';
import ProfileImg from './setting/ProfileImg';
import Setting from './setting/Setting';
import Suggestion from './setting/Suggestion';
import Withdraw from './setting/Withdraw';
import WithdrawConfirm from './setting/WithdrawConfirm';
import OtherUserFeedDetail from './storage/OtherUserFeedDetail';
import OtherUserPage from './storage/OtherUserPage';
import Storage from './storage/Storage';
import StorageSingleFeed from './storage/StorageSingleFeed';

const Stack = createStackNavigator();
const MypageStackNavigation = props => {
  const insets = useSelector(state => state.insets.insets);
  return (
    <Stack.Navigator
      initialRouteName="Mypage"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Mypage"
        component={Mypage}
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
      <Stack.Screen name="StorageSingleFeed" component={StorageSingleFeed} />
      <Stack.Screen name="Storage" component={Storage} />
      <Stack.Screen
        name="Setting"
        component={Setting}
        listeners={({navigation, route}) => {
          navigation.getParent().setOptions({
            tabBarStyle: {display: 'none'},
          });
        }}
      />
      <Stack.Screen name="ProfileImg" component={ProfileImg} />
      <Stack.Screen name="EditName" component={EditName} />
      <Stack.Screen name="Suggestion" component={Suggestion} />
      <Stack.Screen name="Withdraw" component={Withdraw} />
      <Stack.Screen name="WithdrawConfirm" component={WithdrawConfirm} />
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
// return (
//   <View style={{flex: 1, backgroundColor: '#fff'}}>
//     <MypageStack />
//   </View>
// );

export default MypageStackNavigation;
