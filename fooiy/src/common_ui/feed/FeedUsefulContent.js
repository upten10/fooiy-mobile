import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {globalVariable} from '../../common/globalVariable';
import {
  Fork,
  ForkFocused,
  Store,
  StoreFocused,
  Share,
  Comment,
} from '../../../assets/icons/svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {fooiyColor, fooiyFont} from '../../common/globalStyles';
import {useNavigation} from '@react-navigation/native';
import FooiyToast from '../../common/FooiyToast';

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
            isLogin
              ? onClickLikeIcon
              : FooiyToast.message('뒤로가기 후 로그인해주세요', false, 0)
          }
          hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
          {likeIcon ? <ForkFocused /> : <Fork />}
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
              isLogin
                ? is_confirm !== true &&
                  navigation.navigate('FeedComment', {
                    feed_id: feed_id,
                    feed_account_id: account_id,
                  })
                : FooiyToast.message('뒤로가기 후 로그인해주세요', false, 0)
            }
            hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
            <Comment />
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
            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
            onPress={() =>
              isLogin
                ? onClickShareIcon
                : FooiyToast.message('뒤로가기 후 로그인해주세요', false, 0)
            }>
            <Share />
          </TouchableOpacity>
        </View>
        <View style={styles.ic_store}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              isLogin
                ? onClickStoreIcon
                : FooiyToast.message('뒤로가기 후 로그인해주세요', false, 0)
            }
            hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
            {storeIcon ? <StoreFocused /> : <Store />}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FeedUsefulContent;

const styles = StyleSheet.create({
  content: {
    height: 24,
    width: globalVariable.width - 16,
    flexDirection: 'row',
    marginLeft: 16,
    paddingRight: 16,
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
    height: 24,
    textAlign: 'center',
    ...fooiyFont.Body2,
    color: fooiyColor.G500,
    lineHeight: Platform.select({ios: 20, android: null}),
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
