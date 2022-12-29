import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {ApiMangerV1} from '../../common/api/v1/ApiMangerV1';
import {apiUrl} from '../../common/Enums';
import {DefaultHeader} from '../../common_ui/headers/DefaultHeader';
import {fooiyColor} from '../../common/globalStyles';
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
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate('FooiyTI', {
                      info: accountInfo,
                    });
                  }}>
                  <Text style={styles.fooiyTI}>{accountInfo.fooiyti}</Text>
                </TouchableOpacity>
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
            <Map style={styles.btnIcon} />
            <Text style={styles.btnText}>내 지도</Text>
          </View>
          <View style={styles.btnLine} />
          {/* 보관함 */}
          <View style={styles.btn}>
            <Archive style={styles.btnIcon} />
            <Text style={styles.btnText}>보관함</Text>
          </View>
          <View style={styles.btnLine} />
          {/* 설정 */}
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('Setting', {
                info: accountInfo,
              });
            }}>
            <Settings style={styles.btnIcon} />
            <Text style={styles.btnText}>설정</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    width: globalVariable.width,
    marginBottom: 24,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImageContainer: {
    borderRadius: 24,
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 24,
    borderColor: fooiyColor.G200,
    borderWidth: 1,
  },
  userInfoDetail: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  fooiyTI: {
    fontsize: 16,
    fontWeight: '600',
    borderWidth: 1,
    borderRadius: 8,
    color: fooiyColor.P500,
    borderColor: fooiyColor.P500,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 8,
  },
  profileInfoCount: {
    fontsize: 16,
    fontWeight: '600',
    borderWidth: 1,
    borderRadius: 8,
    color: fooiyColor.G400,
    borderColor: fooiyColor.G400,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: fooiyColor.B,
  },
  introduction: {
    fontWeight: '400',
    fontSize: 14,
    color: fooiyColor.G600,
    marginBottom: 24,
  },
  btnContainer: {
    height: 84,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    borderRadius: 8,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '33%',
    height: '100%',
  },
  btnIcon: {
    marginBottom: 8,
  },
  btnLine: {
    width: 1,
    height: 56,
    backgroundColor: fooiyColor.G200,
  },
  btnText: {
    color: fooiyColor.G500,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default MypageProfile;
