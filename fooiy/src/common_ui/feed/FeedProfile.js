import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Ic_more_G200} from '../../../assets/svg';
import {resizeImageType} from '../../common/Enums';
import FooiyToast from '../../common/FooiyToast';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import Margin from '../Margin';
import Rank from '../Rank';
import ResizeImage from '../ResizeImage';

const FeedProfile = props => {
  const {
    nickname,
    profile_image,
    fooiyti,
    account_id,
    rank,
    openModal,
    id,
    content,
    is_confirm,
    isLogin,
  } = props;
  const navigation = useNavigation();
  const onPressProfileImg = () => {
    navigation.push('OtherUserPage', {
      other_account_id: account_id,
    });
  };

  return (
    <View style={styles.profile_container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          isLogin !== false
            ? onPressProfileImg()
            : FooiyToast.message('뒤로가기 후 로그인해주세요', false, 0)
        }>
        <View style={styles.info_container}>
          <ResizeImage
            uri={profile_image}
            size={resizeImageType.SMALL}
            imageStyle={styles.profile_image}
          />
          <View>
            <Text style={styles.nickname}>{nickname}</Text>
            <View style={styles.profile_detail_container}>
              <Margin w={8} />
              {rank && (
                <Rank
                  containerStyle={{marginRight: 4}}
                  rank={rank}
                  font={fooiyFont.Subtitle4}
                />
              )}
              {fooiyti && <Text style={styles.fooiyti}>{fooiyti}</Text>}
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.more_vert_container}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            isLogin !== false
              ? is_confirm !== true &&
                openModal(
                  id,
                  account_id,
                  profile_image,
                  nickname,
                  rank,
                  fooiyti,
                  content,
                )
              : FooiyToast.message('뒤로가기 후 로그인해주세요', false, 0)
          }>
          <Ic_more_G200 />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(FeedProfile);

const styles = StyleSheet.create({
  info_container: {
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profile_image: {
    borderRadius: 100,
    width: 40,
    height: 40,
  },
  nickname: {
    marginLeft: 8,
    marginBottom: 2,
    ...fooiyFont.Subtitle3,
    color: fooiyColor.G800,
  },
  profile_detail_container: {
    flexDirection: 'row',
  },
  fooiyti: {
    paddingHorizontal: 6,
    textAlign: 'center',
    ...fooiyFont.Subtitle4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: fooiyColor.G200,
    color: fooiyColor.G600,
  },
  rank_container: {
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rank: {
    paddingHorizontal: 6,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: fooiyColor.W,
  },
  more_vert_container: {
    width: 24,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
