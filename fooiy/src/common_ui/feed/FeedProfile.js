import React, {memo} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import FastImage from 'react-native-fast-image';
import {fooiyFont, fooiyColor} from '../../common/globalStyles';

import Rank from '../Rank';
import {MoreVertIcon} from '../../../assets/icons/svg';

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
  } = props;
  const navigation = useNavigation();
  const onPressProfileImg = () => {
    navigation.push('OtherUserPage', {
      other_account_id: account_id,
    });
  };

  return (
    <View style={styles.profile_container}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => onPressProfileImg()}>
        <View style={styles.info_container}>
          <FastImage
            source={{
              uri: profile_image,
            }}
            style={styles.profile_image}
          />
          <View>
            <Text style={styles.nickname}>{nickname}</Text>
            <View style={styles.profile_detail_container}>
              <Rank
                containerStyle={{marginLeft: 8}}
                rank={rank}
                font={fooiyFont.Subtitle4}
              />
              <Text style={styles.fooiyti}>{fooiyti}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.more_vert_container}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            openModal(
              id,
              account_id,
              profile_image,
              nickname,
              rank,
              fooiyti,
              content,
            )
          }>
          <MoreVertIcon />
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
    marginLeft: 4,
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
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
