import React, {useEffect, useState} from 'react';
import {
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  ArrowIcon,
  Camera_Profile,
  Pencil,
  ToggleOn,
} from '../../../../assets/icons/svg';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import {globalVariable} from '../../../common/globalVariable';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../../common/Enums';
import {useDispatch, useSelector} from 'react-redux';
import {userInfoAction} from '../../../redux/actions/userInfoAction';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginActions} from '../../../redux/reducer/login';
import {SafeAreaView} from 'react-native-safe-area-context';
import MktSwitch from './MktSwitch';

const Setting = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfoRedux = useSelector(state => state.userInfo.value);

  const settingArr = [
    {text: '문의함', navigation: 'Suggestion'},
    {text: '푸이티아이', navigation: 'FooiyTI'},
    {text: '닉네임 변경', navigation: 'EditName'},
    {text: '서비스 이용약관', navigation: ''},
    {text: '위치기반 이용약관', navigation: ''},
    {text: '개인정보 수집 및 이용', navigation: ''},
    {text: '마케팅 수신 알림'},
  ];

  const [isFocused, setIsFocused] = useState(false);
  const [curIntro, setCurIntro] = useState(userInfoRedux.introduction);

  const editIntro = async () => {
    await ApiManagerV2.patch(apiUrl.PROFILE_EDIT, {
      introduction: curIntro === '' ? ' ' : curIntro,
    }).then(res => {
      dispatch(userInfoAction.edit(res.data.payload.account_info));
    });
  };

  const onPressWithdraw = () => {
    navigation.navigate('Withdraw');
  };

  const onIntroFocus = () => {
    setIsFocused(true);
  };

  const onIntroBlur = () => {
    setIsFocused(false);
    if (userInfoRedux.introduction !== curIntro) {
      editIntro();
    }
  };

  const onImgPress = () => {
    navigation.navigate('ProfileImg');
  };

  const onItemPress = navi => {
    navigation.navigate(navi);
  };

  const onPressLogout = async () => {
    await AsyncStorage.clear()
      .then(dispatch(loginActions.setLogin(false)))
      .then(navigation.navigate('Login'));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          height: globalVariable.height,
          backgroundColor: fooiyColor.W,
        }}>
        <StackHeader title="설정" />
        <View style={styles.container}>
          {/* 프로필 사진 및 이름 */}
          <View style={styles.profileRowContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onImgPress}
              style={styles.profileImageContainer}>
              <Image
                source={{
                  uri: userInfoRedux.profile_image,
                }}
                style={styles.profileImage}
              />
              <Camera_Profile style={styles.cameraIcon} />
            </TouchableOpacity>
            <View>
              <Text style={styles.nickName}>{userInfoRedux.nickname}</Text>
            </View>
          </View>
          {/* 소개 */}
          <View style={styles.introContainer}>
            <TextInput
              maxLength={100}
              placeholder="인사말을 입력해주세요."
              value={curIntro}
              onChangeText={setCurIntro}
              style={
                isFocused ? [styles.intro, styles.introFocus] : styles.intro
              }
              onFocus={onIntroFocus}
              onBlur={onIntroBlur}
            />
            <Pencil
              style={isFocused ? styles.pencilFocus : styles.pencilBlur}
            />
          </View>
          {/* 설정창 */}
          <View style={styles.settingsContainer}>
            {settingArr.map((elem, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() =>
                    elem.navigation ? onItemPress(elem.navigation) : null
                  }>
                  <View key={index} style={styles.setting}>
                    <View>
                      <Text style={styles.settingText}>{elem.text}</Text>
                    </View>
                    <View style={styles.rightCol}>
                      <View>
                        {elem.text === '푸이티아이' ? (
                          <Text style={styles.rightFooiyti}>
                            {userInfoRedux.fooiyti}
                          </Text>
                        ) : elem.text === '닉네임 변경' ? (
                          <Text style={styles.rightNickname}>
                            {userInfoRedux.nickname}
                          </Text>
                        ) : null}
                      </View>
                      <View>
                        {elem.text === '마케팅 수신 알림' ? (
                          <MktSwitch />
                        ) : (
                          <ArrowIcon />
                        )}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          {/* 로그아웃 */}
          <TouchableOpacity activeOpacity={0.8} onPress={onPressLogout}>
            <View style={styles.logoutContainer}>
              <Text style={styles.logoutText}>로그아웃</Text>
            </View>
          </TouchableOpacity>
          {/* 회원탈퇴 및 버전 정보 */}
          <View style={styles.footerContainer}>
            <TouchableOpacity activeOpacity={0.8} onPress={onPressWithdraw}>
              <Text style={styles.footerText}>회원 탈퇴</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}>버전 정보 0.0.1</Text>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    height: globalVariable.height,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  profileRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  profileImageContainer: {
    marginRight: 16,
  },
  profileImage: {
    width: 72,
    height: 72,
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    borderRadius: 24,
  },
  cameraIcon: {
    position: 'absolute',
    right: -4,
    bottom: -4,
  },
  nickName: {
    height: 24,
    fontSize: 18,
    fontWeight: '600',
    color: fooiyColor.B,
  },
  introContainer: {
    justifyContent: 'center',
    width: '100%',
    marginBottom: 16,
  },
  intro: {
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    borderRadius: 8,
    height: 56,
    padding: 16,
    paddingRight: 16 + 24,
    ...fooiyFont.Subtitle2,
    color: fooiyColor.G400,
    lineHeight: Platform.select({
      ios: 0,
      android: null,
    }),
  },
  introFocus: {
    borderColor: fooiyColor.G400,
    color: fooiyColor.B,
    fontWeight: '400',
  },
  pencilBlur: {
    opacity: 0,
    position: 'absolute',
    right: 0,
    margin: 16,
  },
  pencilFocus: {
    opacity: 1,
    position: 'absolute',
    right: 0,
    margin: 16,
  },
  settingsContainer: {
    marginBottom: 8,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  settingText: {
    ...fooiyFont.Subtitle3,
    color: fooiyColor.G600,
  },
  rightCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightFooiyti: {
    ...fooiyFont.Body2,
    color: fooiyColor.P500,
    marginRight: 8,
  },
  rightNickname: {
    ...fooiyFont.Body2,
    color: fooiyColor.G600,
  },
  logoutContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    borderRadius: 8,
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  logoutText: {
    ...fooiyFont.Button,
    color: fooiyColor.G600,
    lineHeight: Platform.select({
      ios: 0,
      android: null,
    }),
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 10,
    fontWeight: '600',
    color: fooiyColor.G400,
  },
});
