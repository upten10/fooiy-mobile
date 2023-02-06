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
import {Map} from '../../../../assets/icons/svg';
import Rank from '../../../common_ui/Rank';

const OtherUserPageProfile = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.rootContainer} pointerEvents="box-none">
      <View style={styles.container}>
        {/* 프로필 */}
        <View style={styles.profileContainer}>
          <View style={styles.infoContainer}>
            {/* 프로필사진 */}
            <View style={styles.profileImageContainer}>
              <Image
                source={{uri: props.profile_image}}
                style={styles.profileImage}
              />
            </View>
            <View style={styles.userInfoContainer}>
              {/* 푸이티아이 */}
              <View style={styles.userInfoDetail}>
                {/* 랭크 */}
                <Rank
                  containerStyle={{height: 28, marginRight: 8, borderRadius: 8}}
                  rank={props.rank}
                  font={fooiyFont.Subtitle3}
                />
                <TouchableOpacity
                  style={styles.fooiyTIContainer}
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate('FooiyTI');
                  }}>
                  <Text style={styles.fooiyTI}>
                    {props.fooiyti !== null ? props.fooiyti : 'OOOO'}
                  </Text>
                </TouchableOpacity>
                {/* 피드 갯수 */}
                <View style={styles.profileInfoCountContainer}>
                  <Text style={styles.profileInfoCount}>
                    총 {props.feed_count}개
                  </Text>
                </View>
              </View>
              {/* 닉네임 */}
              <View>
                <Text style={styles.userName}>{props.nickname}</Text>
              </View>
            </View>
          </View>
          <View>
            {props.introduction && (
              <Text style={styles.introduction}>{props.introduction}</Text>
            )}
          </View>
        </View>
        {/* 버튼 */}
        <TouchableOpacity
          style={styles.otherBtnContainer}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('MypageMap', {
              account_id: props.public_id,
              nickname: props.nickname,
            });
          }}>
          <Map style={styles.otherBtnIcon} />
          <Text style={styles.otherBtnText}>지도</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    marginBottom: 16,
  },
  fooiyTIContainer: {
    marginRight: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: fooiyColor.G200,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fooiyTI: {
    ...fooiyFont.Subtitle3,
    color: fooiyColor.G600,
  },
  profileInfoCountContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: fooiyColor.G200,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfoCount: {
    ...fooiyFont.Subtitle3,
    color: fooiyColor.G600,
  },
  userName: {
    ...fooiyFont.Subtitle1,
    width: globalVariable.width - 128,
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

export default OtherUserPageProfile;
