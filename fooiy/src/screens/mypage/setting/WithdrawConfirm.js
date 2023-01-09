import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ApiMangerV1} from '../../../common/api/v1/ApiMangerV1';
import {apiUrl} from '../../../common/Enums';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {StackHeader} from '../../../common_ui/headers/StackHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {loginActions} from '../../../redux/reducer/login';

const WithdrawConfirm = props => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {reason} = props.route.params;

  const onPressCancel = () => {
    navigation.popToTop();
  };

  const onPressConfirm = async () => {
    await ApiMangerV1.delete(apiUrl.WITHDRAW, {
      params: {reason},
    })
      // .then(res => console.log(JSON.stringify(res)))
      .then(dispatch(loginActions.setLogin(false)))
      .then(navigation.popToTop());
    AsyncStorage.clear();
  };

  return (
    <View
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
              <Text style={styles.noticeTitleText}>자랑스러운 개척 타이틀</Text>
            </View>
            {/* 경고 내용 */}
            <View style={styles.noticeDetailContainer}>
              {/* 경고 내용 설명 */}
              <View>
                <Text style={styles.noticeDetailText}>
                  지금까지 모은 개척 타이틀
                </Text>
              </View>
              {/* 경고 내용 갯수 */}
              <View>
                <Text style={styles.noticeDetailRightText}>n개 즉시소멸</Text>
              </View>
            </View>
          </View>
          {/* 경고 */}
          <View>
            {/* 경고 타이틀 */}
            <View style={styles.noticeTitleContainer}>
              <Text style={styles.noticeTitleText}>
                푸이와 함께한 소중한 기록
              </Text>
            </View>
            {/* 경고 내용 */}
            <View style={styles.noticeDetailContainer}>
              {/* 경고 내용 설명 */}
              <View>
                <Text style={styles.noticeDetailText}>
                  지금까지 기록한 추억
                </Text>
              </View>
              {/* 경고 내용 갯수 */}
              <View>
                <Text style={styles.noticeDetailRightText}>n개 즉시소멸</Text>
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
    </View>
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
    bottom: 0,
    width: '100%',
  },
  btn: {
    width: 168,
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
  },
  confirmBtnText: {
    ...fooiyFont.Button,
    color: fooiyColor.G600,
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
