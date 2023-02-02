import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import elapsedTime from '../../common/helpers/elapsedTime';
import Margin from '../Margin';
import FeedProfile from './FeedProfile';

const UI_Comment = item => {
  const onPressReplyButton = () => {
    if (!item.isFocused) {
      item.setWorkingComment({
        account_id: item.account_id,
        comment_id: item.comment_id,
        profile_image: item.profile_image,
        nickname: item.nickname,
        rank: item.rank,
        fooiyti: item.fooiyti,
        content: item.content,
      });
      item.toIndex(item.index);
    }
  };
  return (
    <View style={[styles.container, {marginLeft: item.is_reply ? 64 : 0}]}>
      <Margin h={item.is_reply ? 8 : item.index !== 0 ? 16 : 8} />
      <View style={[item.is_reply && styles.reply_container_condition]}>
        <FeedProfile
          account_id={item.account_id}
          nickname={item.nickname}
          profile_image={item.profile_image}
          fooiyti={item.fooiyti}
          content={item.content}
          rank={item.rank}
          openModal={item.openModal}
          id={item.comment_id}
        />
        <Margin h={8} />
        <View style={styles.text_container}>
          <Text style={{...fooiyFont.Body2, color: fooiyColor.G800}}>
            {item.content}
          </Text>
          <Margin h={8} />
          <View style={styles.footer_container}>
            <TouchableOpacity
              onPress={() => onPressReplyButton()}
              activeOpacity={0.8}
              hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
              <Text style={styles.relpy_button}>답글 달기</Text>
            </TouchableOpacity>
            <Text style={styles.comment_time}>
              {elapsedTime(item.created_at)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UI_Comment;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  reply_container_condition: {
    borderRadius: 8,
    backgroundColor: fooiyColor.G50,
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 8,
  },
  text_container: {
    marginLeft: 64,
  },
  footer_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  relpy_button: {
    ...fooiyFont.Subtitle3,
    color: fooiyColor.G400,
  },
  comment_time: {
    ...fooiyFont.Body2,
    color: fooiyColor.G400,
  },
});
