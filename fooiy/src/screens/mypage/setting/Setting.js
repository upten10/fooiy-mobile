import React, {useState} from 'react';
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
import {ArrowIcon, Pencil} from '../../../../assets/icons/svg';
import FooiySwitch from './MktSwitch';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import {globalVariable} from '../../../common/globalVariable';
import {fooiyColor} from '../../../common/globalStyles';

const Setting = props => {
  props.navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});
  const accountInfo = props.route.params.info;

  const {profile_image, nickname, introduction, fooiyti, is_mkt_agree} =
    accountInfo;

  const settingArr = [
    {text: '푸이티아이', info: fooiyti, navigation: ''},
    {text: '닉네임 변경', info: nickname, navigation: ''},
    {text: '서비스 이용약관', navigation: ''},
    {text: '위치기반 이용약관', navigation: ''},
    {text: '개인정보 수집 및 이용', navigation: ''},
    {text: '마케팅 수신 알림', navigation: ''},
  ];

  const [isFocused, setIsFocused] = useState(false);

  const onIntroFocus = () => {
    setIsFocused(true);
  };

  const onIntroBlur = () => {
    setIsFocused(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          height: globalVariable.height,
          backgroundColor: '#FFF',
        }}>
        <StackHeader title="설정" />
        <View style={styles.container}>
          {/* 프로필 사진 및 이름 */}
          <View style={styles.profileRowContainer}>
            <View>
              <Image
                source={{
                  uri: profile_image,
                }}
                style={styles.profileImage}
              />
            </View>
            <View>
              <Text style={styles.nickName}>{nickname}</Text>
            </View>
          </View>
          {/* 소개 */}
          <View style={styles.introContainer}>
            <TextInput
              maxLength={20}
              placeholder="인사말을 입력해주세요."
              style={
                isFocused ? [styles.intro, styles.introFocus] : styles.intro
              }
              onFocus={onIntroFocus}
              onBlur={onIntroBlur}>
              {introduction}
            </TextInput>
            <Pencil
              style={isFocused ? styles.pencilFocus : styles.pencilBlur}
            />
          </View>
          {/* 설정창 */}
          <View style={styles.settingsContainer}>
            {settingArr.map((elem, index) => {
              return (
                <View key={index} style={styles.setting}>
                  <View>
                    <Text>{elem.text}</Text>
                  </View>
                  <View style={styles.rightCol}>
                    <View>
                      {elem.text === '푸이티아이' ? (
                        <Text style={styles.rightFooiyti}>{elem.info}</Text>
                      ) : elem.text === '닉네임 변경' ? (
                        <Text style={styles.rightNickname}>{elem.info}</Text>
                      ) : null}
                    </View>
                    <View>
                      {elem.text === '마케팅 수신 알림' ? (
                        <FooiySwitch isMktAgree={is_mkt_agree} />
                      ) : (
                        <ArrowIcon />
                      )}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
          {/* 로그아웃 */}
          <TouchableOpacity>
            <View style={styles.logoutContainer}>
              <Text style={styles.logoutText}>로그아웃</Text>
            </View>
          </TouchableOpacity>
          {/* 회원탈퇴 및 버전 정보 */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>회원 탈퇴</Text>
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
  },
  profileRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  profileImage: {
    width: 72,
    height: 72,
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    borderRadius: 24,
    marginRight: 16,
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
