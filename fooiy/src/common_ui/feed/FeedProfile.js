import React, {memo} from 'react';
import {Text, StyleSheet, View, Platform} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import FastImage from 'react-native-fast-image';
import {fooiyFont, fooiyColor} from '../../common/globalStyles';

import Rank from '../Rank';

const FeedProfile = props => {
  const {nickname, profile_image, fooiyti, account_id, rank} = props;
  const navigation = useNavigation();
  const onPressProfileImg = () => {
    navigation.push('OtherUserPage', {
      other_account_id: account_id,
    });
  };
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => onPressProfileImg()}>
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
    </TouchableOpacity>
  );
};

export default memo(FeedProfile);

const styles = StyleSheet.create({
  container: {
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
});
