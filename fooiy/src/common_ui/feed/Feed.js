import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {debounce} from 'lodash';
import {feedsAction} from '../../redux/actions/feedsAction';
import {useDispatch, useSelector} from 'react-redux';
import {globalVariable} from '../../common/globalVariable';

const {width} = Dimensions.get('screen');
const PROFILE_IMAGE_WIDTH = width * 0.1;
const PROFILE_IMAGE_HEIGHT = PROFILE_IMAGE_WIDTH;
const IMAGE_WIDTH = width;
const IMAGE_HEIGHT = IMAGE_WIDTH;
const fork_icon = require('../../../assets/icons/feed/ic_fork.png');
const fork_icon_focused = require('../../../assets/icons/feed/ic_fork_focused.png');

export const UI_Feed = item => {
  const navigation = useNavigation();

  // feed redux
  const dispatch = useDispatch();
  const feed_redux = {
    id: item.id,
    count_liked: item.count_liked,
    is_liked: item.is_liked,
    is_store: item.is_store,
  };
  dispatch(feedsAction.append(feed_redux));
  const feeds = useSelector(state => state.feeds.feeds.value);
  const feed = feeds.find(e => e.id === item.id);

  const [likeIcon, setLikeIcon] = useState(feed.is_liked);
  const [storeIcon, setStoreIcon] = useState(feed.is_stored);

  useEffect(() => {
    setLikeIcon(feed.is_liked);
  }, [feed.is_liked]);

  useEffect(() => {
    setStoreIcon(feed.is_store);
  }, [feed.is_store]);

  // debounce에 콜백 안쓰면 계속 랜더링 되서 이상해짐
  const debounceCallback = useCallback((like, store) => {
    if (typeof like === typeof true) {
      console.log('like debounce');
      debounceLike(like);
    }
    if (typeof store === typeof true) {
      console.log('store debounce');
      debounceStore(store);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debounceLike = debounce(async liked => {
    if (feed.is_liked === (await liked)) {
      feed.is_liked = !(await liked);
      dispatch(feedsAction.setChanged(feeds));
      // axios fetch
    }
  }, 1500);

  const debounceStore = debounce(async stored => {
    if (feed.is_stored === (await stored)) {
      feed.is_stored = !(await stored);
      dispatch(feedsAction.setChanged(feeds));
      // axios fetch
    }
  }, 1500);

  const onClickLikeIcon = () => {
    setLikeIcon(!likeIcon);
    debounceCallback(likeIcon, undefined);
  };

  const onClickStoreIcon = () => {
    setStoreIcon(!storeIcon);
    debounceCallback(undefined, storeIcon);
  };

  // 두번 터치 감지
  var lastTap = null;
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      if (!likeIcon) {
        onClickLikeIcon();
      }
      // fork 로띠만 실행
    } else {
      lastTap = now;
    }
  };

  return (
    <View style={styles.container}>
      {/* 프사, 닉네임 */}
      <View style={styles.header_container}>
        <Image
          source={{uri: item.profile_image}}
          style={styles.profile_image}
        />
        <Text style={styles.nickname}>{item.nickname}</Text>
      </View>
      {/* 이미지 */}
      <View style={styles.image_container}>
        <TouchableWithoutFeedback onPress={handleDoubleTap}>
          <Image source={{uri: item.image[0]}} style={styles.image} />
        </TouchableWithoutFeedback>
      </View>

      {/* 유용한 기능 포크, 댓글 등등 */}
      <View style={styles.useful_content}>
        <TouchableOpacity activeOpacity={0.8} onPress={onClickLikeIcon}>
          <Text>{likeIcon ? '좋아요' : '싫어요'}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={onClickStoreIcon}>
          <Text>{storeIcon ? '보관중' : '보관취소'}</Text>
        </TouchableOpacity>
      </View>
      {/* 정보 */}
      <View style={styles.content}>
        <View style={styles.content_detail}>
          <View style={styles.fooiyti_container}>
            <Text style={styles.fooiyti}>{item.fooiyti}</Text>
            <Image
              source={{uri: item.taste_evaluation_image}}
              style={styles.taste_evaluation_image}
            />
          </View>
          <View style={styles.shop_container}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.shop}
              onPress={() => {
                navigation.navigate('Shop', {
                  shop_id: item.shop_id,
                  shop_name: item.shop_name,
                  shop_address: item.shop_address,
                });
              }}>
              <Text>{item.shop_name}</Text>
            </TouchableOpacity>

            <View style={styles.menu_container}>
              <Text>{item.menu_name}</Text>
              <Text style={styles.menu_price}>{item.menu_price}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.comment}>{item.comment}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    width: width,
  },
  profile_image: {
    borderRadius: 100,
    marginLeft: 16,
    width: PROFILE_IMAGE_WIDTH,
    height: PROFILE_IMAGE_HEIGHT,
  },
  header_container: {
    flexDirection: 'row',
  },
  nickname: {
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 10,
    height: PROFILE_IMAGE_HEIGHT,
  },

  image_container: {
    marginTop: PROFILE_IMAGE_WIDTH / 2,
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },

  useful_content: {
    height: 40,
    width: globalVariable.width,
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
  },
  fork: {
    width: 20,
    height: 20,
  },

  content_detail: {
    flexDirection: 'row',
  },
  fooiyti_container: {
    width: width / 6,
    height: width / 6,
    marginLeft: 16,
    borderColor: '#FF5C5C',
    borderStyle: 'solid',
    borderWidth: 1.3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fooiyti: {
    color: '#FF5C5C',
    fontSize: 18,
  },
  taste_evaluation_image: {
    width: 24,
    height: 24,
    fontStyle: 'normal',
    marginTop: 4,
  },
  shop_container: {
    marginLeft: 20,
    height: width / 6,
    justifyContent: 'center',
  },
  shop: {
    color: '#000',
    fontSize: 18,
  },
  menu_container: {
    marginTop: 10,
    flexDirection: 'row',
  },
  menu_price: {
    marginLeft: 8,
    color: '#FF5C5C',
  },

  comment: {
    marginLeft: 20,
    marginTop: 16,
    color: '#4A5470',
    lineHeight: 24,
    fontSize: 14,
  },
});
