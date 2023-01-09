import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {ApiMangerV1} from '../../common/api/v1/ApiMangerV1';
import {apiUrl} from '../../common/Enums';
import {fooiyColor} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {userInfoAction} from '../../redux/actions/userInfoAction';
import {DefaultHeader} from '../../common_ui/headers/DefaultHeader';
import {Archive, Map, Settings} from '../../../assets/icons/svg';

const MypageProfile = props => {
  const navigation = useNavigation();
  const userInfo = props.info;
  const [nickName, setNickName] = useState(userInfo.nickname);
  const [introduction, setIntroduction] = useState(userInfo.introduction);
  const [profileImg, setProfileImg] = useState(userInfo.profile_image);
  const dispatch = useDispatch();

  const userInfoRedux = useSelector(state => state.userInfo.value);

  useEffect(() => {
    'introduction' in userInfoRedux
      ? setIntroduction(userInfoRedux.introduction)
      : setIntroduction(userInfo.introduction);
    // setIntroduction(a ? userInfoRedux : props.data.introduction);
  }, [userInfo.introduction, userInfoRedux]);

  useEffect(() => {
    'profile_image' in userInfoRedux
      ? setProfileImg(userInfoRedux.profile_image)
      : setProfileImg(userInfo.profile_image);
    // setIntroduction(a ? userInfoRedux : props.data.introduction);
  }, [userInfo.profile_image, userInfoRedux]);

  useEffect(() => {
    'nickname' in userInfoRedux
      ? setNickName(userInfoRedux.nickname)
      : setNickName(userInfo.nickname);
    // setIntroduction(a ? userInfoRedux : props.data.introduction);
  }, [userInfo.nickname, userInfoRedux]);

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
                  uri: profileImg,
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
                      info: userInfo,
                    });
                  }}>
                  <Text style={styles.fooiyTI}>{userInfo.fooiyti}</Text>
                </TouchableOpacity>
                {/* 나중에 개척수에서 총 게시물 수로 바꿔야함 */}
                <Text style={styles.profileInfoCount}>
                  총 {userInfo.pioneer_count}개
                </Text>
              </View>
              {/* 닉네임 */}
              <View>
                <Text style={styles.userName}>{nickName}</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.introduction}>
              {introduction && introduction}
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
                info: userInfo,
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
