import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Notification from '../common_ui/Notification';
import Search from '../common_ui/Search/Search';
import FindWay from '../common_ui/shop/FindWay';
import Menu from '../common_ui/shop/Menu';
import MenuReport from '../common_ui/shop/MenuReport';
import Shop from '../common_ui/shop/Shop';
import Feed from '../screens/feed/Feed';
import FeedComment from '../screens/feed/FeedComment';
import ModifyFeed from '../screens/feed/ModifyFeed';
import Login from '../screens/Login/Login';
import Map from '../screens/map/Map';
import MenuClinic from '../screens/menu_clinic/MenuClinic';
import MenuClinicFindShop from '../screens/menu_clinic/MenuClinicFindShop';
import MypageMap from '../screens/mypage/mypage_map/MypageMap';
import FooiyTI from '../screens/mypage/setting/FooiyTI';
import OtherUserFeedDetail from '../screens/mypage/storage/OtherUserFeedDetail';
import OtherUserPage from '../screens/mypage/storage/OtherUserPage';
import ImageCrop from '../screens/register/camera/ImageCrop';
import RegisterCamera from '../screens/register/camera/RegisterCamera';
import Gallery from '../screens/register/gallery/Gallery';
import Register from '../screens/register/Register';
import FindMenu from '../screens/register/register_feed/FindMenu';
import FindShop from '../screens/register/register_feed/FindShop';
import RegisterFeed from '../screens/register/register_feed/register_feed_ui/RegisterFeed';
import SetAddress from '../screens/register/register_feed/SetAddress';
import Share from './Share';
import TabNavigator from './TabNavigator';
import FooiytiTestStackNavigation from '../screens/FooiytiTest/FooiytiTestStackNavigation';
import FooiytiTestHome from '../screens/FooiytiTest/FooiytiTestHome';
import InformationInput from '../screens/FooiytiTest/InformationInput';
import FooiytiTest from '../screens/FooiytiTest/FooiytiTest';
import FooiytiTestResultLoading from '../screens/FooiytiTest/FooiytiTestResultLoading';

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
      <Stack.Screen name="MenuClinic" component={MenuClinic} />
      <Stack.Screen name="MenuClinicFindShop" component={MenuClinicFindShop} />
      <Stack.Screen name="MenuReport" component={MenuReport} />

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
      {/* <Stack.Screen name="FooiyTI" component={FooiyTI} /> */}
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
      <Stack.Screen name="Notification" component={Notification} />

      {/* <Stack.Screen
        name="FooiytiTestStackNavigation"
        component={FooiytiTestStackNavigation}
      /> */}
      <Stack.Screen name="FooiytiTestHome" component={FooiytiTestHome} />
      <Stack.Screen name="InformationInput" component={InformationInput} />
      <Stack.Screen name="FooiytiTest" component={FooiytiTest} />
      <Stack.Screen
        name="FooiytiTestResultLoading"
        component={FooiytiTestResultLoading}
      />
      <Stack.Screen name="FooiytiTestResult" component={FooiyTI} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
