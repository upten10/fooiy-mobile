import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Button, Image} from 'react-native';
import {ApiMangerV1} from '../../common/api/v1/ApiMangerV1';
import {apiUrl} from '../../common/Enums';
import {DefaultHeader} from '../../common_ui/headers/DefaultHeader';
import {fooiyColor, globalStyles} from '../../common/globalStyles';
import {Archive, Map, Settings} from '../../../assets/icons/svg';
import {globalVariable} from '../../common/globalVariable';

const MypageProfile = props => {
  const navigation = useNavigation();
  const [accountInfo, setAccountInfo] = useState({});

  const getAccountInfo = async data => {
    await ApiMangerV1.get(apiUrl.ACCOUNT_INFO, {params: {}}).then(res => {
      setAccountInfo(res.data.payload.account_info);
    });
  };

  useEffect(() => {
    getAccountInfo();
  }, []);

  return (
    <View style={styles.rootContainer} pointerEvents="box-none">
      <DefaultHeader />
      <View style={styles.container}>
        {/* 프로필 */}
        <View style={styles.profileContainer}>
          <View style={styles.infoContainer}>
            {/* 프로필사진 */}
            <View style={styles.profileImageContainer}>
              <Image
                source={{
                  uri: accountInfo.profile_image,
                }}
                style={styles.profileImage}
              />
            </View>
            <View style={styles.userInfoContainer}>
              {/* 푸이티아이 */}
              <View style={styles.userInfoDetail}>
                <View
                  onTouchStart={() => {
                    navigation.navigate('FooiyTI', {
                      info: accountInfo,
                    });
                  }}>
                  <Text style={styles.fooiyTI}>{accountInfo.fooiyti}</Text>
                </View>
                {/* 나중에 개척수에서 총 게시물 수로 바꿔야함 */}
                <Text style={styles.profileInfoCount}>
                  총 {accountInfo.pioneer_count}개
                </Text>
              </View>
              {/* 닉네임 */}
              <View>
                <Text style={styles.userName}>{accountInfo.nickname}</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.introduction}>
              {accountInfo.introduction === null
                ? '안녕하세요 소개가 비어있어요힝'
                : accountInfo.introduction}
            </Text>
          </View>
        </View>
        {/* 버튼 */}
        <View style={styles.btnContainer}>
          {/* 지도 */}
          <View style={styles.btn}>
            <Map />
            <Text style={styles.btnText}>내 지도</Text>
          </View>
          <View style={styles.btnLine} />
          {/* 보관함 */}
          <View style={styles.btn}>
            <Archive />
            <Text style={styles.btnText}>보관함</Text>
          </View>
          <View style={styles.btnLine} />
          {/* 설정 */}
          <View style={styles.btn}>
            <Settings />
            <Text style={styles.btnText}>설정</Text>
          </View>
        </View>
        {/* 피드 */}
        <View></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    width: globalVariable.width,
    height: globalVariable.height * 0.4,
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  profileContainer: {
    flex: 1,
    width: '100%',
  },
  infoContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: globalVariable.width * 0.2,
    height: globalVariable.width * 0.2,
    borderRadius: 24,
    margin: 15,
  },
  profileImage: {
    width: globalVariable.width * 0.2,
    height: globalVariable.width * 0.2,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: globalVariable.G200,
  },
  userInfoDetail: {
    flexDirection: 'row',
  },
  fooiyTI: {
    fontsize: 16,
    fontWeight: '600',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    margin: 4,
    color: fooiyColor.P500,
    borderColor: fooiyColor.P500,
  },
  profileInfoCount: {
    fontsize: 16,
    fontWeight: '600',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    margin: 4,
    color: fooiyColor.G400,
    borderColor: fooiyColor.G400,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: fooiyColor.B,
    margin: 4,
  },
  introduction: {
    marginHorizontal: 16,
    marginVertical: 10,
    fontWeight: '400',
    fontSize: 14,
    color: fooiyColor.G600,
  },
  btnContainer: {
    flex: 0.7,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: 20,
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    borderRadius: 8,
  },
  btn: {
    alignItems: 'center',
  },
  btnLine: {
    width: 1,
    height: '75%',
    backgroundColor: fooiyColor.G200,
  },
  btnText: {
    color: fooiyColor.G500,
    fontSize: 14,
    fontWeight: '600',
    paddingTop: 12,
  },
});

export default MypageProfile;
