import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import OtherMypage from '.OtherMypage';
import {globalStyles} from '../../common/globalStyles';
import {Platform, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FeedDetail from '../../screens/mypage/mypage/FeedDetail';

const Stack = createStackNavigator();
const StackNavigation = () => {
  return (
    <View
      style={{flex: 1, backgroundColor: '#fff'}}
      edges={Platform.OS === 'ios' ? 'top' : null}>
      <Stack.Navigator
        initialRouteName="FeedStackNavigation"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="OtherMypage" component={OtherMypage} />
        <Stack.Screen
          name="FeedDetail"
          component={FeedDetail}
          // listeners={({navigation, route}) => {
          //   navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});
          // }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default StackNavigation;
