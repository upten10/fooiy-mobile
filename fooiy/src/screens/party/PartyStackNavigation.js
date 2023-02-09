import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import {useSelector} from 'react-redux';
import {globalStyles} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import MypageFeedDetail from '../mypage/mypage/MypageFeedDetail';
import Party from './Party';
import PartyCreate from './PartyCreate/PartyCreate';
import PartyCreateFinishScreen from './PartyCreate/PartyCreateFinishScreen';
import PartyMemberList from './PartyProfile/PartyMemberList';
import PartyProfile from './PartyProfile/PartyProfile';
import OtherUserPage from '../mypage/storage/OtherUserPage';
import PartySetting from './PartySetting/PartySetting';
import PartySearch from '../../common_ui/Search/PartySearch';
import PartyConfirm from './PartySetting/PartyConfirm';
import MypageMap from '../mypage/mypage_map/MypageMap';
import EditName from '../mypage/setting/EditName';

const PartyStack = createStackNavigator();

const PartyStackNavigation = props => {
  const insets = useSelector(state => state.insets.insets);

  return (
    <PartyStack.Navigator
      initialRouteName="Party"
      screenOptions={{headerShown: false}}>
      <PartyStack.Screen
        name="Party"
        component={Party}
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
      {/* 파티 생성 */}
      <PartyStack.Screen
        name="PartyCreateName"
        component={PartyCreate}
        listeners={({navigation, route}) => {
          navigation.getParent().setOptions({
            tabBarStyle: {display: 'none'},
          });
        }}
      />
      <PartyStack.Screen
        name="PartyCreateIntro"
        component={PartyCreate}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
        listeners={({navigation, route}) => {
          navigation.getParent().setOptions({
            tabBarStyle: {display: 'none'},
          });
        }}
      />
      <PartyStack.Screen
        name="PartyCreateImg"
        component={PartyCreate}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
        listeners={({navigation, route}) => {
          navigation.getParent().setOptions({
            tabBarStyle: {display: 'none'},
          });
        }}
      />
      <PartyStack.Screen
        name="PartyCreateFinishScreen"
        component={PartyCreateFinishScreen}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
        listeners={({navigation, route}) => {
          navigation.getParent().setOptions({
            tabBarStyle: {display: 'none'},
          });
        }}
      />
      {/* 파티 프로필 */}
      <PartyStack.Screen
        name="PartyProfile"
        component={PartyProfile}
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
      {/* 파티 피드 디테일 */}
      <PartyStack.Screen
        name="PartyFeedDetail"
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
      {/* 파티원 리스트 */}
      <PartyStack.Screen
        name="PartyMemberList"
        component={PartyMemberList}
        listeners={({navigation, route}) => {
          navigation.getParent().setOptions({
            tabBarStyle: {display: 'none'},
          });
        }}
      />
      {/* 다른 유저 마이페이지 */}
      <PartyStack.Screen
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
      {/* 파티 설정 */}
      <PartyStack.Screen
        name="PartySetting"
        component={PartySetting}
        listeners={({navigation, route}) => {
          navigation.getParent().setOptions({
            tabBarStyle: {display: 'none'},
          });
        }}
      />
      {/* 파티 이름 변경 */}
      <PartyStack.Screen
        name="PartyEditName"
        component={EditName}
        listeners={({navigation, route}) => {
          navigation.getParent().setOptions({
            tabBarStyle: {display: 'none'},
          });
        }}
      />
      {/* 파티 설정 가입 신청 목록 */}
      <PartyStack.Screen
        name="PartyConfirm"
        component={PartyConfirm}
        listeners={({navigation, route}) => {
          navigation.getParent().setOptions({
            tabBarStyle: {display: 'none'},
          });
        }}
      />
      {/* 파티 검색 */}
      <PartyStack.Screen
        name="PartySearch"
        component={PartySearch}
        listeners={({navigation, route}) => {
          navigation.getParent().setOptions({
            tabBarStyle: {display: 'none'},
          });
        }}
      />
      {/* 파티 지도 */}
      <PartyStack.Screen
        name="PartyMap"
        component={MypageMap}
        listeners={({navigation, route}) => {
          navigation.getParent().setOptions({
            tabBarStyle: {display: 'none'},
          });
        }}
      />
    </PartyStack.Navigator>
  );
};

export default PartyStackNavigation;
