import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  Ic_comment_G400,
  Ic_fork_G400,
  Ic_fork_P500,
  Ic_share_G400,
  Ic_storage_G400,
  Ic_storage_P500,
} from '../../../assets/svg';
import FooiyToast from '../../common/FooiyToast';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';

const FeedUsefulContent = props => {
  const {
    account_id,
    feed_id,
    onClickLikeIcon,
    likeIcon,
    likeCount,
    onClickStoreIcon,
    onClickShareIcon,
    storeIcon,
    is_confirm,
    count_comment,
    isLogin,
  } = props;
  const navigation = useNavigation();
  return (
    <View style={styles.content}>
      <View style={styles.ic_fork}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            isLogin !== false
              ? onClickLikeIcon()
              : FooiyToast.message('뒤로가기 후 로그인해주세요', false, 0)
          }
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          {likeIcon ? <Ic_fork_P500 /> : <Ic_fork_G400 />}
        </TouchableOpacity>
      </View>
      {likeCount > 0 ? (
        <Text style={styles.fork_count}>{likeCount}명이 포크로 찍었어요.</Text>
      ) : null}
      <View style={styles.right_side_icon}>
        <View style={styles.ic_comment}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              isLogin !== false
                ? is_confirm !== true &&
                  navigation.navigate('FeedComment', {
                    feed_id: feed_id,
                    feed_account_id: account_id,
                  })
                : FooiyToast.message('뒤로가기 후 로그인해주세요', false, 0)
            }
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Ic_comment_G400 />
          </TouchableOpacity>
          {!is_confirm && count_comment !== 0 && (
            <View style={styles.comment_count_container}>
              <Text style={styles.comment_count}>{count_comment}</Text>
            </View>
          )}
        </View>
        <View style={styles.ic_share}>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            onPress={() =>
              isLogin !== false
                ? onClickShareIcon()
                : FooiyToast.message('뒤로가기 후 로그인해주세요', false, 0)
            }>
            <Ic_share_G400 />
          </TouchableOpacity>
        </View>
        <View style={styles.ic_store}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              isLogin !== false
                ? onClickStoreIcon()
                : FooiyToast.message('뒤로가기 후 로그인해주세요', false, 0)
            }
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            {storeIcon ? <Ic_storage_P500 /> : <Ic_storage_G400 />}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FeedUsefulContent;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  ic_fork: {
    width: 24,
    height: 24,
    alignItems: 'center',
    marginRight: 4,
  },
  fork_count: {
    textAlign: 'center',
    ...fooiyFont.Body2,
    color: fooiyColor.G500,
  },
  right_side_icon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  ic_comment: {
    width: 24,
    height: 24,
    alignItems: 'center',
    marginRight: 16,
  },
  comment_count_container: {
    position: 'absolute',
    bottom: 16,
    left: 14,
    borderRadius: 1000,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: fooiyColor.W,
    backgroundColor: fooiyColor.P500,
  },
  comment_count: {
    ...fooiyFont.Caption2,
    color: fooiyColor.W,
    textAlign: 'center',
  },
  ic_share: {
    width: 24,
    height: 24,
    alignItems: 'center',
    marginRight: 16,
  },
  ic_store: {
    width: 24,
    alignItems: 'center',
    height: 24,
  },
});
