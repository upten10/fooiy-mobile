import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {globalVariable} from '../../common/globalVariable';
import {useDispatch, useSelector} from 'react-redux';
import {Archive, Map, Settings} from '../../../assets/icons/svg';

const MypageProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userInfoRedux = useSelector(state => state.userInfo.value);

  return (
    <View style={styles.rootContainer} pointerEvents="box-none">
      <View style={styles.container}>
        {/* 프로필 */}
        <View style={styles.profileContainer}>
          <View style={styles.infoContainer}>
            {/* 프로필사진 */}
            <View style={styles.profileImageContainer}>
              <Image
                source={{
                  uri: userInfoRedux.profile_image,
                }}
                style={styles.profileImage}
              />
            </View>
            <View style={styles.userInfoContainer}>
              {/* 푸이티아이 */}
              <View style={styles.userInfoDetail}>
                <TouchableOpacity
                  style={styles.fooiyTIContainer}
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate('FooiyTI');
                  }}>
                  <Text style={styles.fooiyTI}>
                    {userInfoRedux.fooiyti !== null
                      ? userInfoRedux.fooiyti
                      : 'OOOO'}
                  </Text>
                </TouchableOpacity>
                {/* 피드 갯수 */}
                <Text style={styles.profileInfoCount}>
                  총 {userInfoRedux.feed_count}개
                </Text>
              </View>
              {/* 닉네임 */}
              <View>
                <Text style={styles.userName}>{userInfoRedux.nickname}</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.introduction}>
              {userInfoRedux.introduction}
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
              navigation.navigate('Setting');
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
  fooiyTIContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: fooiyColor.P500,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 8,
  },
  fooiyTI: {
    ...fooiyFont.Button,
    color: fooiyColor.P500,
    lineHeight: 0,
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
    ...fooiyFont.Subtitle1,
  },
  introduction: {
    ...fooiyFont.Body2,
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
    ...fooiyFont.Subtitle3,
    color: fooiyColor.G500,
  },
});

export default MypageProfile;
