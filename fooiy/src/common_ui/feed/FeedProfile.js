import React, {memo} from 'react';
import {Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import FastImage from 'react-native-fast-image';
import {fooiyFont, fooiyColor} from '../../common/globalStyles';

const FeedProfile = props => {
  const {nickname, profile_image, fooiyti, account_id} = props;
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
      <Text style={styles.nickname}>{nickname}</Text>
      <Text style={styles.fooiyti}>{fooiyti}</Text>
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
    width: 32,
    height: 32,
  },
  nickname: {
    marginLeft: 8,
    ...fooiyFont.Subtitle3,
    color: fooiyColor.G800,
  },
  fooiyti: {
    paddingHorizontal: 6,
    textAlign: 'center',
    ...fooiyFont.Subtitle4,
    marginLeft: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: fooiyColor.P500,
    color: fooiyColor.P500,
  },
});
