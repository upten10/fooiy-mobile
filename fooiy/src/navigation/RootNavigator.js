import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Share from './Share';
import Login from '../screens/Login/Login';
import TabNavigator from './TabNavigator';
import Feed from '../screens/feed/Feed';
import Mypage from '../screens/mypage/mypage/Mypage';
import FooiyTI from '../screens/mypage/setting/FooiyTI';
import Register from '../screens/register/Register';
import RegisterCamera from '../screens/register/camera/RegisterCamera';
import ImageCrop from '../screens/register/camera/ImageCrop';
import Gallery from '../screens/register/gallery/Gallery';
import {useNavigation} from '@react-navigation/native';
import Map from '../screens/map/Map';
import Setting from '../screens/mypage/setting/Setting';
import MypageMap from '../screens/mypage/mypage_map/MypageMap';
import {Shop} from '../common_ui/shop/Shop';

const Stack = createStackNavigator();
const RootNavigator = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen name="Share" component={Share} />

      <Stack.Screen name="Map" component={Map} />

      {/* feed */}
      <Stack.Screen name="Feed" component={Feed} />

      {/* mypage */}
      <Stack.Screen name="Mypage" component={Mypage} />
      <Stack.Screen name="FooiyTI" component={FooiyTI} />
      <Stack.Screen name="Setting" component={Setting} />

      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="RegisterCamera" component={RegisterCamera} />
      <Stack.Screen name="ImageCrop" component={ImageCrop} />

      <Stack.Screen name="Gallery" component={Gallery} />

      <Stack.Screen name="MypageMap" component={MypageMap} />

      {/* 지도에서 피드로 들어갔다가 뒤로 가면 피드 스택으로 넘어가서 바꿨어용~ */}
      <Stack.Screen name="Shop" component={Shop} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
