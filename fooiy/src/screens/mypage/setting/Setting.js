import React, {useEffect, useState} from 'react';
import {
  Image,
  Keyboard,
  SafeAreaView,
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
import {fooiyColor} from '../../../common/globalStyles';
import {ApiMangerV1} from '../../../common/api/v1/ApiMangerV1';
import {apiUrl} from '../../../common/Enums';
import {useDispatch, useSelector} from 'react-redux';
import {userInfoAction} from '../../../redux/actions/userInfoAction';
import {useNavigation} from '@react-navigation/native';

const Setting = props => {
  props.navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});
  const navigation = useNavigation();
  const userInfo = props.route.params.info;
  const dispatch = useDispatch();

  const {profile_image, nickname, introduction, fooiyti} = userInfo;

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
  const [curIntro, setCurIntro] = useState(introduction);
  const [curProfileImg, setCurProfileImg] = useState(profile_image);
  const [curNickName, setCurNickName] = useState(nickname);

  const editIntro = async () => {
    await ApiMangerV1.patch(apiUrl.PROFILE_EDIT, {
      introduction: curIntro === '' ? ' ' : curIntro,
    }).then(res => {
      dispatch(userInfoAction.editIntro(res.data.payload.account_info));
    });
  };

  const userInfoRedux = useSelector(state => state.userInfo.value);

  useEffect(() => {
    'introduction' in userInfoRedux
      ? setCurIntro(userInfoRedux.introduction)
      : setCurIntro(userInfo.introduction);
  }, [userInfo.introduction, userInfoRedux]);

  useEffect(() => {
    'profile_image' in userInfoRedux
      ? setCurProfileImg(userInfoRedux.profile_image)
      : setCurProfileImg(userInfo.profile_image);
  }, [userInfo.profile_image, userInfoRedux]);

  useEffect(() => {
    'nickname' in userInfoRedux
      ? setCurNickName(userInfoRedux.nickname)
      : setCurNickName(userInfo.nickname);
  }, [userInfo.nickname, userInfoRedux]);

  const onPressWithdraw = () => {
    navigation.navigate('Withdraw');
  };

  const onIntroFocus = () => {
    setIsFocused(true);
  };

  const onIntroBlur = () => {
    setIsFocused(false);
    if (introduction !== curIntro) {
      editIntro();
    }
  };

  const onImgPress = () => {
    navigation.navigate('ProfileImg');
  };

  const onItemPress = navi => {
    navigation.navigate(navi, {
      info: userInfo,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          height: globalVariable.height,
          backgroundColor: '#FFF',
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
                  uri: curProfileImg,
                }}
                style={styles.profileImage}
              />
              <Camera_Profile style={styles.cameraIcon} />
            </TouchableOpacity>
            <View>
              <Text style={styles.nickName}>{curNickName}</Text>
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
                  activeOpacity={0.8}
                  onPress={() =>
                    elem.navigation ? onItemPress(elem.navigation) : null
                  }>
                  <View key={index} style={styles.setting}>
                    <View>
                      <Text>{elem.text}</Text>
                    </View>
                    <View style={styles.rightCol}>
                      <View>
                        {elem.text === '푸이티아이' ? (
                          <Text style={styles.rightFooiyti}>{fooiyti}</Text>
                        ) : elem.text === '닉네임 변경' ? (
                          <Text style={styles.rightNickname}>
                            {curNickName}
                          </Text>
                        ) : null}
                      </View>
                      <View>
                        {elem.text === '마케팅 수신 알림' ? (
                          <ToggleOn />
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
          <TouchableOpacity activeOpacity={0.8}>
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
      </View>
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
    color: fooiyColor.G400,
    fontSize: 16,
    fontWeight: '600',
    padding: 16,
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
  rightCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightFooiyti: {
    color: fooiyColor.P500,
    fontWeight: '400',
    fontSize: 14,
    marginRight: 8,
  },
  rightNickname: {
    fontSize: 14,
    fontWeight: '400',
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
    color: fooiyColor.G600,
    fontWeight: '600',
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
