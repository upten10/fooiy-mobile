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
import TypingContent from '../screens/register/typing_content/TypingContent';
import {useNavigation} from '@react-navigation/native';
import Map from '../screens/map/Map';
import Setting from '../screens/mypage/setting/Setting';

const Stack = createStackNavigator();
const RootNavigator = () => {
  const navigation = useNavigation();
  console.log(navigation.getState());
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="Login" component={Login} />
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

      <Stack.Screen name="TypingContent" component={TypingContent} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
