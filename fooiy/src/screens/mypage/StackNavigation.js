import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Mypage from './Mypage';
import FooiyTI from './FooiyTI';
import Setting from './setting/Setting';
import ProfileImg from './setting/ProfileImg';
import EditName from './setting/EditName';
import {globalStyles} from '../../common/globalStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Platform} from 'react-native';
import Suggestion from './setting/Suggestion';
import Withdraw from './setting/Withdraw';
import WithdrawConfirm from './setting/WithdrawConfirm';
import FeedDetail from './FeedDetail';
import Storage from './storage/Storage';
import Profile from '../../common_ui/profile/Profile';

const Stack = createStackNavigator();
const MypageStackNavigation = () => {
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#fff'}}
      edges={Platform.OS === 'ios' ? 'top' : null}>
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
                tabBarStyle: {...globalStyles.tab_bar, ...globalStyles.shadow},
              });
            }
          }}
        />
        <Stack.Screen
          name="FooiyTI"
          component={FooiyTI}
          listeners={({navigation, route}) => {
            navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});
          }}
        />
        <Stack.Screen
          name="Setting"
          component={Setting}
          listeners={({navigation, route}) => {
            navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});
          }}
        />
        <Stack.Screen
          name="ProfileImg"
          component={ProfileImg}
          listeners={({navigation, route}) => {
            navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});
          }}
        />
        <Stack.Screen name="EditName" component={EditName} />
        <Stack.Screen name="Suggestion" component={Suggestion} />
        <Stack.Screen name="Withdraw" component={Withdraw} />
        <Stack.Screen name="WithdrawConfirm" component={WithdrawConfirm} />
        <Stack.Screen
          name="FeedDetail"
          component={FeedDetail}
          listeners={({navigation, route}) => {
            navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});
          }}
        />
        <Stack.Screen
          name="Storage"
          component={Storage}
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
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default MypageStackNavigation;
