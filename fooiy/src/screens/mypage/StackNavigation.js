import React, {useCallback, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Mypage from './Mypage';
import FooiyTI from './setting/FooiyTI';
import Setting from './setting/Setting';
import ProfileImg from './setting/ProfileImg';
import EditName from './setting/EditName';
import {globalStyles} from '../../common/globalStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Platform, View} from 'react-native';
import Suggestion from './setting/Suggestion';
import Withdraw from './setting/Withdraw';
import WithdrawConfirm from './setting/WithdrawConfirm';
import FeedDetail from './FeedDetail';
import Storage from './storage/Storage';
import SettingStack from './setting/SettingStack';

const Stack = createStackNavigator();
const MypageStackNavigation = props => {
  const tabNavigation = props.navigation;

  const MypageStack = useCallback(() => {
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
                  ...globalStyles.tab_bar,
                  ...globalStyles.shadow,
                },
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
          name="SettingStack"
          component={SettingStack}
          listeners={({navigation, route}) => {
            navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});
          }}
        />
        <Stack.Screen name="FeedDetail" component={FeedDetail} />
        <Stack.Screen
          name="Storage"
          component={Storage}
          listeners={({navigation, route}) => {
            navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});
          }}
        />
      </Stack.Navigator>
    );
  }, []);
  if (tabNavigation.getState().type === 'tab') {
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#fff'}}
        edges={Platform.OS === 'ios' ? 'top' : null}>
        <MypageStack />
      </SafeAreaView>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MypageStack />
    </View>
  );
};

export default MypageStackNavigation;
