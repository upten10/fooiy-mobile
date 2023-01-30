import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
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

const FeedUsefulContent = props => {
  const {
    onClickLikeIcon,
    likeIcon,
    likeCount,
    onClickStoreIcon,
    onClickShareIcon,
    storeIcon,
  } = props;

  return (
    <View style={styles.content}>
      <View style={styles.ic_fork}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onClickLikeIcon}
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
            hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
            <Comment />
          </TouchableOpacity>
        </View>
        <View style={styles.ic_share}>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
            onPress={onClickShareIcon}>
            <Share />
          </TouchableOpacity>
        </View>
        <View style={styles.ic_store}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onClickStoreIcon}
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
    justifyContent: 'center',
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
