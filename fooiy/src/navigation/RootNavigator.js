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
import SetAddress from '../screens/register/register_feed/SetAddress';
import FindShop from '../screens/register/register_feed/FindShop';
import FindMenu from '../screens/register/register_feed/FindMenu';
import RegisterFeed from '../screens/register/register_feed/register_feed_ui/RegisterFeed';
import EditName from '../screens/mypage/setting/EditName';
import FindWay from '../common_ui/shop/FindWay';
import Menu from '../common_ui/shop/Menu';
import Shop from '../common_ui/shop/Shop';
import Search from '../common_ui/Search/Search';
import OtherUserPage from '../screens/mypage/storage/OtherUserPage';
import OtherUserFeedDetail from '../screens/mypage/storage/OtherUserFeedDetail';
import FeedComment from '../screens/feed/FeedComment';
import ModifyFeed from '../screens/feed/ModifyFeed';
import {globalVariable} from '../common/globalVariable';
import {globalStyles} from '../common/globalStyles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const insets = useSafeAreaInsets();
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

      {/* map */}
      <Stack.Screen name="Map" component={Map} />

      {/* feed */}
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="FeedComment" component={FeedComment} />
      <Stack.Screen name="ModifyFeed" component={ModifyFeed} />

      {/* shop */}
      <Stack.Screen name="FindWay" component={FindWay} />
      <Stack.Screen name="Menu" component={Menu} />

      {/* register */}
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="RegisterCamera" component={RegisterCamera} />
      <Stack.Screen name="ImageCrop" component={ImageCrop} />
      <Stack.Screen name="Gallery" component={Gallery} />
      <Stack.Screen name="SetAddress" component={SetAddress} />
      <Stack.Screen name="FindShop" component={FindShop} />
      <Stack.Screen name="FindMenu" component={FindMenu} />
      <Stack.Screen name="RegisterFeed" component={RegisterFeed} />

      {/* mypage */}
      {/* <Stack.Screen name="Mypage" component={Mypage} /> */}
      <Stack.Screen name="FooiyTI" component={FooiyTI} />
      {/* <Stack.Screen name="Setting" component={Setting} /> */}
      {/* <Stack.Screen name="EditName" component={EditName} /> */}
      <Stack.Screen name="MypageMap" component={MypageMap} />
      <Stack.Screen name="OtherUserPage" component={OtherUserPage} />
      <Stack.Screen
        name="OtherUserFeedDetail"
        component={OtherUserFeedDetail}
      />

      {/* 지도에서 피드로 들어갔다가 뒤로 가면 피드 스택으로 넘어가서 바꿨어용~ */}
      <Stack.Screen name="Shop" component={Shop} />

      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
