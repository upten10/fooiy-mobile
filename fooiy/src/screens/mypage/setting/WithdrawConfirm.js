import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {ApiManagerV2} from '../../../common/api/v2/ApiManagerV2';
import {apiUrl} from '../../../common/Enums';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {loginActions} from '../../../redux/reducer/login';
import FooiyToast from '../../../common/FooiyToast';

const WithdrawConfirm = props => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {reason, userInfo} = props.route.params;

  const onPressCancel = () => {
    navigation.popToTop();
  };

  const goLogin = () => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 1500);
  };

  const onPressConfirm = async () => {
    await ApiManagerV2.delete(apiUrl.WITHDRAW, {
      params: {reason},
    })
      .then(res => {
        res.data.payload === 'success' &&
          dispatch(loginActions.setLogin(false));
        res.data.payload === 'success' && AsyncStorage.clear();
        res.data.payload === 'success' &&
          FooiyToast.message('탈퇴가 완료되면 로그인 페이지로 이동합니다.');
        res.data.payload === 'success' && goLogin();
      })
      .catch(e => FooiyToast.error());
  };

  return (
    <SafeAreaView
      style={{backgroundColor: fooiyColor.W, height: globalVariable.height}}>
      {/* Stack Header */}
      <StackHeader title="회원 탈퇴" />
      {/* Body */}
      <View style={BodyStyles(insets.top, insets.bottom).bodyContainer}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>탈퇴하시면{'\n'}되돌릴 수 없어요</Text>
        </View>
        {/* Subtitle */}
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleText}>
            푸이를 탈퇴하면 소중한 기록이 모두 사라져요.
          </Text>
        </View>
        {/* 경고 컨테이너 */}
        <View style={styles.noticeContainer}>
          {/* 경고 */}
          <View>
            {/* 경고 타이틀 */}
            <View style={styles.noticeTitleContainer}>
              <Text style={styles.noticeTitleText}>
                푸이와 함께한 소중한 추억
              </Text>
            </View>
            {/* 경고 내용 */}
            <View style={styles.noticeDetailContainer}>
              {/* 경고 내용 설명 */}
              <View>
                <Text style={styles.noticeDetailText}>
                  지금까지 기록한 피드
                </Text>
              </View>
              {/* 경고 내용 갯수 */}
              <View>
                <Text style={styles.noticeDetailRightText}>
                  {userInfo.userInfoRedux.feed_count}개 즉시소멸
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Button */}
        <View style={styles.btnsContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.btn, styles.cancelBtn]}
            onPress={onPressCancel}>
            <Text style={styles.cancelBtnText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.btn, styles.confirmBtn]}
            onPress={onPressConfirm}>
            <Text style={styles.confirmBtnText}>회원 탈퇴</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WithdrawConfirm;

const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: 8,
  },
  titleText: {
    ...fooiyFont.H3,
  },
  subtitleContainer: {
    marginBottom: 30,
  },
  subtitleText: {
    ...fooiyFont.Body1,
    color: fooiyColor.G600,
  },
  noticeTitleContainer: {
    marginBottom: 16,
  },
  noticeTitleText: {
    ...fooiyFont.Subtitle1,
    color: fooiyColor.G600,
  },
  noticeDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    borderRadius: 8,
  },
  noticeDetailText: {
    ...fooiyFont.Body1,
    color: fooiyColor.G600,
  },
  noticeDetailRightText: {
    ...fooiyFont.Subtitle2,
    color: fooiyColor.P500,
  },
  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: Platform.select({
      ios: 0,
      android: 16,
    }),
    marginBottom: 16,
    width: '100%',
  },
  btn: {
    width: (globalVariable.width - 39) / 2,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  cancelBtn: {
    backgroundColor: fooiyColor.P500,
    marginRight: 7,
  },
  confirmBtn: {
    backgroundColor: fooiyColor.W,
    borderWidth: 1,
    borderColor: fooiyColor.G200,
  },
  cancelBtnText: {
    ...fooiyFont.Button,
    color: fooiyColor.W,
    lineHeight: Platform.select({
      ios: 0,
      android: null,
    }),
  },
  confirmBtnText: {
    ...fooiyFont.Button,
    color: fooiyColor.G600,
    lineHeight: Platform.select({
      ios: 0,
      android: null,
    }),
  },
});

const BodyStyles = (topSafeAreaHeight, bottomSafeAreaHeight) =>
  StyleSheet.create({
    bodyContainer: {
      height:
        globalVariable.height - (topSafeAreaHeight + bottomSafeAreaHeight + 72),
      marginHorizontal: 16,
      marginTop: 16,
    },
  });
