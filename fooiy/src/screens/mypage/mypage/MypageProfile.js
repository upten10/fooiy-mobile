import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {fooiyColor, fooiyFont} from '../../../common/globalStyles';
import {globalVariable} from '../../../common/globalVariable';
import {useDispatch, useSelector} from 'react-redux';
import {Archive, Map, Settings} from '../../../../assets/icons/svg';

const MypageProfile = params => {
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
              {params.otherUserInfo ? (
                <Image
                  source={{uri: params.otherUserInfo.profile_image}}
                  style={styles.profileImage}
                />
              ) : (
                <Image
                  source={{
                    uri: userInfoRedux.profile_image,
                  }}
                  style={styles.profileImage}
                />
              )}
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
                  {params.otherUserInfo ? (
                    <Text style={styles.fooiyTI}>
                      {params.otherUserInfo.fooiyti !== null
                        ? params.otherUserInfo.fooiyti
                        : 'OOOO'}
                    </Text>
                  ) : (
                    <Text style={styles.fooiyTI}>
                      {userInfoRedux.fooiyti !== null
                        ? userInfoRedux.fooiyti
                        : 'OOOO'}
                    </Text>
                  )}
                </TouchableOpacity>
                {/* 피드 갯수 */}
                <View style={styles.profileInfoCountContainer}>
                  {params.otherUserInfo ? (
                    <Text style={styles.profileInfoCount}>
                      총 {params.otherUserInfo.feed_count}개
                    </Text>
                  ) : (
                    <Text style={styles.profileInfoCount}>
                      총 {userInfoRedux.feed_count}개
                    </Text>
                  )}
                </View>
              </View>
              {/* 닉네임 */}
              <View>
                {params.otherUserInfo ? (
                  <Text style={styles.userName}>
                    {params.otherUserInfo.nickname}
                  </Text>
                ) : (
                  <Text style={styles.userName}>{userInfoRedux.nickname}</Text>
                )}
              </View>
            </View>
          </View>
          <View>
            {params.otherUserInfo
              ? params.otherUserInfo.introduction && (
                  <Text style={styles.introduction}>
                    {params.otherUserInfo.introduction}
                  </Text>
                )
              : userInfoRedux.introduction && (
                  <Text style={styles.introduction}>
                    {userInfoRedux.introduction}
                  </Text>
                )}
          </View>
        </View>
        {/* 버튼 */}
        {params.otherUserInfo ? (
          <TouchableOpacity
            style={styles.otherBtnContainer}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('MypageMap');
            }}>
            <Map style={styles.otherBtnIcon} />
            <Text style={styles.otherBtnText}>지도</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('MypageMap');
              }}>
              <Map style={styles.btnIcon} />
              <Text style={styles.btnText}>내 지도</Text>
            </TouchableOpacity>
            <View style={styles.btnLine} />
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('Storage');
              }}>
              <Archive style={styles.btnIcon} />
              <Text style={styles.btnText}>보관함</Text>
            </TouchableOpacity>
            <View style={styles.btnLine} />
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
        )}
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
    marginRight: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: fooiyColor.P500,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fooiyTI: {
    ...Platform.select({
      ios: {
        ...fooiyFont.Button,
        color: fooiyColor.P500,
        lineHeight: 0,
      },
      android: {
        ...fooiyFont.Button,
        color: fooiyColor.P500,
        lineHeight: 18,
      },
    }),
  },
  profileInfoCountContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: fooiyColor.G400,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfoCount: {
    ...Platform.select({
      ios: {
        ...fooiyFont.Button,
        color: fooiyColor.G400,
        lineHeight: 0,
      },
      android: {
        ...fooiyFont.Button,
        color: fooiyColor.G400,
        lineHeight: 18,
      },
    }),
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
  otherBtnContainer: {
    height: 84,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    borderRadius: 8,
  },
  otherBtnIcon: {
    marginBottom: 8,
  },
  otherBtnText: {
    ...fooiyFont.Subtitle3,
    color: fooiyColor.G500,
  },
});

export default MypageProfile;
